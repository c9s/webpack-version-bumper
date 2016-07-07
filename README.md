webpack plugin for version bumping

```js
module.exports = {
  ...
  'plugins': [
    new VersionBumper("./src/version.ts", { "target": "es6" })
  ],
};
```

Available targets are:

- es6
- json
- commonjs
