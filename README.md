# http2-fingerprints

This is a proof of concept code to show http2 fingerprint. Similar to what https://browserleaks.com/http2 displays. 

This repo may not be as maintained as you expected. Reason being:

1. Zero dependencies. It just uses the nodejs built-in `http2` module.

## What is http2 fingerprints

> HTTP/2 fingerprinting is a method by which web servers can identify which client is sending the request to them1.
 It can identify the browser type and version, for instance, or whether a
 script is used. The method relies on the internals of the HTTP/2 
protocol which are less widely known that those of its simpler 
predecessor HTTP/1.1. In this post I will first give a short description
 of the HTTP/2 protocol, then provide details on how a web server can 
use the protocol’s various parameters to identify the client. Finally, I
 will list methods of checking and controlling a client’s HTTP/2 
signature. -- source: [here](https://lwthiker.com/networks/2022/06/17/http2-fingerprinting.html)

More readings:

- [Passive Fingerprinting of HTTP/2 Clients](https://www.blackhat.com/docs/eu-17/materials/eu-17-Shuster-Passive-Fingerprinting-Of-HTTP2-Clients-wp.pdf)
- [RFC9113](https://httpwg.org/specs/rfc9113.html)


## Example response

See [examples/response.json5](/examples/response.json5)

## Run with docker

Production mode:
```shell
docker compose up --build app
```

Development mode:
```shell
docker compose up --build dev
```
