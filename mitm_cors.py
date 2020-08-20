# Script for mitmproxy, used in ../rundev.sh. Not meant to be run directly.
from mitmproxy import http
from auth import login, generate_token, decode_token
import json
from flask import jsonify

# More information about CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

# ALLOW_ORIGIN = "https://routerconfig.netlify.app"
ALLOW_ORIGIN = "http://localhost:3000"
ALLOW_HEADERS = "Authorization, *"  # Which headers the browser may send
# Which headers the browser may expose to scripts
EXPOSE_HEADERS = "Authorization, *"
HIDE_ORIGIN = True


def response(flow):
    """it's a callback to handle context"""

    flow.response.headers["Access-Control-Allow-Origin"] = ALLOW_ORIGIN
    flow.response.headers["Access-Control-Expose-Headers"] = EXPOSE_HEADERS


def request(flow):
    # Hijack CORS OPTIONS request

    isauth(flow.request.headers, flow)
    middle_login(flow)
    if flow.request.method == "OPTIONS":
        flow.response = http.HTTPResponse.make(200, b"", {
            "Access-Control-Allow-Origin": ALLOW_ORIGIN,
            "Access-Control-Allow-Methods": "GET,POST,DELETE",
            "Access-Control-Allow-Headers": ALLOW_HEADERS,
            "Access-Control-Max-Age": "10"
        })

    # Privacy
    if HIDE_ORIGIN:
        flow.request.headers["Origin"] = "null"


def isauth(headers, flow):
    """check token """
    if flow.request.path != "/login":
        if "Authorization" in headers:
            if decode_token(headers["Authorization"]) == None:
                flow.response=http.HTTPResponse.make(
                    401,  # (optional) status code
                    b"no autorizado",
                    {"Content-Type": "application/json"}  # (optional) headers
                )
        else:
            flow.response=http.HTTPResponse.make(
                401,  # (optional) status code
                b"no autorizado",
                # (optional) headers
                {"Content-Type": "application/json"}
            )


def middle_login(flow):
    if flow.request.path == "/login":
        if flow.request.method == "POST":
            user=json.loads(flow.request.data.content)
            if login(user["user"], user["password"]):
                token={"user": user['user'],
                         "token": generate_token(user["user"])}
                flow.response=http.HTTPResponse.make(
                    200,  # (optional) status code
                    json.dumps(token).encode('utf-8') 
                    ,  # (optional) content
                    {"Content-Type": "application/json"}  # (optional) headers
                )
