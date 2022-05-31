from re import S
import serial
import serial.tools.list_ports

class Arduino:
    def __init__(self) -> None:
        self.port = self.__find_arduino()

    def __find_arduino(self) -> str:
        ports = list(serial.tools.list_ports.comports())
        for port in ports:
            if 'Arduino' in port.manufacturer:
                return port.device