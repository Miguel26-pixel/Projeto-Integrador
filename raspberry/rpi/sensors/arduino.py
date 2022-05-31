from collections import namedtuple
from abc import abstractmethod

import serial
import serial.tools.list_ports

ArduinoData = namedtuple("ArduinoData", ["temperature", "humidity"])
DHTResults = namedtuple("DHTResults", ["temperature", "humidity"])


class ArduinoI:
    '''Interface for the DHT sensor'''

    @abstractmethod
    def get_data(self) -> ArduinoData:
        '''Get sensor data from the Arduino.'''


class Arduino(ArduinoI):
    def __init__(self) -> None:
        self.__port: str = self.__find_arduino()
        self.__arduino: serial.Serial = serial.Serial(
            port=self.__port, baudrate=9600, timeout=.1)
        self.__previous_dht: DHTResults = DHTResults(
            temperature=None, humidity=None)

    def __find_arduino(self) -> str:
        ports = list(serial.tools.list_ports.comports())
        for port in ports:
            if 'Arduino' in port.manufacturer:
                return port.device

    def get_data(self) -> ArduinoData | None:
        '''Get sensor data from the Arduino.'''

        if self.__arduino.in_waiting > 0:
            data = self.__arduino.readline().decode('utf-8')
            data = data.strip()
            data = data.split(', ')

            if data[0] == 'dht':
                dht_result = DHTResults(temperature=float(
                    data[1]), humidity=float(data[2]))
                self.__previous_dht = dht_result

                return ArduinoData(temperature=dht_result.temperature, humidity=dht_result.humidity)

        return ArduinoData(
            temperature=self.__previous_dht.temperature,
            humidity=self.__previous_dht.humidity
        )
