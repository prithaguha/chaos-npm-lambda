const path = require("path");
// const onlyIfChangedPlugin = require("only-if-changed-webpack-plugin");
const webpack = require("webpack");

const opts = {
  rootDir: process.cwd()
};

module.exports = {
  target: "node",

  node: {
    __dirname: false
  },

  // plugins: [new BundleAnalyzerPlugin()],
  plugins: [
    // new onlyIfChangedPlugin({
    //   cacheDirectory: path.join(opts.rootDir, "dist/cache"),
    //   cacheIdentifier: opts // all variable opts/environment should be used in cache key
    // }),
    // See: https://github.com/bunkat/later/issues/155
    new webpack.EnvironmentPlugin({
      LATER_COV: false
    })
  ],
  module: {
    rules: [
      {
        test: /coffee$/,
        use: "shebang-loader"
      }
    ]
  },
  entry: "./main.js",
  output: {
    libraryTarget: "commonjs",

    // Don't use __dirname because that means the location of this file while we want the output
    // to be under the lambda function
    path: path.resolve(opts.rootDir, "dist"),
    filename: "index.js"
  },
  resolve: {
    // Unfortunately webpack does not respect NODE_PATH, so we have to tell webpack
    // where the rest of Turbot code is
    modules: [path.resolve(__dirname, "../lib"), "node_modules"]
  },
  mode: process.env.WEBPACK_MODE || "development",
  externals: {
    // These drivers are require'd by knex but not actually used or needed by Turbot. Webpack
    // can't work that out because knex loads them dynamically. So, we exclude them here to
    // keep the webpack size down.
    sqlite3: "sqlite3",
    mariasql: "mariasql",

    // mssql has to be excluded **below** tedious, not above this line ... beats me.
    "mssql/lib/base": "mssql/lib/base",
    "mssql/package.json": "mssql/package.json",

    // this is mssql tedious driver, unlikely ever be required in our package.json
    tedious: "tedious",

    mssql: "mssql",
    mysql: "mysql",
    mysql2: "mysql2",
    oracle: "oracle",
    "strong-oracle": "strong-oracle",
    oracledb: "oracledb",
    "pg-query-stream": "pg-query-stream",
    "pg-native": "pg-native",
    vm2: "vm2"
  }
};
