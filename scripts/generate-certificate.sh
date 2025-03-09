#!/usr/bin/env bash
cd "$(dirname "$0")/.." || exit 1
set -euro pipefail

openssl req -x509 -newkey rsa:2048 -keyout server-key.pem -out server-cert.pem -days 365 -nodes -subj "/CN=localhost"
