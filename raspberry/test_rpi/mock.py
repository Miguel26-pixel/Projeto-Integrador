from random import randint
from rpi.sensors.arduino import ArduinoData, ArduinoI


class ArduinoMock(ArduinoI):
    def get_data(self) -> ArduinoData:
        return ArduinoData(temperature=randint(20, 30), humidity=randint(20, 80))
