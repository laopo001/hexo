---
title: Bootstrap的滚动条
slug: bootstrapde-gun-dong-tiao
date_published: 2016-04-18T13:42:14.000Z
date_updated: 2017-01-17T06:34:43.000Z
---

setTimeout(function(){
document.getElementsByTagName('style')[0].innerHTML+='@-webkit-keyframes progress-bar-stripes {from {background-position: 40px 0;}to {background-position: 0 0;}}@-o-keyframes progress-bar-stripes {from {background-position: 40px 0;}to {background-position: 0 0;}}@keyframes progress-bar-stripes {from {background-position: 40px 0;}to {background-position: 0 0;}}.run{animation-delay: 0s;    /*???????????????????????*/animation-direction: normal;   /*????????????????????????*/animation-duration: 2s;     /*???????????????????*/animation-fill-mode: none;animation-iteration-count: infinite;  /*???????????????*/animation-name: progress-bar-stripes;/*????? @keyframes ??????????????????*/animation-play-state: running;animation-timing-function: linear; /*??????????????????,????????? "ease"???*/}.progress{background-color: rgb(92, 184, 92);background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.14902) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.14902) 50%, rgba(255, 255, 255, 0.14902) 75%, transparent 75%);/*  background-image: linear-gradient(45deg,rgba(255, 0, 255, 0.14902) 0%, rgba(255, 0, 255, 0.14902) 25%, transparent 25%, transparent 50%, rgba(255, 0, 255, 0.14902) 50%, rgba(255, 0, 255, 0.14902) 75%, transparent 75%, transparent 100%); */background-size: 40px 40px;color: rgb(255, 255, 255);transition-delay: 0s;transition-duration: 0.6s;transition-property: width;transition-timing-function: ease;border-radius:20px}'
},500)

            <style>       
            body{padding: 0;margin: 0;}
                    @-webkit-keyframes progress-bar-stripes {
                from {
                    background-position: 40px 0;
                }
                to {
                    background-position: 0 0;
                }
            }
            @-o-keyframes progress-bar-stripes {
                from {
                    background-position: 40px 0;
                }
                to {
                    background-position: 0 0;
                }
            }
            @keyframes progress-bar-stripes {
                from {
                    background-position: 40px 0;
                }
                to {
                    background-position: 0 0;
                }
            }
            .run{
                animation-delay: 0s;    /*动画延迟加载时间*/
                animation-direction: normal;   /*重复方向，可逆向*/
                animation-duration: 2s;     /*重复间隔时间。*/
                animation-fill-mode: none;
                animation-iteration-count: infinite;  /*重复次数。*/
                animation-name: progress-bar-stripes;/*规定 @keyframes 动画的名称。*/
                animation-play-state: running;
                animation-timing-function: linear; /*动画速度曲线,默认是 "ease"。*/
            }
             .progress{
                background-color: rgb(92, 184, 92);
                background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.14902) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.14902) 50%, rgba(255, 255, 255, 0.14902) 75%, transparent 75%);
       /*  background-image: linear-gradient(45deg,rgba(255, 0, 255, 0.14902) 0%, rgba(255, 0, 255, 0.14902) 25%, transparent 25%, transparent 50%, rgba(255, 0, 255, 0.14902) 50%, rgba(255, 0, 255, 0.14902) 75%, transparent 75%, transparent 100%); */
                background-size: 40px 40px;
                color: rgb(255, 255, 255);
    
                transition-delay: 0s;  /*CSS3 过渡*/
                transition-duration: 0.6s;
                transition-property: width;
                transition-timing-function: ease;
    
                border-radius:20px
    
            }
            </style>
    <div style="height: 40px;width: 800px;" class="progress run"></div>  
    

原理很简单：

- background-color: rgb(92, 184, 92)绿色;在下面，用background-image形成透明条纹。
- background-image: linear-gradient(45deg,rgba(255, 0, 255, 0.14902) 0%, rgba(255, 0, 255, 0.14902) 25%, transparent 25%, transparent 50%, rgba(255, 0, 255, 0.14902) 50%, rgba(255, 0, 255, 0.14902) 75%, transparent 75%, transparent 100%); 这个意思是，倾斜45度，0%-25%，rgba(255, 0, 255, 0.14902)这个颜色，25%-50%，transparent 透明，50%-75%又是这个颜色，75%-100%透明。0%和100%是可以省略的。
