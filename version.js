var Version = function(info) {
  info = info || {};
  this.majorVersion = info.majorVersion || 0;
  this.minorVersion = info.minorVersion || 0;
  this.patchVersion = info.patchVersion || 1;
  this.buildNumber = info.buildNumber || 0;
};
Version.prototype.toString = function() {
  var str = this.majorVersion 
    + "." + this.minorVersion 
    + "." + this.patchVersion;
    if (this.buildNumber) {
      str += "." + this.buildNumber;
    }
  return str;
};

Version.prototype.bumpBuildNumber = function() {
  this.buildNumber++;
};

Version.prototype.toJson = function(options, space) {
  return JSON.stringify({
    majorVersion: this.majorVersion,
    minorVersion: this.minorVersion,
    patchVersion: this.patchVersion,
    buildNumber: this.buildNumber
  }, options, space);
};
module.exports = Version;
