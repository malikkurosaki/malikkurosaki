---
layout: post
title:  "cara membuat splashscreen "
tanggal : "2019-04-22"
author: "malikkurosaki"
categories: ["global","tutorial android studio"]
image: "https://i.postimg.cc/7LvkpwbV/splash-screen-examples.png"
permalink: /:title
toc: true
---


ohihihihi , splashscreen bisa dibilang penting dan gk penting , tapi mungkin fungsinya lebih ke pemanis , jadi yang belum tahu splash screen adalah sebuah halaman pertama yang muncul biasanya lebih kepada icon atau brand sebuah roduct <!-- more -->

### buka android studio
![{{ page.author }}{{ page.title }}](https://i.postimg.cc/nLfy32wS/image.png)

buka pada folder `value` / `styles.xml` 

pastekan code ini

``` xml
<style name="splashScreenTheme" parent="@android:style/Theme.DeviceDefault.Light.NoActionBar">
    <item name="android:windowBackground">@raw/splashsc2</item>
</style>

```

lalu buka file manifest

``` xml
    <application
        android:allowBackup="true"
        android:fullBackupContent="true"
        android:hardwareAccelerated="false"
        android:icon="@mipmap/ic_launcherr"
        android:label="@string/app_name"
        android:largeHeap="true"
        android:roundIcon="@mipmap/ic_launcher_roundd"
        android:supportsRtl="true"
        android:theme="@style/splashScreenTheme" <!-- pastekan disini -->
        android:windowSoftInputMode="adjustResize|adjustPan">
        <activity
            android:name=".Main2Activity"
            android:theme="@style/Theme.AppCompat.Light.NoActionBar">

        </activity>
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <action android:name="android.intent.action.VIEW" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
```

jangan lupa memasaukka file png , lebih lanjut kl bingung ke wa aja