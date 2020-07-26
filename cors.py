from libmproxy.protocol.http import HTTPResponse
from netlib.http import Headers

def response(context, flow):
    flow.response.headers["Access-Control-Allow-Origin"] = "*"
    
    # Use this if the application sends auth info via header
    flow.response.headers["Access-Control-Expose-Headers"] = "X-Application-Session-Id"

def request(context, flow):
    # Hijack CORS OPTIONS request
    if flow.request.method == "OPTIONS":
        headers = Headers([
            [b"Access-Control-Allow-Origin", b"*"],
            [b"Access-Control-Allow-Methods", b"POST"],
            [b"Access-Control-Allow-Headers", b"X-Application-Session-Id"],
            [b"Access-Control-Max-Age", b"1728000"]
        ])

        resp = HTTPResponse(b"HTTP/1.1", 200, "OK", headers, "")
        flow.reply(resp)
