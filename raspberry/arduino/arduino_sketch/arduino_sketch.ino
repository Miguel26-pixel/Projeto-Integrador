#include "DHT.h"
#define DHTPIN 2
#define DHTTYPE DHT11
#define DHT_POLL_RATE 2000

#define HC_SR04_POLL_RATE 2000
#define ECHO_PIN 4
#define TRIGGER_PIN 5

#define WAIT_TIME 200

DHT dht(DHTPIN, DHTTYPE);
unsigned long dhtLastTime;
unsigned long hcLastTime;

typedef struct DHTResult
{
    float humidity;
    float temperature;
    bool valid;
} DHTResult;

typedef struct HCSRO4Result
{
    float distance;
    bool valid;
} HCSRO4Result;

void setup()
{
    // put your setup code here, to run once:
    Serial.begin(9600);
    dhtLastTime = 0;
    hcLastTime = 0;
    pinMode(TRIGGER_PIN, OUTPUT);
    pinMode(ECHO_PIN, INPUT);
    dht.begin();
}

DHTResult readDHT(float curTime)
{
    DHTResult result;

    if (curTime - dhtLastTime < DHT_POLL_RATE)
    {
        result.valid = false;
        return result;
    }

    dhtLastTime = curTime;
    result.humidity = dht.readHumidity();
    result.temperature = dht.readTemperature();

    if (isnan(result.humidity) || isnan(result.temperature))
    {
        result.valid = false;
        return result;
    }

    result.valid = true;
    return result;
}

HCSRO4Result readHCSRO4(float curTime)
{
    HCSRO4Result result;

    if (curTime - hcLastTime < HC_SR04_POLL_RATE)
    {
        result.valid = false;
        return result;
    }

    hcLastTime = curTime;
    digitalWrite(TRIGGER_PIN, LOW);
    delayMicroseconds(2);
    digitalWrite(TRIGGER_PIN, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIGGER_PIN, LOW);

    long duration = pulseIn(ECHO_PIN, HIGH);
    result.distance = duration * 0.034 / 2;

    if (result.distance == 0)
    {
        result.valid = false;
        return result;
    }

    result.valid = true;
    return result;
}

void loop()
{
    delay(WAIT_TIME);

    float curTime = millis();
    DHTResult results = readDHT(curTime);

    curTime = millis();
    HCSRO4Result results2 = readHCSRO4(curTime);

    if(!results.valid && !results2.valid) {
        return;
    }

    if (results.valid) {
        Serial.print("temperature: ");
        Serial.print(results.temperature);
        Serial.print(", humidity: ");
        Serial.print(results.humidity);
    }

    if (results2.valid) {
        if(results.valid) {
            Serial.print(", ");
        }
        Serial.print("distance: ");
        Serial.println(results2.distance);
    } else {
        Serial.println();
    }
}
