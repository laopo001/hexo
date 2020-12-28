---
title: html5拖动文件上传
slug: fromde-wen-jian-shang-chuan
date_published: 2016-05-26T07:59:00.000Z
date_updated: 2017-01-17T06:17:18.000Z
---

        $(document).on({  //阻止默认行为
            dragleave:function(e){    //拖离
                e.preventDefault();
            },
            drop:function(e){  //拖后放
                e.preventDefault();
            },
            dragenter:function(e){    //拖进
                e.preventDefault();
            },
            dragover:function(e){    //拖来拖去
                e.preventDefault();
            }
        });
        var box = document.getElementById('drop_area'); //拖拽区域
        box.addEventListener("drop",function(e){
            e.preventDefault(); //取消默认浏览器拖拽效果
            var fileList = e.dataTransfer.files; //获取文件对象
            console.log(fileList)
            //检测是否是拖拽文件到页面的操作
            if(fileList.length == 0){
                return false;
            }
            //检测文件是不是APK
           if(fileList[0].name.substring(fileList[0].name.lastIndexOf('.')+1).toLowerCase()!=='apk'){
                alert("您拖的不是APK！");
                return false;
            }
            var Form=new FormData();
            Form.append('file',fileList[0]);
            $.ajax({
                url: config.api.UPLOAD_APK.url,
                type: "POST",
                data: Form,
                processData: false,  // 告诉jQuery不要去处理发送的数据
                contentType: false   // 告诉jQuery不要去设置Content-Type请求头
            }).done(function (data) {
                if(data.status===0){
                    Message.show(<span><i className="glyphicon glyphicon-ok"></i>文件上传成功</span>, "success")
                    setTimeout(function () {
                        $(".rct-message.rct-message-success").children('button').eq(0).click();
                    },1000)
                }
            });
        },false);
