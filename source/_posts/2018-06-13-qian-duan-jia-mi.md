---
title: 前端加密
slug: qian-duan-jia-mi
date: 2018-06-13T15:18:21.000Z
date_updated: 2018-06-14T03:16:50.000Z
---

有时，在数据传输的过程要加密，一般在前端生成16位的随机字符串加上iv(初始偏移向量)，使用aes对数据加密，然后把key用后端提供的公钥进行rsa加密。

### aes加密

### rsa加密

[Node-RSA](https://github.com/rzcoder/node-rsa)一个rsa加密的库，也可以浏览器中使用。

RSA是一种块加密的算法，所以对于明文需要将他们分成固定的块长度，考虑到输入的数据长度的问题，所以加解密的填充有好几种：

- 
无填充，就是直接对明文进行加密

- 
PKCS1。将数据长度分成密钥长度-11byte，比如密钥是1024bit，那么长度就是1024/8-11=117bytes，具体的格式：先填0，2，然后随机生成其他的byte，后面才是真正的数据

- 
PKCS1_OAEP将数据长度分成密钥长度-41byte，比如密钥是1024bit，那么长度就是1024/8-41=77bytes，先填0，随机或者是固定的测试向量加20个bytes，然后加20个数字签名的数据，最后才是数据

- 
SSLV23，将数据长度分成密钥长度-11byte，比如密钥是1024bit，那么长度就是1024/8-11=117bytes，具体的格式：先填0，2，填入8个3，填入一个'\0'，最后才是真正的数据。

在node-rsa模块中加解密默认使用 pkcs1_oaep ,如果有些js库使用pkcs1加密,请设置`key.setOptions({encryptionScheme: 'pkcs1'}) `

    const NodeRSA = require('node-rsa');
    
    const key = new NodeRSA();
    // key.setOptions({encryptionScheme: 'pkcs1'}) 
    key.importKey(`-----BEGIN PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDDBDlbS4dYbs27KFuO3ajDLZ12
    RbFk5UpcEYuoTHmxs0n8/V3DL8FjdQJ3k0RSOGRPgFSQltSYEL+Er4GRmJ7nt0+b
    lkSdFTmTZ2disYD9Odf2L0jnI4L2DGbPN1OPUxMsbZUCZ1EmneC5WoTlPpH88s0r
    h+dbC34qxGVNl3DpMwIDAQAB
    -----END PUBLIC KEY-----`, 'pkcs8-public');
    let encrypted = key.encrypt('Hello RSA!', 'base64');
    console.log(encrypted);
    
    const priKey = new NodeRSA();
    // priKey.setOptions({encryptionScheme: 'pkcs1'}) 
    priKey.importKey(`-----BEGIN RSA PRIVATE KEY-----
    MIICXQIBAAKBgQDDBDlbS4dYbs27KFuO3ajDLZ12RbFk5UpcEYuoTHmxs0n8/V3D
    L8FjdQJ3k0RSOGRPgFSQltSYEL+Er4GRmJ7nt0+blkSdFTmTZ2disYD9Odf2L0jn
    I4L2DGbPN1OPUxMsbZUCZ1EmneC5WoTlPpH88s0rh+dbC34qxGVNl3DpMwIDAQAB
    AoGBAIdkm12i5mijJPpXXpmlktFPDg9a+3oNJr8c/1TtI2AYFborPbmRojYmunvC
    JqDeveXkNtHbpeWdWxoHr3EiAM+vralpcN8l2Lg8TKltBCiMsHUiLrTcAfBTEp1X
    fCwUNNjNiB1AK3H7v0JHfGeQZqre8SWK1C8qjAjEi9x2DDLBAkEA86k3bj8fb566
    yyH9ub4Jq/sOd/r8urXHXMbLTUUw+ysI5VdCQ3pdOnLQT2hee/kqGgKZqI+S+/Zp
    khhj1F5RGwJBAMzkY0Lbj0xk0jxTOb9xoVY5Qec4LkVLae/zpLRIMAZi/ZjYWP7n
    UOvIe8lKTtRXW/a5NyFjBePxD84Os8h4YckCQQDAJjfCRyEhQwmHW3zdV1IFP+y/
    DTz0eJmJPnPgsanYyK0xPsjQsdSHXTeNB39LQMjEzjwiw2ZkMIQ8Y+OF/AL1AkAP
    ibplVZU2a+btoDoe5JUhntH6oO4RXzi3c7in21mZAmTM9Is7OXuPhfKtPy9fNwjI
    Wx9tLr9BnARg0gicSVTRAkAx/lM1JEu0ETIvt6GJiXGXCi95Pj88uD6DCrEzl0oi
    OUVnq5h/vXpTmEjGmNzluC8bwNWxIQp61isBtdMvYChO
    -----END RSA PRIVATE KEY-----`, 'pkcs1')
    var decrypted = priKey.decrypt(encrypted, 'utf8');
    console.log(decrypted);
    
