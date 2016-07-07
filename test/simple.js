var should = require('chai').should();
var assert = require('chai').assert;
var Version = require('../version');
var VersionBumper = require('../index.js');

describe('Version', function() {
  it('toString', function() {
    var ver = new Version({ 
      majorVersion: 0,
      minorVersion: 1,
      patchVersion: 1,
      buildNumber: 0
    });
    assert.equal("0.1.1", ver.toString());
  });

  it('toJson', function() {
    var ver = new Version({ 
      majorVersion: 0,
      minorVersion: 1,
      patchVersion: 1,
      buildNumber: 0
    });
    assert.equal('{"majorVersion":0,"minorVersion":1,"patchVersion":1,"buildNumber":0}', ver.toJson());
  });
});

describe('VersionBumper', function() {
  it('write and read', function() {
    var plugin = new VersionBumper("test-version.js", { target: "es6" });
    plugin.save(new Version);
    plugin.load(function(ver) {
      assert.equal("0.1.1", ver.toString());
    });
  });
});
