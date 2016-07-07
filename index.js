var fs = require('fs');
var path = require('path');
var Version = require('./version');

var VersionBumper = function(file, config) {
  this.file = file;
  this.config = config || {};
  this.target = this.config.target || "es6";
};

VersionBumper.prototype.parse = function(data) {
  data = data
    .replace(/^\s*module.exports\s*=\s*/, '')
    .replace(/^\s*export\s+(default\s*)?/, '')
    ;
  var info = JSON.parse(data);
  return new Version(info);
};

VersionBumper.prototype.parseBuffer = function(buf) {
  var data = buf.toString();
  return this.parse(data);
};

VersionBumper.prototype.read = function(file, callback) {
  var self = this;
  fs.readFile(this.file, function(err, buf) {
    if (err) {
      throw err;
    }
    var version = self.parseBuffer(buf.toString());
    callback(version);
  });
};


VersionBumper.prototype.load = function(callback) {
  this.read(this.file, callback);
};

VersionBumper.prototype.save = function(version, callback) {
  return this.write(this.file, version, callback);
};

VersionBumper.prototype.write = function(file, version, callback) {
  var configjson = version.toJson(null, "  ");
  switch (this.target) {
    case "es6":
      fs.writeFile(file, "export default " + configjson, callback);
      break;
    case "json":
      fs.writeFile(file, configjson, callback);
      break;
    case "commonjs":
    default:
      fs.writeFile(file, "module.exports = " + configjson, callback);
      break;
  }
};

VersionBumper.prototype.apply = function(compiler) {
  var self = this;
  compiler.plugin('run', function(compilation, callback) {
    self.read(self.file, function(version) {
      version.buildNumber++;
      self.write(self.file, version, callback);
    });
  });
};
module.exports = VersionBumper;
