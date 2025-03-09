import * as http2 from 'http2';
import * as fs from 'fs';

// Choose whether to use TLS (h2) or cleartext (h2c)
const server = http2.createSecureServer({
  key: fs.readFileSync('server-key.pem'),
  cert: fs.readFileSync('server-cert.pem'),
  allowHTTP1: true  // optional: allow HTTP/1.1 fallback
});
const port = 8443;

let response: Record<string, unknown> = {};

// --- Session-level events ---

server.on('session', (session) => {
  session.on('remoteSettings', (settings) => {
    response['remoteSettings'] = settings;
  });

  session.on('localSettings', (settings) => {
    response['localSettings'] = settings;
  });

  // Check for connection-level WINDOW_UPDATE frames by tracking changes
  let prevConnWindow = session.state.remoteWindowSize;
  const interval = setInterval(() => {
    if (session.destroyed) {
      clearInterval(interval);
      return;
    }
    const curr = session.state.remoteWindowSize;
    if (curr && prevConnWindow && curr > prevConnWindow) {
      const increment = curr - prevConnWindow;
      response['windowUpdate'] = {increment};
    }
    prevConnWindow = curr;
  }, 50);
});

// --- Stream (request) handling ---

server.on('stream', (stream, headers) => {
  // Create a per-stream log array
  response['headers'] = {
    ...headers,
    stream: {id: stream.id},
  };

  // Respond with headers; we'll delay the body to collect logs.
  stream.respond({':status': 200, 'content-type': 'application/json'});

  // (Optional) If the client sends a large upload, log the data received.
  stream.on('data', (chunk) => {
  });

  // When the stream ends, log that and then send a response containing the logs.
  stream.on('end', () => {

    // Wait briefly to allow asynchronous events (like WINDOW_UPDATE) to be logged.
    setTimeout(() => {
      // Combine global logs and stream-specific logs into a response.
      stream.end(JSON.stringify(response, null, 2));
    });
  });
});

// --- Start the Server ---
server.on('error', (err) => console.error(err));
server.listen(port, () => {
  console.log(`HTTP/2 TLS server listening on port ${port}`);
});
