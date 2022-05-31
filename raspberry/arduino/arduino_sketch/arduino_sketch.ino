#include "DHT.h"
#define DHTPIN 2
#define DHTTYPE DHT11
#define POLL_RATE 2000
#define RETRY_RATE 2000

DHT dht(DHTPIN, DHTTYPE);
unsigned long lastTime;

typedef struct DHTResults
{
    float humidity;
    float temperature;
    bool valid;
} DHTResults;

void setup()
{
    // put your setup code here, to run once:
    Serial.begin(9600);
    lastTime = 0;
    dht.begin();
}

DHTResults readDHT(float curTime)
{
    DHTResults result;

    if (curTime - lastTime < RETRY_RATE)
    {
        result.valid = false;
        return result;
    }

    result.humidity = dht.readHumidity();
    result.temperature = dht.readTemperature();

    if (isnan(result.humidity) || isnan(result.temperature))
    {
        lastTime = curTime;
        result.valid = false;

        return result;
    }

    result.valid = true;
    return result;
}

void loop()
{
    // put your main code here, to run repeatedly:
    delay(POLL_RATE);

    float curTime = millis();

    DHTResults results = readDHT(curTime);

    if (results.valid)
    {
        Serial.print("dht, ");
        Serial.print(results.temperature);
        Serial.print(", ");
        Serial.println(results.humidity);
    }
}
