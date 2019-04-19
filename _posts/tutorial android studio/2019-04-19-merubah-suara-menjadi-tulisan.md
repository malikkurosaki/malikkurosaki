---
layout: post
title:  "merubah suara menjadi tulisan"
tanggal : "2019-04-19"
author: "malikkurosaki"
categories: ["global","tutorial android studio"]
image: "https://i.postimg.cc/MGStz2CK/image.jpg"
permalink: /:title
toc: true
---


kali ini saya akan membagikan sebuah kode dimana caranya merubah suara menjadi tulisan yang dapat dibaca, jika biasanaya tulisan menjadi suara seperti google translate atau google map,
yang ini adalah kebalikannya
<!-- more -->


### dependency

`implementation 'com.github.vikramezhil:DroidSpeech:v2.0.3'`

### repository

`maven { url 'https://jitpack.io' }`

### permisi

``` xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />

```


### pemasangan

``` java
DroidSpeech droidSpeech = new DroidSpeech(this, null);
droidSpeech.setOnDroidSpeechListener(this);

```


yup - sudah jadi gitu aja , kl bingung langsung tanya aja ke wa gratis

situs resminya :

https://github.com/vikramezhil/DroidSpeech
