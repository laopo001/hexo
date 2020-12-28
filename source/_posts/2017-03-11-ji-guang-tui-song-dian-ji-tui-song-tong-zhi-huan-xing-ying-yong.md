---
title: 极光推送-点击推送通知唤醒应用android
slug: ji-guang-tui-song-dian-ji-tui-song-tong-zhi-huan-xing-ying-yong
date: 2017-03-11T09:22:12.000Z
date_updated: 2017-03-11T10:03:43.000Z
---

jpush:1.5.2

react-native:0.4.2

是因为应用挂在后台后，mModule变成了null。

    
    if (mModule != null && mModule.mContext != null) {
        Intent intent = new Intent();
        intent.setClass(context, mModule.mContext.getClass());
        intent.putExtras(bundle);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        context.startActivity(intent);                    
    } else {
        Intent launchIntent = context.getPackageManager().getLaunchIntentForPackage(mRAC.getPackageName());//mRAC.getPackageName()==你的应用包名
       launchIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED);                    
       launchIntent.putExtras(bundle);
       context.startActivity(launchIntent);                    
    }
    

上面的代码在收到通知，点击通知后， 就会创建1个activity，可能导致要多退出一次才能退出成功。

修改AndroidManifest.xml,添加android:launchMode="singleTask"。

       <activity
            android:name=".MainActivity"
            android:label="@string/app_name"
            android:launchMode="singleTask"  
    
