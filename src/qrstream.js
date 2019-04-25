"use strict";

var md5 = require('md5');

var qrstream = function () {
  var Decoder = function() {
    var _this = {
      status: 0,
      missingIDs: undefined,
      payloads: undefined,
    };

    _this.init = function(rawMetadata) {
      _this.status = 0;
      _this.missingIDs = undefined;
      _this.payloads = undefined;

      var values = rawMetadata.split('|');
      if ((values.length === 7 && values[3] === 'FILE') || (values.length === 6 && values[3] === 'TEXT')) {
        var tag = values[0];
        var seqlen = parseInt(values[1]);
        var count = parseInt(values[2]);
        var type = values[3];
        var size = parseInt(values[4]);
        var md5sum = values[5];
        var name = values.length === 7 ? values[6] : undefined;

        _this.metadata = {tag, seqlen, count, type, size, md5sum, name};
        _this.status = 1;
        _this.missingIDs = new Set(Array.from({length: _this.metadata.count}, (x,i) => i + 1));
        _this.payloads = new Array(_this.metadata.count);
      } else {
        console.log("Wrong format!");
      }
    };

    _this.feed = function(rawPayload) {
      var metadata = _this.metadata;
      if (_this.status === 1 && rawPayload && rawPayload.startsWith(metadata.tag)) {
        var seq = rawPayload.substr(metadata.tag.length, metadata.seqlen);
        seq = parseInt(seq, 16);
        var content = rawPayload.substr(metadata.tag.length + metadata.seqlen);

        if (seq <= metadata.count) {
          _this.payloads[seq-1] = content;
          _this.missingIDs.delete(seq);

          if (_this.missingIDs.size === 0) {
            _this.status = 2;
          }
        }
        return seq;
      }
    };

    _this.fetch = function() {
      return _this.status === 2 ? _this.payloads.join('') : undefined;
    }

    return _this;
  };

  return Decoder;
}();

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  }
}(function () {
  return qrstream;
}));

