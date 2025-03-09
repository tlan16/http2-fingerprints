# http2-fingerprints

This is a proof of concept code to show http2 fingerprint. Similar to what https://browserleaks.com/http2 displays. 

This repo may not be as maintained as you expected. Reason being:

1. Zero dependencies. It just uses the nodejs built-in `http2` module.

## Example response

See [example/response.json5](/example/response.json5)

## Run with docker

Production mode:
```shell
docker compose up --build app
```

Development mode:
```shell
docker compose up --build dev
```
