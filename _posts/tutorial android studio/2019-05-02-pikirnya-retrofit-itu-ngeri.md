---
layout: post
title:  "tadinya dikira retrofit ngeri"
tanggal : "2019-05-01"
author: "malikkurosaki"
categories: ["global","tutorial android studio"]
image: "https://i.postimg.cc/mghbZwMD/retrofit-android.png"
permalink: /:title
toc: true
---


pernah sempet mikir ngeri untuk belajar retrofit , keliatannya ngeri pake anotation yang lumayan asing gt ahaha @@@@@ , tp coba aja mungkin  endggak setelaah baca-baca beberapa artikel banyak ayang bilang katanya mudah <!-- more -->


oke langsung kenalna aja sama ayang namanaya retrofit , jadi retrofit itu sebenarnya apaan .. ??

retrofit adalah library untuk mempermudah permintaan http : yang sejenis adalah volley , ok http , fastandroid nerwoking .. dll .. tapi menurut beberapa artikel yang paling mudah untuk saat ini aadalah retrofit,

ok lagi langsung , ke tkp

pertama bisa ngunjungi halaman 

__lybraryny__

`implementation 'com.squareup.retrofit2:retrofit:2.5.0'`

__tambah ini sebagi converternya__

`implementation 'com.squareup.retrofit2:converter-gson:latest.version'`

coverter bisa apa aja jenisnya ayang penting cocok aja

ok pertama bikin class object  istilahnya itu POJO .. apa itu kepanjangan  pojo cari aja di google , buakakakaka


__POJO__

```java
package dev.malikkurosaki.probussystem;

import android.provider.ContactsContract;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.List;

class PojoGetCustomer {

    @SerializedName("nm_cus")
    String nama;

    String getNama() {
        return nama;
    }
}


```

lalu buat interfacenya ..

__interface__

```java

package dev.malikkurosaki.probussystem;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Part;
import retrofit2.http.Query;

public interface JsonPlaceHolderApi {

    @GET("/api/getCustomer")
    Call<List<PojoGetCustomer>> getCustomer(@Query("search") String nama);
```


seetelaha selesai saataanya pemasangan pada aktivdity nya ..

contoh dimain activdity atau fragment

... 

``` java
 Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("http://demoppe.probussystem.com")
                .addConverterFactory(GsonConverterFactory.create())
                .build();

        JsonPlaceHolderApi jsonPlaceHolderApi = retrofit.create(JsonPlaceHolderApi.class);
        Call<List<PojoGetCustomer>> call = jsonPlaceHolderApi.getCustomer("ibu");

        call.enqueue(new Callback<List<PojoGetCustomer>>() {
            @SuppressLint("SetTextI18n")
            @Override
            public void onResponse(Call<List<PojoGetCustomer>> call, Response<List<PojoGetCustomer>> response) {
                if (!response.isSuccessful()){
                    hasilnya.setText(response.code()+" response code");
                }
                List<PojoGetCustomer> dat = response.body();

                for (PojoGetCustomer customer : dat){
                    hasilnya.append(customer.getNama()+"\n");
                }
            }

            @SuppressLint("SetTextI18n")
            @Override
            public void onFailure(Call<List<PojoGetCustomer>> call, Throwable t) {
                hasilnya.setText(t.getMessage()+" trowable");
            }
        });

```


uda gitu doang njirrrr  ...  emang bener katanaya orang orang super gamapang banget njirrrr  ...

mung kin bisa dibillang lebih mudah dari firebase ,, tp gk lah firebase tetep lebih mudah , dan kecepatannya uanjir .. firebase saat  ini masih yang paling cepet njiirrrr ... ok lanjut ngopi ... datdatdtadt