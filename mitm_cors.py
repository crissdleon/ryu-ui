# Script for mitmproxy, used in ../rundev.sh. Not meant to be run directly.
from mitmproxy import http
from CiscoConf import CiscoConf
import json
import logging 
import requests as rq
import inspect
import ipaddress
from auth import login, generate_token, decode_token
from flask import jsonify

# More information about CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

router_list = [None,CiscoConf('cisco_ios','10.0.0.1','admin','management'),CiscoConf('cisco_ios','10.0.0.2','admin','management'),CiscoConf('cisco_ios','10.0.0.3','admin','management')]

logging.basicConfig(filename="log",
                            filemode='a',
                            format='%(asctime)s,%(msecs)d %(name)s %(levelname)s %(message)s',
                            datefmt='%H:%M:%S',
                            level=logging.INFO)

# ALLOW_ORIGIN = "https://routerconfig.netlify.app"
ALLOW_ORIGIN = "http://localhost:3000"
ALLOW_HEADERS = "Authorization, *"  # Which headers the browser may send
# Which headers the browser may expose to scripts
EXPOSE_HEADERS = "Authorization, *"
HIDE_ORIGIN = True


def response(flow):
    try:
        if flow.request.method == "DELETE":
            state = str(flow.request.headers["state"])
            data_state = json.loads(state)
            switch_id = json.loads(flow.response.get_text())[0]['switch_id']
            data_request = json.loads(flow.request.get_text())
            if "success" in flow.response.get_text():
                if "route_id" in flow.request.get_text():
                    # Lista de rutas
                    data_routes = data_state[0]['internal_network'][0]['route']
                    # iterar en la lista de rutas
                    for route in data_routes:
                        route_id = route["route_id"]
                        # buscar en la lista de rutas la correspondiente al id con la que se va a borrar
                        if route_id == data_request["route_id"]:
                            destination = route["destination"]
                            gateway = route["gateway"]
                            router_list[(int(switch_id))].conexion_SSH()
                            # Eliminar ruta
                            # permite convertir el CIDR a netmask en octetos
                            ip_add = ipaddress.ip_network(destination, False)
                            output = router_list[(int(switch_id))].del_iproute(
                                str(ip_add.network_address), str(ip_add.netmask), gateway)
                            # terminar conexion
                            router_list[(int(switch_id))].terminar_Conexion()
                            logging.info(
                                f"Se elimino una ruta estatica, Resultado: {output}")

                elif "address_id" in flow.request.get_text():
                    # Lista de direcciones
                    data_addresses = data_state[0]['internal_network'][0]['address']
                    for address in data_addresses:
                        address_id = address["address_id"]
                        # Se compara cada valor de la lista de direcciones con el id enviado en el request
                        if address_id == data_request["address_id"]:
                            ip_add = address["address"]
                            router_list[(int(switch_id))].conexion_SSH()
                            router_list[(int(switch_id))].del_interface_ipadd(
                                "Fastethernet", "0/1")
                            router_list[(int(switch_id))].terminar_Conexion()
                            logging.info(
                                f"Se Elimino la Direccion IP de la int FA 0/1 :")

        if flow.request.method == "POST":

            data_response = json.loads(flow.response.get_text())
            switch_id = data_response[0]['switch_id']
            data_request = json.loads(flow.request.get_text())

            if "success" in flow.response.get_text():

                if "Add route" in flow.response.get_text():
                    # Extraccion de Data
                    destination = data_request['destination']
                    gateway = data_request['gateway']

                    # iniciar conexion
                    router_list[(int(switch_id))].conexion_SSH()

                    # enviar ruta
                    # permite convertir el CIDR a netmask en octetos
                    ip_add = ipaddress.ip_network(destination, False)
                    output = router_list[(int(switch_id))].set_iproute(
                        str(ip_add.network_address), str(ip_add.netmask), data_request["gateway"])
                    # terminar conexion
                    router_list[(int(switch_id))].terminar_Conexion()
                    logging.info(
                        f"Se envio una ruta estatica, Resultado: {output}")

                elif "Add address" in flow.response.get_text():
                    # Extraccion de data relevante
                    address = data_request['address']
                    # iniciar conexion
                    router_list[(int(switch_id))].conexion_SSH()

                    # enviar direcciones:
                    """Todas las direcciones se enviaran unicamente a la interfaz FA0/1, se limitara la pag a agregar solo una direccion ip"""
                    ip_add = ipaddress.ip_network(
                        data_request["address"], False)
                    output = router_list[(int(switch_id))].set_interface_ipadd(
                        "Fastethernet", "0/1", str(ip_add[1]), str(ip_add.netmask))

                    # terminar conexion
                    router_list[(int(switch_id))].terminar_Conexion()
                    logging.info(
                        f"Se cambio la direccion IP a la interfaz FA0/1, Resultado: {output}")

    except:
        logging.exception('Got exception on main handler')

    """it's a callback to handle context"""

    flow.response.headers["Access-Control-Allow-Origin"] = ALLOW_ORIGIN
    flow.response.headers["Access-Control-Expose-Headers"] = EXPOSE_HEADERS


def request(flow):
    # Hijack CORS OPTIONS request

    isauth(flow.request.headers, flow)
    middle_login(flow)

    # de aqui hacia abajo.
    if flow.request.method == "DELETE":
        # if "route_id" in flow.request.get_text():
        router_id = flow.request.path.split("/")[2]
        result = rq.get(f"http://localhost:8080/router/{router_id}")
        flow.request.headers["state"] = result.text

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
                flow.response = http.HTTPResponse.make(
                    401,  # (optional) status code
                    b"no autorizado",
                    {"Content-Type": "application/json"}  # (optional) headers
                )
        else:
            flow.response = http.HTTPResponse.make(
                401,  # (optional) status code
                b"no autorizado",
                # (optional) headers
                {"Content-Type": "application/json"}
            )


def middle_login(flow):
    if flow.request.path == "/login":
        if flow.request.method == "POST":
            user = json.loads(flow.request.data.content)
            if login(user["user"], user["password"]):
                token = {"user": user['user'],
                         "token": generate_token(user["user"])}
                flow.response = http.HTTPResponse.make(
                    200,  # (optional) status code
                    json.dumps(token).encode('utf-8'),  # (optional) content
                    {"Content-Type": "application/json"}  # (optional) headers
                )
