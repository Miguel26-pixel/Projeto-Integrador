from random import randint
from rpi.sensors.dht import DHT, DHTResults

class DHTMock(DHT):
    def get_data(self, cur_time: float) -> DHTResults:
        return DHTResults(temperature=randint(20, 30), humidity=randint(20, 80))
