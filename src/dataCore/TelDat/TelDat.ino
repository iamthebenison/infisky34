#include <WiFi.h>
#include <XBee.h>
#include <SoftwareSerial.h>

// XBee pins
#define XBEE_RX 16  // RX pin of XBee connected to GPIO 16
#define XBEE_TX 17  // TX pin of XBee connected to GPIO 17

// XBee object
XBee xbee = XBee();

// Remote XBee address
XBeeAddress64 remoteAddress = XBeeAddress64(0x0013a200, 0x40AB5C01); // Replace with your remote XBee's address

// Telemetry data
float telemetryData = 0.0; // Replace with your telemetry data

SoftwareSerial nss(XBEE_RX, XBEE_TX);

void setup() {
  Serial.begin(9600);
  delay(100);
  xbee.setSerial(Serial);
  nss.begin(19200);

  // XBee setup
  // xbee.setSerial(XBEE_RX, XBEE_TX);
}

void loop() {
  // Sample telemetry data (replace with your data source)
  telemetryData = random(1000) / 10.0; // Random telemetry data

  // Create the payload
  uint8_t payload[4];
  memcpy(payload, &telemetryData, sizeof(telemetryData));

  // Send the telemetry data
  ZBTxRequest tx = ZBTxRequest(remoteAddress, payload, sizeof(payload));
  xbee.send(tx);

  delay(1000); // Adjust the delay as needed
}
