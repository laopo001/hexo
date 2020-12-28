---
title: html-webpack-plugin使用
slug: html-webpack-pluginshiyong
date: 2016-07-13T10:30:59.000Z
date_updated: 2017-01-17T06:31:04.000Z
---

一般，升级网站，要改js名字，加个版本号等。现在，有html-webpack-plugin，自动生成html。真正的前端自动化。

    var path = require('path');  
    var webpack = require('webpack');  
    var HtmlWebpackPlugin = require('html-webpack-plugin');
    
    module.exports = {  
        entry: {
            page1: "./js/page1.js",   //人口文件
            page2:"./js/page2.js"
        },
        output: {
            path: __dirname + '/build',
            filename: "[hash:8].[name].bundle.js",
            publicPath: "/static/build/",
            chunkFilename:'[hash:8].[name].chunkbundle.js'
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: "commons",
                filename: "[hash:8].commons.js",
                chunks: ['page1', 'page2']
            }),  //提取公共模块
            new HtmlWebpackPlugin({
                title:'平台',  //html的title
                inject:'body', //在body标签插入
                filename:'main.html',
                template:'htmlTemplate/template.html',  //模板
                chunks:['page1','commons'],  //页面需要的模块
                minify: { //压缩HTML文件
                    removeComments: true, //移除HTML中的注释
                    collapseWhitespace: false //删除空白符与换行符
                }
            }),
            new HtmlWebpackPlugin({
                title:'平台',
                inject:'body', //在body标签插入
                filename:'index.html',
                template:'htmlTemplate/template.html',
                chunks:['page2','commons'],
                minify: { //压缩HTML文件
                    removeComments: true, //移除HTML中的注释
                    collapseWhitespace: false //删除空白符与换行符
                }
            }),
        ]
    };
    

提取公共模块:

    new webpack.optimize.CommonsChunkPlugin("[hash:8].commons.js", ["page1", "page2"]),  //提取公共模块  
    //这样虽然可以提取，但是html-webpack-plugin不能用，要用下面的写法，把name属性注明
            new webpack.optimize.CommonsChunkPlugin({
                name: "commons",
                filename: "[hash:8].commons.js",
                chunks: ['page1', 'page2']
            }),  
    
