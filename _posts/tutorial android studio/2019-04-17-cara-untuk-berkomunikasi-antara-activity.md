---
layout: post
title:  "cara untuk berkomunikasi antara activity"
tanggal : "2019-04-17"
author: "malikkurosaki"
categories: ["trick","tutorial android studio","global"]
image: "https://i.postimg.cc/x1ccHPxH/activity-cover-1024x576.png"
permalink: /:title
toc: true
---

untuk yang baru menginjak belajar android studio terkadang akan sangat kerepotan untuk bisa saling bertukar informasi antara activity dengan activity yang lainnya , sekarang saya akan menunjukkan cara simple dan mudahnya <!-- more -->

### pertama

buka android studio lalku buatlalah dua activity contoh nama activity1 dan activity2
, lalu buka pada activity1 pastekan kode berikut.

``` java
Map<String,String> dt = new HashMap<>();
    dt.put("jenis","setting");
    Intent intent = new Intent(MainActivity.this,Main2Activity.class);
    intent.putExtra("jenis", (Serializable) dt);
    startActivity(intent);
```


### kedua 

buka activity kedua lalu pastekan kode berikut

```java
Intent intent = getIntent();
        Map<String,String> data  = (HashMap<String,String>)intent.getSerializableExtra("jenis");
        switch (Objects.requireNonNull(data.get("jenis"))){
            case "admin":
                gantiLayout(Admin.newInstance());
                break;
            case "setting":
                gantiLayout(Setting.newInstance());
                break;
                default:
                    gantiLayout(Admin.newInstance());
        }

```


udah cuma gitu aja simple banget kok .

kalo kurang paham tinggal tinggalkan komentar atau wa 081338929722