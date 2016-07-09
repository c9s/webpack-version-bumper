var Version = function(info, config) {
  info = info || {};
  this.config = config || {};
  this.majorVersion = info.majorVersion || 0;
  this.minorVersion = info.minorVersion || 0;
  this.patchVersion = info.patchVersion || 1;
  this.buildNumber = info.buildNumber || 0;
};
Version.prototype.toString = function() {
  var format = this.config.format || '$major.$minor.$patch';
  return format
        .replace(/\$major/, this.majorVersion)
        .replace(/\$minor/, this.minorVersion)
        .replace(/\$patch/, this.patchVersion)
        .replace(/\$build/, this.buildNumber);
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
