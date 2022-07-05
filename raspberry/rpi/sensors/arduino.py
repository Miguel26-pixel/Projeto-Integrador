from collections import namedtuple
from abc import abstractmethod
from typing import Dict, Union

import serial
import serial.tools.list_ports

class ArduinoI:
    '''Interface for the DHT sensor'''

    @abstractmethod
    def get_data(self) -> Dict:
        '''Get sensor data from the Arduino.'''


class Arduino(ArduinoI):
    def __init__(self) -> None:
        self.port: str = self.__find_arduino()
        self.__arduino: serial.Serial = serial.Serial(
            port=self.port, baudrate=9600, timeout=.1)

    def __find_arduino(self) -> str:
        ports = list(serial.tools.list_ports.comports())
        for port in ports:
            if 'Arduino' in port.manufacturer:
                return port.device

    def get_data(self) -> Union[Dict, None]:
        '''Get sensor data from the Arduino.'''

        if self.__arduino.in_waiting > 0:
            # Read only last entry
            while self.__arduino.in_waiting > 0:
                data = self.__arduino.readline().decode('utf-8')
         
            data = data.strip()
            data = data.split(', ')
            result = {}

            for value_pair in data:
                pair = value_pair.split(': ')
                if len(pair) != 2:
                    continue
                name, value = pair

                result[name] = value
            
            return result

        return None
