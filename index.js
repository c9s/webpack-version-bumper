var fs = require('fs');
var path = require('path');

var VersionBumper = function(file, config) {
  this.file = file;
  this.chunkVersions = {};
  config = config || {};
  this.target = config.target || "es6";
};

VersionBumper.prototype.parseBuffer = function(buf) {
  var data = buf.toString();
  data = data
    .replace(/^\s*module.exports\s*=\s*/, '')
    .replace(/^\s*export\s+(default\s*)?/, '')
    ;
  return JSON.parse(data);
};

VersionBumper.prototype.read = function(file, callback) {
  fs.readFile(self.file, function(err, buf) {
    if (err) {
      throw err;
    }
    var obj = self.parseBuffer(buf.toString());
    obj.majorVersion = obj.majorVersion || 0;
    obj.minorVersion = obj.minorVersion || 0;
    obj.patchVersion = obj.patchVersion || 1;
    obj.buildNumber = obj.buildNumber || 1;
    callback(obj);
  });
};

VersionBumper.prototype.write = function(file, obj, callback) {
  var configjson = JSON.stringify(obj, null, "  ");
  switch (self.target) {
    case "es6":
      fs.writeFile(file, "export default " + configjson, callback);
      break;
    case "json":
      fs.writeFile(file, configjson, callback);
      break;
    default:
      fs.writeFile(file, "module.exports = " + configjson, callback);
      break;
  }
};

VersionBumper.prototype.apply = function(compiler) {
  var self = this;
  compiler.plugin('run', function(compilation, callback) {
    self.read(self.file, function(obj) {
      obj.buildNumber = (parseInt(obj.buildNumber) || 0) + 1;
      self.write(self.file, obj, callback);
    });
  });
};
module.exports = VersionBumper;
