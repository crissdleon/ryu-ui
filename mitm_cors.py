# Script for mitmproxy, used in ../rundev.sh. Not meant to be run directly.
from mitmproxy import http

# More information about CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

ALLOW_ORIGIN = "http://localhost:3000"
ALLOW_HEADERS  = "Authorization, *" # Which headers the browser may send
EXPOSE_HEADERS = "Authorization, *" # Which headers the browser may expose to scripts
HIDE_ORIGIN = True


def response(flow):
    flow.response.headers["Access-Control-Allow-Origin"] = ALLOW_ORIGIN
    flow.response.headers["Access-Control-Expose-Headers"] = EXPOSE_HEADERS

def request(flow):
    # Hijack CORS OPTIONS request
    if flow.request.method == "OPTIONS":
            flow.response = http.HTTPResponse.make(200, b"", {
                    "Access-Control-Allow-Origin": ALLOW_ORIGIN,
                    "Access-Control-Allow-Methods": "GET,POST",
                    "Access-Control-Allow-Headers": ALLOW_HEADERS,
                    "Access-Control-Max-Age": "10"
            })

    # Privacy
    if HIDE_ORIGIN:
            flow.request.headers["Origin"] = "null"


