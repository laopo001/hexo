---
title: webpack2+antd+andt moblie脚手架
slug: webpack2-antd-andt-mobliejiao-shou-jia
date: 2017-03-27T10:09:23.000Z
date_updated: 2017-03-27T11:03:03.000Z
---

自己实验一下webpack2的新功能。还是和1有点不同，很多配置改变了。

> 前端工程目录

![](/source/images/2017/03/-PUT--G-NDM6-2DSZ--DB-I.png)

> webpack.config.js

    
    var path = require("path")
    module.exports = {
        context: __dirname + "/src",
        entry: {
            index: ["babel-polyfill", "./index.js"],
        },
        output: {
            filename: "[name].bundle.js",
            path: __dirname + "/dist/",
    
            publicPath: "/",            // New
        },
        module: {
            rules: [{
                test: /\.jsx?$/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: ["react", "es2015", "stage-0"],
                        plugins: ["transform-runtime",]
                    },
                }],
                exclude: /node_modules/
    
            }, {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            }, {
                test: /\.css$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }]
            }, {
                test: /\.(svg)$/i,
                use: [{
                    loader: 'svg-sprite-loader'
                }],
                include: [
                    require.resolve('antd-mobile').replace(/warn\.js$/, ''),
                    path.resolve(__dirname, 'src/svgs')
                ]
            }]
        },
        resolve: {
            extensions: ['.web.js', '.js', '.json'],
            modules: ['node_modules', path.resolve(__dirname, 'node_modules')]
        },
        devServer: {
            contentBase: __dirname + "/src",  // New
        },
    };
    

> package.json

    {
      "name": "myapp",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "dev": "./node_modules/.bin/webpack-dev-server",
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "keywords": [
        "webpack2"
      ],
      "author": "ldh",
      "license": "ISC",
      "devDependencies": {
        "babel-core": "^6.24.0",
        "babel-loader": "^6.4.1",
        "babel-plugin-import": "^1.1.1",
        "babel-plugin-transform-runtime": "^6.23.0",
        "babel-preset-es2015": "^6.24.0",
        "babel-preset-react": "^6.23.0",
        "babel-preset-stage-0": "^6.22.0",
        "css-loader": "^0.27.3",
        "node-sass": "^4.5.0",
        "sass-loader": "^6.0.3",
        "style-loader": "^0.14.1",
        "svg-sprite-loader": "^0.3.0",
        "webpack": "^2.2.1",
        "webpack-dev-server": "^2.4.2"
      },
      "dependencies": {
        "antd": "^2.8.1",
        "antd-mobile": "^1.0.6",
        "babel-polyfill": "^6.23.0",
        "codemirror": "^5.24.2",
        "dva": "^1.2.1",
        "react": "^15.4.2",
        "react-dom": "^15.4.2"
      }
    }
    

> .babelrc

    {"plugins": [["import", { "style": "css", "libraryName": "antd-mobile" }]]}
    
