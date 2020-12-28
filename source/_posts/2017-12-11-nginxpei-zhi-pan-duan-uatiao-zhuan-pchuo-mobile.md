---
title: nginx配置判断UA跳转pc或mobile
slug: nginxpei-zhi-pan-duan-uatiao-zhuan-pchuo-mobile
date_published: 2017-12-11T06:37:44.000Z
date_updated: 2017-12-11T06:37:44.000Z
---

    # mobile的conf
    server {
            client_max_body_size 4G;
            listen  10080;  ## listen for ipv4; this line is default and implied
            server_name localhost;
            root /home/ldh/test/mobile;
            location / {
                    autoindex on; #显示索引
                    autoindex_exact_size on; #显示大小
                    autoindex_localtime on;   #显示时间
            }
    }
    

    # pc的conf
    server {
            client_max_body_size 4G;
            listen  10081;  # listen for ipv4; this line is default and implied
            server_name localhost;
            location / {
    		root /home/ldh/test/pc;
                    autoindex on; #显示索引
                    autoindex_exact_size on; #显示大小
                    autoindex_localtime on;   #显示时间
            		if ( $http_user_agent ~* "(Android|iPhone|Windows|Phone|UC|iPad|iPod|Kindle)" ){
            			# root /home/ldh/test/mobile;
            			rewrite ^(.*) http://localhost:10080$uri;
            		}
            }
     
    }
    
    
