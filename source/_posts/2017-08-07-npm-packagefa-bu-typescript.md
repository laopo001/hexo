---
title: npm package发布(TypeScript)
slug: npm-packagefa-bu-typescript
date_published: 2017-08-07T09:45:09.000Z
date_updated: 2017-08-07T09:45:09.000Z
---

## typings

用typescript编写的项目，有一个优点。在使用的有时候有语法提示。在package.json加上`"types": "./lib/index.d.ts"`入口的*.d.ts文件。别人在使用你的库的，就会有语法提示了。
选项类型默认值描述--declarationbooleanfalse生成相应的.d.ts文件。--declarationDirstring生成声明文件的输出路径。默认为outDir路径。--outDirstring重定向输出目录。--outFilestring将输出文件合并为一个文件。合并的顺序是根据传入编译器的文件顺序和///<reference``>和import的文件顺序决定的。
## .npmignore

如果这是npm publish忽略文件。如果没有就使用.gitignore。一般.npmignore和.gitignore还是不同，我们最好使自己的包在别人安装的时候，所有的都是必须的。

## package.json

- `"main": "./lib/index.d.ts"` main字段是表示这个包的入口js文件。使用tsc编译就行。千万不要使用webpack编译，webpack会把这个项目需要的包的代码直接生成在js中。如果这个包别的库也会用到。这样就打包了两次。
- devDependencies和dependencies区别，devDependencies是开发依赖，例如webpack，typescript，jest等。dependencies这时运行时的依赖库，如jquery。npm在安装你的包的时候，只会安装dependencies下的。

## npm adduser

在npm.org上注册一个账号就行，然后运行上面的命令。按提示输入就行。

## license

一般的开源软件的许可证有 [ISC](http://link.zhihu.com/?target=https%3A//opensource.org/licenses/ISC), [BSD](http://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/BSD_licenses), [MIT](http://link.zhihu.com/?target=https%3A//opensource.org/licenses/MIT)，其实都是属于 Copyleft 的许可证，对软件的使用限制很少，发布时选择时候的许可证即可。npm 默认的是 ISC。

## npm publish .

运行`npm publish .`命令。

1. 如果提示`no_perms Private mode enable, only admin can publish this module`，检查源是不是npm的。
2. 如提示`you do not have permission to publish xxxx`，一般是包名冲突了，换个名字publish 。
3. npm包package.json中registory属性一定要填写，每次publish npm时package.json中version版本一定要大于上一次。
4. npm unpublish半小时内你可以删除自己发布的库，之后你就再也不能删除了。

## .travis.yml

使用[travis](https://travis-ci.org/)持续集成你的项目，用户一般会对经过测试的项目是更加信赖。

    language: node_js
    node_js:
      - "7"
    

      "scripts": {
        "build": "tsc",
        "test": "tsc&&jest"
      },
    

## 其他sourceMap

1. 
使用tsc编译，配置tsconfig中sourceMap为true就会生成sourceMap文件。

2. 
要使webpack生成的sourceMap，还要在webpack.config文件中，添加devtool : "source-map"。
