from netmiko import ConnectHandler
import logging 

# Global Variables
net_connect = None
class CiscoConf:
    def __init__(self, device_type, host, username, password):
        self.device_type = device_type
        self.host = host
        self.username = username
        self.password = password

    def conexion_SSH(self):
        global net_connect
        net_connect = ConnectHandler(**self.__dict__)
        out= 'HOSTNAME DEL EQUIPO: ' + net_connect.find_prompt() 
        #return out

    def terminar_Conexion(self):
         global net_connect
         net_connect.disconnect()

    def set_hostname(self, name):
         global net_connect
         out = net_connect.send_command("hostname " + name)
         print( net_connect.find_prompt())

    def show_ip_route(self):
        global net_connect
        out = net_connect.send_command('Show ip route')
        return out

    def show_interfaces_brief(self):
        global net_connect
        out = net_connect.send_command('Show ip interface brief')
        return out

    def interface_on_of(self, tipo, numero, estado):
        global net_connect
        command = ['int ' + tipo + ' ' + numero]
        if (estado): 
            #Si estado == true enciende interfaz
           command.append('no shut')
        else:
           command.append('shutdown')
        out = net_connect.send_config_set(command)
        return out

    def set_interface_ipadd(self, tipo, numero, ip, mask):
        global net_connect
        command = ['int ' + tipo + ' ' + numero]
        command.append('ip address '+ ip + ' ' + mask)
        out = net_connect.send_config_set(command)
        self.interface_on_of(tipo,numero,True)
        return out

    def del_interface_ipadd(self,tipo, numero):
        global net_connect
        command = ['int ' + tipo + ' ' + numero]
        command.append('no ip address')
        out = net_connect.send_config_set(command)
        self.interface_on_of(tipo,numero,False)
        return out

    def set_iproute(self, network, mask , nexthop ):
        global net_connect
        command = 'ip route ' + network +' ' + mask + ' ' + nexthop
        out = net_connect.send_config_set(command)
        return out

    def del_iproute(self,network, mask , nexthop ):
        global net_connect
        command = 'no ip route ' + network +' ' + mask + ' ' + nexthop
        out = net_connect.send_config_set(command)
        return out
