---
title: React-Native 安卓下极光推送
slug: react-native-an-zhuo-xia-ji-guang-tui-song
date: 2017-03-10T10:11:41.000Z
date_updated: 2017-03-10T10:11:41.000Z
---

> 1.安装踩坑

按照[官方教程](http://bbs.reactnative.cn/topic/3505/%E7%94%A8-jpush-react-native-%E6%8F%92%E4%BB%B6%E5%BF%AB%E9%80%9F%E9%9B%86%E6%88%90%E6%8E%A8%E9%80%81%E5%8A%9F%E8%83%BD-android-%E7%AF%87)来有一处坑。

在修改app/src.../MainActivity.java中，教程漏了点东西。提示这个错误。

    :app:compileDebugJavaWithJavac - is not incremental (e.g. outputs have changed, no pre
    C:\Users\ldh\WebstormProjects\RN\AwesomeProject\android\app\src\main\java\com\myapp\Ma
        protected void onCreate(Bundle savedInstanceState) {
                                ^
      符号:   类 Bundle
      位置: 类 MainActivity
    C:\Users\ldh\WebstormProjects\RN\AwesomeProject\android\app\src\main\java\com\myapp\Ma
            JPushInterface.init(this);
            ^
      符号:   变量 JPushInterface
      位置: 类 MainActivity
    C:\Users\ldh\WebstormProjects\RN\AwesomeProject\android\app\src\main\java\com\myapp\Ma
            JPushInterface.onPause(this);
            ^
      符号:   变量 JPushInterface
      位置: 类 MainActivity
    C:\Users\ldh\WebstormProjects\RN\AwesomeProject\android\app\src\main\java\com\myapp\Ma
            JPushInterface.onResume(this);
            ^
      符号:   变量 JPushInterface
      位置: 类 MainActivity
    4 个错误
    :app:compileDebugJavaWithJavac FAILED
    

明显是JPushInterface和Bundle未定义。只需加上这两句.即可

    import cn.jpush.android.api.JPushInterface;
    import android.os.Bundle;
    

> 使用jpush

            import JPushModule from 'jpush-react-native';
            JPushModule.addReceiveCustomMsgListener((message) => {
              //   console.warn("addReceiveCustomMsgListener" +JSON.stringify(message));
              //  自定义消息
            });
            JPushModule.addReceiveNotificationListener((message) => {
              //  console.warn("receive notification: " + JSON.stringify(message));
              //  通知消息
            })
             JPushModule.addReceiveOpenNotificationListener((map) => {
               // 点击通知后触发的事件
               //  console.warn("addReceiveOpenNotificationListener: " + JSON.stringify(map));
                    this.props.navigator.push({
                        name: 'page2'
                    })
              })
    其他
    function RunPush(data) {
      AsyncStorage.getItem('userInfo').then((result) => {
        if (result != JSON.stringify(data.data)) {
          AsyncStorage.setItem('userInfo', JSON.stringify(data.data))
          JPushModule.setAlias(data.data.userName, () => { }, () => { }) //设置别名
          if( data.data.isDeveloper===1){
            JPushModule.setTags(["developer"], () => {}, () => { }); //设置标签
          }else{
            JPushModule.setTags(["user"], () => {}, () => { });
          }
          
        } else {
    
        }
      })
    }
    
    
