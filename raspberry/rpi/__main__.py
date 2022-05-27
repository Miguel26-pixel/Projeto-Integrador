import board
from rpi.sensors.dht11 import DHT11
import rpi.main as rpi


if __name__ == "__main__":
    rpi.main(DHT11(data_pin=board.D4))
