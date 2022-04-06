---
title: 编译自己的chrome(一)
date: 2022-01-18 19:58:0
tags:
---

## 起步
去官方文档，根据提示下载，安装[https://chromium.googlesource.com/chromium/src/+/main/docs/android_build_instructions.md](https://chromium.googlesource.com/chromium/src/+/main/docs/android_build_instructions.md)

## 默认打包

在gn输出文件夹，out/Default/args.gn, args.gn文件必须添加这两行，否则按照官方文档会卡住，因为官方默认把warin作为error然后中断，还有禁止lint这样可以加快编译速度。
```
treat_warnings_as_errors = false
disable_android_lint = true
```

## 打包完成
经过4-5个小时会生成，/chromium/src/out/Default/apks/ChromePublic.apk, 直接安装即可

## 第一步修改
编译自己Chrome，主要是安装官方的chrome功能比起桌面版太少。希望可以加extensions功能，还有样式，安卓chrome的标签切换真的反人类。
先改个app名称，下面路径修改app名称`MyChromium`。
```
chrome/android/java/res_chromium_base/values/channel_constants.xml
```
![](/source/images/WeChat08a380f9390193101c01f1f0d580642c.png)

## 第二步修改
修改out/Default/args.gn，添加支持enable_extensions，这里会遇到很多gn文件报错，因为开启编译extensions库，但是extensions库里面很多插件不支持安卓系统。先把gn里面一些`# assert(!is_android)`类似代码删掉，这是gn生成nijia文件成功，编译仍然失败。下一步解决nijia编译错误。

```
target_os = "android"
target_cpu = "arm64"  # See "Figuring out target_cpu" below

is_component_build = false
symbol_level = 1
enable_nacl = false
is_clang = true

treat_warnings_as_errors = false
disable_android_lint = true

enable_extensions = true
```

## 第三步修改
![](/source/images/WeChat024a7a7b1d82aed6a4a87089472aaecb.png)