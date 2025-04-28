module.exports = {
  targets: "defaults",
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        loose: true,
      },
    ],
    "@babel/preset-typescript",
  ],
};
