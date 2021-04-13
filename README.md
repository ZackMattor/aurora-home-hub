# Aurora Home Hub
This is a framework for running and managing IOT lighting throughout your home. Currently it supports using the [ESP32](https://en.wikipedia.org/wiki/ESP32) and [ESP8266](https://en.wikipedia.org/wiki/ESP8266) style chips. The [firmware](https://github.com/ZackMattor/aurora-firmware) currently support adafruit neopixels which are fantastic RGB addressable LEDs. This firmware connects to a mqtt broker, [mosquitto](https://mosquitto.org/), which gets messages from the server application hosted in this repository. This server application sends frames down to the device to set the LED lighting. There is also a [control application](https://github.com/ZackMattor/aurora-app) to allow users to manage their lighting throughout their home.

https://imgur.com/gallery/hAcF4hQ

**This is part of the Aurora Lighting System**

[Aurora Firmware](https://github.com/ZackMattor/aurora-firmware)

[Aurora Home Hub](https://github.com/ZackMattor/aurora-home-hub)

[Aurora App](https://github.com/ZackMattor/aurora-app-v2)


## Bill of Materials
 - [ESP32](https://www.adafruit.com/product/3269)
 - [neopixels](https://www.adafruit.com/category/168)

## Getting Started

``` bash
# Install node V15.X.X (recommend NVM to manage node versions)
nvm install 15

npm install
npm start
```

## API
```
[GET] /api/lights
[GET] /api/lights/{lightId}/animation
[PATCH] /api/lights/{lightId}/animation
```
