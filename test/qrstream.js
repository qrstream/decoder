'use strict';

var expect = require('chai').expect;
var md5 = require('md5');

var Decoder = require('../index');

describe('#qrstream', function() {
  it('should return correct seq number', function() {
    var qrstream = Decoder();
    qrstream.init("asdf|3|3|FILE|50|md5sum|hello.txt");
    var seq;
    seq = qrstream.feed("asdf001hello world1");
    expect(seq).to.equal(1);
    expect(qrstream.payloads[0]).to.equal("hello world1");
    seq = qrstream.feed("asdf002hello world2");
    expect(seq).to.equal(2);
    expect(qrstream.payloads[1]).to.equal("hello world2");
    seq = qrstream.feed("asdf004hello world4");
    expect(seq).to.equal(-1);
    seq = qrstream.feed("asdf003hello world3");
    expect(seq).to.equal(3);
    expect(qrstream.payloads[2]).to.equal("hello world3");
    var content = qrstream.fetch();
    expect(content).to.equal("hello world1hello world2hello world3");
  });

  it('should print Wrong format', function() {
    var qrstream = Decoder();
    qrstream.init("asdf|3|FILE|50|md5sum|hello.txt");
    expect(qrstream.status).to.equal(0);
    var seq = qrstream.feed("ASDF003hello world3");
    expect(seq).to.equal(undefined);
  });

  it('should fetch nothing when status not ready', function() {
    var qrstream = Decoder();
    var content = qrstream.fetch();
    expect(content).to.equal(undefined);
  });


  it('should return undefined name', function() {
    var qrstream = Decoder();
    qrstream.init("asdf|3|3|TEXT|50|md5sum");
    expect(qrstream.metadata.name).to.equal(undefined);
  });
});