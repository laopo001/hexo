---
title: CSRF攻击与防御
slug: csrfgong-ji-yu-fang-yu
date_published: 2017-01-14T04:43:00.000Z
date_updated: 2017-02-18T05:48:22.000Z
---

> 一.CSRF是什么

CSRF（Cross-site request forgery），中文名称：跨站请求伪造，是一种广泛存在于网站中的安全漏洞，缩写为：CSRF/XSRF。

> 二.CSRF的原理

CSRF攻击能劫持终端用户在已登录的Web站点上执行本意操作。简单的说，攻击者透过盗用用户身份悄悄发送一个请求，或执行某些恶意操作，CSRF的过程非常隐秘，受害人甚至无法察觉。

产生CSRF漏洞的原因主要有两点：一方面是开发者不够谨慎，编写的Web应用程序存在漏洞导致恶意利用：另一方面，是因为Web浏览器对于Cookie和HTTP身份验证的回话信息的处理存在一定的缺陷。

![](/source/images/2017/02/-1.png)

> 三.CSRF的恶意利用

###### 3.1执行恶意操作

举个例子，假设某个站点具有转账功能，实现该功能的HTML表单如下：

    <form action="transfer.php" method="POST">
    账号：<input type="text" name="toBankId"/></br>
    金额：<input type="text" name="money"/></br>
    <input type="submit" value="提交"/>
    </form>
    

这时候，只要输入对应的账号和金额提交，就能实现转账。假设，受害者点击含有恶意代码的链接，并浏览带有下面HTML代码的网页：

    <img src="http://www.xxx.com.transfer.php?toBankId=99&money=1000"
    

在这个CSRF的过程中，受害者是毫不知情的，莫名其妙发生了转账行为。CSRF的攻击最大的特点就是完全以用户的身份发起的，很难防御。

以上CSRF能成功地原因，还有一个是因为开发人员滥用$_REQUEST方法，导致本来的POST操作可以用GET方式实现。那么，开发人员改用$_POST()方法来获取数据，那么要想成功执行CSRF，需要加上Javascript代码。如下HTML：

    <form id="test" action="http://www.xxx.com.transfer.php" method="POST">
    账号：<input type="text" name="toBankId"/></br>
    金额：<input type="text" name="money"/></br>
    <input type="submit" value="提交"/>
    <script>document.getElementById("test").submit()</script>**
    

###### 3.2获取信息

同源策略，是浏览器安全的基石。但有，有时开发中要求B站中获取A站的数据，不得不使用JSONP的方式进行跨域请求，但是，攻击者可是可以直接获取信息的。JSONP如下：

    function addScriptTag(src) {
      var script = document.createElement('script');
      script.setAttribute("type","text/javascript");
      script.src = src;
      document.body.appendChild(script);
    }
    window.onload = function () {
      addScriptTag('http://example.com/ip?callback=foo');
    }
    function foo(data) {
      console.log('Your public IP address is: ' + data.ip);
    };
    

JSONP最大特点就是简单适用，老式浏览器全部支持，服务器改造非常小。但是，这种跨同源策略的的行为，也大大带来了风险，不可滥用。因为这些数据别人也是可以获取的。最后不要用JSONP传递敏感的用户信息。

> 四.CSRF的防御

###### 4.1验证HTTP Referer

根据HTTP协议，在HTTP头中有一个字段叫Referer，它记录了该HTTP请求的来源地址。在通常情况下，访问一个安全受限页面的请求必须来自于同一个网站。比如某银行的转账是通过用户访问`http://bank.test/test?page=10&userID=101&money=10000`页面完成，用户必须先登录，然后通过点击页面上的按钮来触发转账事件。当用户提交请求时，该转账请求的Referer值就会是转账按钮所在页面的URL。而如果攻击者要对银行网站实施CSRF攻击，他只能在自己的网站构造请求，当用户通过攻击者的网站发送请求到银行时，该请求的Referer是指向攻击者的网站。因此，要防御CSRF攻击，银行网站只需要对于每一个转账请求验证其Referer值，如果是以bank. test开头的域名，则说明该请求是来自银行网站自己的请求，是合法的。如果Referer是其他网站的话，就有可能是CSRF攻击，则拒绝该请求。

###### 4.2使用Token

CSRF攻击之所以能够成功，是因为攻击者可以伪造用户的请求，该请求中所有的用户验证信息都存在于Cookie中。因此，抵御CSRF攻击的关键在于：在请求中放入攻击者所不能伪造的信息，并且该信息不存在于Cookie之中。开发者可以在HTTP请求中以参数的形式加入一个随机产生的token，对于token错误的请求，则认为是CSRF攻击，并拒绝该请求。

###### 4.3在HTTP头中自定义属性并验证

自定义HTTP头X-CSRF-Token。先把token放入meta：

然后在全局Ajax中使用这种方式设置X-CSRF-Token请求头并提交：
$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});
每次Ajax请求则会自动加上自定义的HTTP头X-CSRF-Token。
######4.4 安全的跨域请求
使用新的W3C标准CORS，全称是"跨域资源共享"（Cross-origin resource sharing）。
下面是一个例子，浏览器发现这次跨源AJAX请求是一般请求，就自动在头信息之中，添加一个Origin字段。如下

GET /cors HTTP/1.1

Origin: [http://api.bob.com](http://api.bob.com)

Host: api.alice.com

Accept-Language: en-US

Connection: keep-alive

User-Agent: Mozilla/5.0

上面的头信息中，Origin字段用来说明，本次请求来自哪个源（协议 + 域名 + 端口）。服务器根据这个值，决定是否同意这次请求。如果在B站请求A站浏览器会不允许跨域获取数据。如果在A站返回的数据加上一个Access-Control-Allow-Origin:*的HTTP的头。这所有网站都能访问。但是，这并不是我们想要的，只需把Access-Control-Allow-Origin修改成需要给权限的网站即可。
