---
title: 搭建私有npm仓库
slug: da-jian-si-you-npmcang-ku
date_published: 2017-09-27T07:57:56.000Z
date_updated: 2017-10-24T02:36:27.000Z
---

这里使用 [Sinopia](https://github.com/rlidwka/sinopia) 搭建npm仓库。只需两句代码即可搭建成功。

sinopia有以下几个优势：

1. 不同步拉取npm库，占据大量硬盘，没有硬盘被撑爆的问题；
2. 安装配置极其简单,不需要数据库；
3. 支持配置上游registry配置，一次拉取即缓存；
4. 直接可以拉取docker镜像；

### 安装

    $ npm install -g sinopia
    $ sinopia
    

curl [http://localhost:4873/，没有timeout。这时已经搭好了。不过只能本地访问，可以直接修改config.yaml配置文件，最后一行listen:](http://localhost:4873/%EF%BC%8C%E6%B2%A1%E6%9C%89timeout%E3%80%82%E8%BF%99%E6%97%B6%E5%B7%B2%E7%BB%8F%E6%90%AD%E5%A5%BD%E4%BA%86%E3%80%82%E4%B8%8D%E8%BF%87%E5%8F%AA%E8%83%BD%E6%9C%AC%E5%9C%B0%E8%AE%BF%E9%97%AE%EF%BC%8C%E5%8F%AF%E4%BB%A5%E7%9B%B4%E6%8E%A5%E4%BF%AE%E6%94%B9config.yaml%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%EF%BC%8C%E6%9C%80%E5%90%8E%E4%B8%80%E8%A1%8Clisten:) 0.0.0.0:4873。不过推荐nginx反向代理到80。当然还可以通过docker搭建，也很简单。

使用pm2守护进程

    pm2 start `which sinopia`
    

#### config.yaml配置文件

在`~/.config/sinopia/`目录。

    # path to a directory with all packages
    storage: ./storage  //npm包存放的路径
    
    auth:
      htpasswd:
        file: ./htpasswd   //保存用户的账号密码等信息
        # Maximum amount of users allowed to register, defaults to "+inf".
        # You can set this to -1 to disable registration.
        max_users: -1  //默认为1000，改为-1，禁止注册
    
    # a list of other known repositories we can talk to
    uplinks:
      npmjs:
        url: http://registry.npm.taobao.org/  //默认为npm的官网，由于国情，修改 url 让sinopia使用 淘宝的npm镜像地址
        
    packages:  //配置权限管理
      '@*/*':
        # scoped packages
        access: $all
        publish: $authenticated
    
      '*':
        # allow all users (including non-authenticated users) to read and
        # publish all packages
        #
        # you can specify usernames/groupnames (depending on your auth plugin)
        # and three keywords: "$all", "$anonymous", "$authenticated"
        access: $all
    
        # allow all known users to publish packages
        # (anyone can register by default, remember?)
        publish: $authenticated
    
        # if package is not available locally, proxy requests to 'npmjs' registry
        proxy: npmjs
    
    # log settings
    logs:
      - {type: stdout, format: pretty, level: http}
      #- {type: file, path: sinopia.log, level: info}
    
    # you can specify listen address (or simply a port) 
    listen: 0.0.0.0:4873  ////默认没有，只能在本机访问，添加后可以通过外网访问。
    

### 客户端使用

#### 安装nrm

    $ npm install -g nrm # 安装nrm
    $ nrm add XXXXX http://XXXXXX:4873 # 添加本地的npm镜像地址
    $ nrm use XXXX # 使用本址的镜像地址
    

    ldh@ldh-PC:~/GitHubs/aa$ nrm ls
    
      npm ---- https://registry.npmjs.org/
      cnpm --- http://r.cnpmjs.org/
      taobao - https://registry.npm.taobao.org/
      nj ----- https://registry.nodejitsu.com/
      rednpm - http://registry.mirror.cqupt.edu.cn/
      npmMirror  https://skimdb.npmjs.com/registry/
      edunpm - http://registry.enpmjs.org/
    * lnpm --- http://npm.dadigua.win/
    
    

已经直接使用私有仓库就行了。如果找不到库，会自动到上游仓库去拉的。然后`npm adduser`、`npm login`、`npm publish` 等命令sinopia搭建的npm库都是支持的。

如下是Sinopia搭建npm库的首页。publish了一个库测试了下。
![](/source/images/2017/09/QQ--20170911152353-1.png)
