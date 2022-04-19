const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")
// const { BugsnagSourceMapUploaderPlugin } = require("webpack-bugsnag-plugins")
const { dependencies } = require("./package.json")
const path = require("path")

module.exports = {
  webpack: {
    configure: {
      output: {
        publicPath: "auto",
      },
    },
    plugins: {
      add: [
        new ModuleFederationPlugin({
          name: "AppName",
          filename: "remoteEntry.js",
          exposes: {
            "./SomeFeature": "./src/features/SomeFeature",
          },
          shared: {
            ...dependencies,
            react: {
              singleton: true,
              requiredVersion: dependencies["react"],
            },
            "react-dom": {
              singleton: true,
              requiredVersion: dependencies["react-dom"],
            },
          },
        }),
        // new BugsnagSourceMapUploaderPlugin({
        //   apiKey: "YOUR_API_KEY",
        //   appVersion: "0.1.0",
        //   endpoint: "https://bugsnag.8x8.com/upload",
        //   overwrite: true
        // })
      ],
    },
  },
  // module federation breaks hot module reload, use webpack's liveReload instead
  // https://github.com/webpack/webpack/issues/11240
  devServer: {
    liveReload: true,
    watchFiles: [path.resolve(__dirname)],
    port: 3001,
  },
}
