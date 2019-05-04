---
layout: post
title:  "recyclervie multy view holder adapter"
tanggal : "2019-05-04"
author: "malikkurosaki"
categories: ["global","tutorial android studio"]
image: "https://i.postimg.cc/dVwTPZd9/image.png"
permalink: /:title
toc: true
---


setelah 2hari duan malam  ngubek ngubeg google dan  beberapa kali gagal percobaan akhirnya , jealas saja karena tutorial digoogle sangatlah minim sekali yang menyangkul multy view untuk recycler view , dan rata rata memiliki metode yang berbeda beda <!-- more -->

beberapa kali mencoba dengan mengikuti tutoriala yang ada namun hasilnya sama aja zonkkk ..  akhirnya saya mengumpulkan data dari cbeberapa kali gagal percobaan dan menyimpulkan sesuatu , alhamdulillah berhasil .. ada sifat dari recycler view yang berbeda lengan list view dan itu jarang sekali dibahas dalam forum- form .. 

ok langsung ja ke prakteknyta.

langsung buka androkid studio , atau langsung coba pada projek yang sudah ada aja gk kenaapa.. 

__buat class adapter__

```java
package dev.malikkurosaki.probussystem;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.List;
import java.util.Map;

public class ChatbotRecyclerAdapter extends RecyclerView.Adapter<ChatbotRecyclerAdapter.VHolder> {

    private List<Integer> listCostumers;
    private LayoutInflater inflater;
    private View view;

    public static final int TYPE1 = 0;
    public static final int TYPE2 = 2;
    public static final int TYPE3 = 4;

    ChatbotRecyclerAdapter(Context context, List<Integer> theData){
        this.listCostumers = theData;
        this.inflater = LayoutInflater.from(context);
    }

    @NonNull
    @Override
    public VHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int viewType) {
        switch (viewType){
            case TYPE1:
                view = inflater.inflate(R.layout.layout_chatbot_vholder1,viewGroup,false);
                break;
            case TYPE2:
                view = inflater.inflate(R.layout.layout_chatbot_vholder2,viewGroup,false);
                break;
            case TYPE3:
                view = inflater.inflate(R.layout.layout_chatbot_vholder3,viewGroup,false);
                break;
        }
        return new VHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull VHolder vHolder, int i) {
        
    }

    @Override
    public int getItemCount() {
        return listCostumers.size();
    }

    static class VHolder extends RecyclerView.ViewHolder {
        VHolder(@NonNull View itemView) {
            super(itemView);
        }
    }

    @Override
    public int getItemViewType(int position) {
       if (listCostumers != null){
           return listCostumers.get(position);
       }
       return listCostumers.get(position);
    }

    class VHolder1 extends  RecyclerView.ViewHolder{

        public VHolder1(@NonNull View itemView) {
            super(itemView);
        }
    }
    class VHolder2 extends  RecyclerView.ViewHolder{

        public VHolder2(@NonNull View itemView) {
            super(itemView);
        }
    }
    class VHolder3 extends  RecyclerView.ViewHolder{

        public VHolder3(@NonNull View itemView) {
            super(itemView);
        }
    }
}


```



secaraa garis besarnya adalah sama dengan tutorial tutorial yang lainnya , namun yang membedakannya adalah , recycler view angkanya dmelompat  `0,2,4` sedangkan list view adalah berurutan `1,2,3`

kuncinya ada di tiga tempat , mungkin bisa lebih tapi .

__kunci 1__

```java
public int getItemViewType(int position) {
       if (listCostumers != null){
           return listCostumers.get(position);
       }
       return listCostumers.get(position);
    }

```

disini kuncinya adalah penggunaan if > juka dilangsungkan pada `position` atau `listCostumer.get(posititon)` dijami error juga .

gak tahu penyebabnya intinya digituin berhasil hahahah


__kunci 2__

``` java
// deklarasi
 public static final int TYPE1 = 0;
 public static final int TYPE2 = 2;
 public static final int TYPE3 = 4;


//------------- angkanya melompat

 @NonNull
    @Override
    public VHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int viewType) {
        switch (viewType){
            case TYPE1:
                view = inflater.inflate(R.layout.layout_chatbot_vholder1,viewGroup,false);
                break;
            case TYPE2:
                view = inflater.inflate(R.layout.layout_chatbot_vholder2,viewGroup,false);
                break;
            case TYPE3:
                view = inflater.inflate(R.layout.layout_chatbot_vholder3,viewGroup,false);
                break;
        }
        return new VHolder(view);
    }

```

__kunci 3__

```java
class VHolder1 extends  RecyclerView.ViewHolder{

        public VHolder1(@NonNull View itemView) {
            super(itemView);
        }
    }
    class VHolder2 extends  RecyclerView.ViewHolder{

        public VHolder2(@NonNull View itemView) {
            super(itemView);
        }
    }
    class VHolder3 extends  RecyclerView.ViewHolder{

        public VHolder3(@NonNull View itemView) {
            super(itemView);
        }
    }

```


