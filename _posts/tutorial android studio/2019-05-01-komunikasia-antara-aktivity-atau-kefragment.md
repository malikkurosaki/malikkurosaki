---
layout: post
title:  "komunikasi antara aktivty atau ke fragment"
tanggal : "2019-05-01"
author: "malikkurosaki"
categories: ["global","tutorial android studio"]
image: "https://i.postimg.cc/pLDpMktF/Frag04.jpg"
permalink: /:title
toc: true
---

daalam perjalanan membuata aplikasi kadang gk bisa terhindarkan dari namanya berkomunikasi antaraaktivity atau
antara activiti dengan fragment .. <!-- more -->


langsung aja atanpa basa dan basi dan alainnya  .. 

__komunikasai antara activity__

``` java
// pengirim pesan
// buat map object 
Map<String,Object> pindah = pindah = new HashMap<>();
pindah.put("menus","newsfeed");
Intent intent = new Intent(Main2Activity.this,Main3Activity.class);
intent.putExtra("menus", (Serializable) pindah);
startActivity(intent);



// lalu pada main2Activity .. kita buat penerimanya ..
Intent intent = getIntent();
Map<String,Object> terima = (HashMap<String,Object>)intent.getSerializableExtra("menus");

// uda haahh cuma gitu doang hahahahah

```

__komunikasi antara activity dan fragment__

```java
// pertama buata transmitternya ( pemancar atau pengirimnya)
Bundle bundle = new Bundle();
Fragment layoutMenu = new TanggapanDariMenu();
bundle.putString("dari", String.valueOf(terima.get("menus")));
layoutMenu.setArguments(bundle);

FragmentManager manager = getSupportFragmentManager();
FragmentTransaction transaction = manager.beginTransaction();
transaction.replace(R.id.menuLayoutContainer,layoutMenu);
transaction.commitAllowingStateLoss();

// uda gitu doang sebagai pemancarnya


// sekaarang penerimanaya .. 

if (getArguments() != null){
    final String menuNya = getArguments().getString("dari");
    if (menuNya!=null){
        db.child("halamanmenu").child(menuNya).child("data").addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                String dataNya = dataSnapshot.getValue(String.class);
                mdcontainer.loadMarkdown(dataNya);
                mdcontainer.setBackgroundResource(R.color.colorBg1);
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });
    }else {
        Toast.makeText(getContext(),"data yang anda minta belum tersedia",Toast.LENGTH_LONG).show();
    }


}


// uda gitu doang buakakakakakakak
```




