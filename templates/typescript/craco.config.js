const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")
// const { BugsnagSourceMapUploaderPlugin } = require("webpack-bugsnag-plugins")
const { dependencies } = require("./package.json")
const path = require("path")

module.exports = {
  webpack: {
    plugins: {
      add: [
        new ModuleFederationPlugin({
          name: "App",
          filename: "remoteEntry.js",
          exposes: {
            "./Feature": "./src/features/Feature",
          },
          remotes: {
            RoutingExample: "App@http://cra-remoteapp.s3-website.us-east-2.amazonaws.com/remoteEntry.js",
          },
          shared: {
            react: {
              singleton: true,
              requiredVersion: dependencies["react"],
            },
            "react-dom": {
              singleton: true,
              requiredVersion: dependencies["react-dom"],
            },
            "react-router-dom": {
              singleton: true,
              requiredVersion: dependencies["react-router-dom"],
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
    configure: {
      output: {
        publicPath: "auto",
      },
    },
  },
  // module federation breaks hot module reload, use webpack's liveReload instead
  // https://github.com/webpack/webpack/issues/11240
  devServer: {
    liveReload: true,
    watchFiles: [path.resolve(__dirname)],
  },
}
