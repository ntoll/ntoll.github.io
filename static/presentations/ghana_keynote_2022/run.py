#!/usr/bin/python
import http.server, ssl

server_address = ("localhost", 443)
httpd = http.server.HTTPServer(server_address, http.server.SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket(httpd.socket,
    server_side=True,
    certfile="localhost.pem",
    ssl_version=ssl.PROTOCOL_TLSv1_2)
httpd.serve_forever()
