
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const devMode = false;
console.log('devMode:' + devMode);

/*
module.exports = {
   devtool: 'eval-source-map',
  entry:  __dirname + "\\koa2App.js",//唯一入口文件
  output: {
    path: __dirname + "\\public",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  },
    mode: 'development', // 设置mode
    target: 'node',
    externals:  /node_modules/,
   devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
    // hot: true,
  } ,
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env"/!*, "stage-0"*!/
                        ],
                       /!* env: {
                            "development": {
                                "plugins": [["react-transform", {
                                    "transforms": [{
                                        "transform": "react-transform-hmr",

                                        "imports": ["react"],

                                        "locals": ["module"]
                                    }]
                                }]]
                            }
                        }*!/
                    }
                },
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new webpack.BannerPlugin('kaotwoServer demo'),
        new CleanWebpackPlugin('public/!*.*', {
            root: __dirname,
            verbose: true,
            dry: false
        }),
    ],
    optimization: {
        minimize: false,
    }
}*/


const path = require('path');

function resolve(dir) {
    return path.resolve(__dirname, dir);
}

module.exports = {
    entry: {
        app: ['babel-polyfill', './koa2App.js'],
    },
    target: 'node',
    output: {
        path: __dirname,
        filename: '[name].min.js'
    },
    resolve: {
        modules: [".", "node_modules"],
        extensions: ['.js'],
        /*   alias: {
               "cfg": resolve("cfg.js")
           }*/
    },
    /*  externals: function () {
          let manifest = require('./package.json');
          let dependencies = manifest.dependencies;
          let externals = {};
          for (let p in dependencies) {
              externals[p] = 'commonjs ' + p;
          }
          externals["cfg"] = "commonjs cfg";
          return externals;
      }(),*/
    node: {
        console: true,
        global: true,
        process: true,
        Buffer: true,
        __filename: true,
        __dirname: true,
        setImmediate: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                },
                exclude: /node_modules/
            },
        ]
    },
};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = (module.exports.plugins || []).concat([new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: false
    })]);
}