'use strict';

var expect = require('chai').expect;
var md5 = require('md5');

var {Decoder} = require('../index');

describe('#qrstream', function() {
  it('should return correct seq number', function() {
    var qrstream = Decoder();
    qrstream.init("asdf|3|3|FILE|50|md5sum|hello.txt");
    var seq;
    seq = qrstream.feed("asdf001hello world1");
    expect(seq).to.equal(1);
    expect(qrstream.payloads[0]).to.equal("hello world1")
    seq = qrstream.feed("asdf002hello world2");
    expect(seq).to.equal(2);
    expect(qrstream.payloads[1]).to.equal("hello world2")
    seq = qrstream.feed("asdf003hello world3");
    expect(seq).to.equal(3);
    expect(qrstream.payloads[2]).to.equal("hello world3")
  })
});