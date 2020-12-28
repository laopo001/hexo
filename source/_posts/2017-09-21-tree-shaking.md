---
title: Tree Shaking
slug: tree-shaking
date_published: 2017-09-21T03:26:12.000Z
date_updated: 2017-09-21T03:26:12.000Z
---

## Tree Shaking

### 使用

修改 `tsconfig.json`文件，compilerOptions.module,从commonjs，改成es2015。我们的代码编译成js的时候就使用es2015模块规范。然后使用webpack2以上，自带UglifyJsPlugin插件压缩就会，自动Tree Shaking。这是我们的代码在编译到es5的时候会保持es2015模块规范。

    {
      "compilerOptions": {
        "target": "es5",
        "module": "es2015",
       }
    }
    

### 其他

但是这只是`Tree Shaking`自己的代码，一般减少不了很多体积，一个工程主要是npm包占了大量体积。而npm包，一般为了兼容，都会转成es5在发布。es5自然不是es2015模块规范了。虽然typescript可以输出es5代码，模块规范保持es2015的怪异代码。但是现阶段大量的npm库都不是es2015规范。
