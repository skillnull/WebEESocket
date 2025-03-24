module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry",
        "es2015": {
          "modules": false
        }
      }
    ]
  ]
}
