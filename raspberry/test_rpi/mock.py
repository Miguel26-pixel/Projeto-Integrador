from random import randint
from time import time
from typing import Dict
from rpi.sensors.arduino import ArduinoI


class ArduinoMock(ArduinoI):
    def __init__(self) -> None:
        self.port = "0"
        self.last = 0

    def get_data(self) -> Dict:
        if time() - self.last > 2:
            self.last = time()
            return {
                'temperature': randint(20, 30),
                'humidity': randint(20, 80),
                'distance': randint(0, 100)
            }

        return None
