QRStream Decoder
=========

[![Build Status](https://travis-ci.org/qrstream/decoder.svg?branch=master)](https://travis-ci.org/qrstream/decoder)
[![Coverage Status](https://coveralls.io/repos/github/qrstream/decoder/badge.svg?branch=master)](https://coveralls.io/github/qrstream/decoder?branch=master)

A javascript library to decode the transferred QR code frames.

## Installation

  `npm install qrstream/decoder`

## Usage

### Use as npm package
  ``` javascript
    var Decoder = require('qrstream-decoder');
    var qrstream = Decoder();
    qrstream.init(metadataInJson); // the Decoder should be initialized with the metadata in json.
    qrstream.feed(payloadInJson); // When received a QR code and parsed it to json, feed to the Decoder
    qrstream.fetch(); // It merges all the payload when transfer finished.
  ```

To find more details in how to use QRStream decoder, please refer to [our example](example/app).