---
title: e.target、e.srcElement、currentTarget、this的使用问题
slug: e-target-e-srcelement-currenttarget-thisde-shi-yong-wen-ti
date_published: 2016-03-10T10:25:21.000Z
date_updated: 2017-01-17T06:53:33.000Z
---

> #### e.target、e.srcElement：指触发事件的源

- srcElement是IE下的属性
- target是Firefox下的属性
- Chrome浏览器同时有这两个属性

> #### currentTarget、this： 注册的dom

123456789
    <script>
      var cs=  document.getElementById('cs')
        cs.addEventListener('click',function(e){
            console.log('e.target',e.target)
            console.log('e.srcElement',e.srcElement)
            console.log('e.currentTarget',e.currentTarget)
            console.log('this',this)
        },false)
    </script>
    

  var cs=  document.getElementById('cs')
    cs.addEventListener('click',function(e){
        console.log('e.target',e.target)
        console.log('e.srcElement',e.srcElement)
        console.log('e.currentTarget',e.currentTarget)
        console.log('this',this)
    },false)

按F12看控制台，点击表格。输出如下：
![](/content/images/2016/03/-5JR6-GOG2-0U--QLP-EJ93.png)
