from random import randint
from typing import Dict
from rpi.sensors.arduino import ArduinoI


class ArduinoMock(ArduinoI):
    def get_data(self) -> Dict:
        return {'temperature': randint(20, 30), 'humidity': randint(20, 80), 'distance': randint(0, 100)}
