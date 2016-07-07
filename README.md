webpack plugin for version bumping

```js
module.exports = {
  ...
  'plugins': [
    new VersionBumper("./src/version.js", { "target": "es6" })
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
version.toString()
version.toJson()
```

