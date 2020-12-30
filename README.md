# Aurora
This is a framework for running and managing IOT lighting throughout your home. Currently it supports using the [ESP32](https://en.wikipedia.org/wiki/ESP32) and [ESP8266](https://en.wikipedia.org/wiki/ESP8266) style chips. The [firmware](https://github.com/ZackMattor/aurora-firmware) currently support adafruit neopixels which are fantastic RGB addressable LEDs. This firmware connects to a mqtt broker, [mosquitto](https://mosquitto.org/), which gets messages from the server application hosted in this repository. This server application sends frames down to the device to set the LED lighting. There is also a [control application](https://github.com/ZackMattor/aurora-app) to allow users to manage their lighting throughout their home.

## Bill of Materials
 - [ESP32](https://www.adafruit.com/product/3269)
 - [neopixels](https://www.adafruit.com/category/168)
 - wire
 - 5v Source
 - logic converters

## Build Setup

``` bash
# Install node V13.X.X (recommend NVM to manage node versions)

# install project dependencies
npm install

# build for production and view the bundle analyzer report
npm run build --report

# before pushing run `npm run lint`
```

## Environment Variables

```
MQTT_ENDPOINT | mqtt://localhost:1883
```
