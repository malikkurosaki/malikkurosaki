---
layout: post
title:  "membuat bottom dialog"
tanggal : "2019-05-07"
author: "malikkurosaki"
categories: ["global","tutorial android studio"]
image: "https://i.postimg.cc/L82C9TKJ/fdf.jpg"
permalink: /:title
toc: true
---

cara simple membuat bottom menu seperti di google map , lebih tepatnya dialog bawah atau bottom dialog  <!-- more -->

langsung aja ya 

```java
BottomSheetDialog menuBawah = new BottomSheetDialog(context);
        LayoutInflater inflater = LayoutInflater.from(context);
        View vm = inflater.inflate(R.layout.layout_menu_bawah_admin_panel,null,false);

```

untuk memunculkan

```java
menuBawah.show();

```

untuk menyembunyikan 

```java
menuBawah.dismis();
```




