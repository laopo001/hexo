---
title: 跨域（JSONP，CORS）
slug: kua-yu-jsonp-cors
date: 2016-07-01T05:35:58.000Z
date_updated: 2017-01-17T06:31:43.000Z
---

> JSONP

服务器端：

    router.get('/GET_XSS_project', function(req, res, next) {  
        db(function(err, connection) {
            connection.query( "select * from xssProject where id = ?",[req.query.xssProjectID], function(err, rows) {
                if(err){console.log(err)}
                connection.release();
                res.type('text/javascript');
                res.send(`${req.query.callback}(${JSON.stringify(rows)})`);
            });
        });
    });
    

前端：

            $.ajax({
               url:config.JSONP.GET_XSS_project.url,
                type:'get',
                dataType: "jsonp",
                jsonpCallback: "xssJsonpCallback",
            }).done((data)=>{
                this.setState({xssProjectList:data})
            })
    

> CORS

只需在服务器端设置HTTP头，postAccess-Control-Allow-Origin:即可。生成环境，把换成你需要跨域的网站。

    router.post('/CORS', function(req, res, next) {
         res.setHeader('Access-Control-Allow-Origin','*');
        res.send(`(${JSON.stringify({name:'CORS'})})`);
    });
    
