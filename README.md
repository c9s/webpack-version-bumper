webpack plugin for build number bumping

```js
var VersionBumper = require('webpack-version-bumper');

module.exports = {
  ...
  'plugins': [
    new VersionBumper("./src/version.js", { "target": "es6", "format": "$major.$minor.$patch.$build" })
  ],
};
```

Available targets are:

- es6
- json
- commonjs

Then you can include the version in your entry file:

```js
var version = require("./version");
version.majorVersion
version.minorVersion
version.buildNumber
version.toString()
version.toJson()
```

