---
layout: post
title:  "membuat tabel recycler view "
tanggal : "2019-09-12"
author: "malikkurosaki"
categories: ["global","tutorial android studio"]
image: "https://i.postimg.cc/dVwTPZd9/image.png"
permalink: /:title
toc: true
---

# membuat tabel recyclerview
```java
laporan_adapter.setInvoiceDiclick(new Adapter_Laporan.KetikaLaporanInvoiceDiclick() {
            @Override
            public void maka(View vie, int position) {
                /*Class_dialog_helper dialog_helper = new Class_dialog_helper(Activity_Probus.this);
                dialog_helper.munculkan();*/

                AlertDialog.Builder builder = new AlertDialog.Builder(Activity_Probus.this);
                View tampang = LayoutInflater.from(Activity_Probus.this).inflate(R.layout.dialog_invoice_helper,null);
                builder.setView(tampang);
                builder.show();

                TextView invoiceName = tampang.findViewById(R.id.invoiceNama);
                TextView invoiceRes = tampang.findViewById(R.id.invoiceRes);
                TextView invoiceCheckIn = tampang.findViewById(R.id.invoiceCheckIn);
                TextView invoiceCheckOut = tampang.findViewById(R.id.invoiceCheckOut);
                TextView invoiceAgent = tampang.findViewById(R.id.invoiceAgent);
                TextView invoiceRate = tampang.findViewById(R.id.invoiceRatePlane);
                TextView invoiceNight = tampang.findViewById(R.id.invoiceNight);
                RecyclerView invoiceDetails = tampang.findViewById(R.id.invoiceDetails);

                Map<String,Object> data = laporan_adapter.semuanya(position);
                String guestName = String.valueOf(data.get("nama_tamu"));
                String res = String.valueOf(data.get("no_reservasi"));
                String checkIn = String.valueOf(data.get("tgl_datang")).replace("00:00:00","");
                String checkOut = String.valueOf(data.get("tgl_berang")).replace("00:00:00","");
                String agentNamr = String.valueOf(data.get("agen"));
                String ratePlane = String.valueOf(data.get("room_rate"));


                Log.i("datanya", "maka: "+data);

                invoiceName.setText(guestName);
                invoiceRes.setText(res);
                invoiceCheckIn.setText(checkIn);
                invoiceCheckOut.setText(checkOut);
                invoiceAgent.setText(agentNamr);
                invoiceRate.setText(ratePlane);

                Retrofit invRetrofit = new Retrofit.Builder()
                        .addConverterFactory(GsonConverterFactory.create())
                        .baseUrl(URLNYA)
                        .client(okHttpClient)
                        .build();
                Pemanggil_Api apiInvoice = invRetrofit.create(Pemanggil_Api.class);
                Call<List<JsonObject>> panggilInvoice = apiInvoice.panggilaInvoice(res);
                panggilInvoice.enqueue(new Callback<List<JsonObject>>() {
                    @Override
                    public void onResponse(Call<List<JsonObject>> call, Response<List<JsonObject>> response) {
                        if (response.isSuccessful()){
                            if (response.body()!= null){
                                invoiceNight.setText(String.valueOf(response.body().size())+"Night");
                                //Log.i(TAG, "onResponse: "+response.body().toString());
                                List<JsonObject> dataInvoice = response.body();
                                List<Map<String,Object>> lisAdapter = new ArrayList<>();
                                Map<String,Object> headernya = new HashMap<>();
                                headernya.put("day","Day");
                                headernya.put("tanggal","Tanggal");
                                headernya.put("extrabed","Extra Bed");
                                headernya.put("amount","Amount");
                                headernya.put("totalAmount","Total Amount");
                                headernya.put("type","0");

                                lisAdapter.add(headernya);

                                for (JsonObject inv : dataInvoice){
                                    Map<String,Object> wadah = new Gson().fromJson(inv.toString(),new TypeToken<HashMap<String,Object>>(){}.getType());
                                    Map<String,Object> terima = new HashMap<>();
                                    for (Map.Entry<String,Object> entry : wadah.entrySet()){
                                        terima.put(entry.getKey(),entry.getValue());
                                    }
                                    terima.put("type","1");
                                    lisAdapter.add(terima);
                                }

                                Adapter_invoice adapter_invoice = new Adapter_invoice(Activity_Probus.this,lisAdapter);
                                invoiceDetails.setLayoutManager(new LinearLayoutManager(Activity_Probus.this));
                                invoiceDetails.setAdapter(adapter_invoice);
                            }
                        }
                    }

                    @Override
                    public void onFailure(Call<List<JsonObject>> call, Throwable t) {

                    }
                });



                /*Log.i(TAG, "datanya: "+String.valueOf(laporan_adapter.semuanya(position)));
                Toast.makeText(getApplicationContext(),String.valueOf(),Toast.LENGTH_LONG).show();*/
            }
        });
        ```
        
        
# Adapter Recyclerview

```java
package probus.malikkurosaki.probussystem;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import java.util.List;
import java.util.Map;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import butterknife.BindView;
import butterknife.ButterKnife;

public class Adapter_invoice extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private int TYPE_HEADER = 0;
    private int TYPE_MAIN = 1;
    private int TYPE_FOOTER = 2;


    private List<Map<String, Object>> lisData;
    private LayoutInflater inflater;
    private Context context;

    Adapter_invoice(Context context1, List<Map<String, Object>> list) {
        this.context = context1;
        this.inflater = LayoutInflater.from(context1);
        this.lisData = list;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        Log.i("invoiceadapter", "onCreateViewHolder: " + String.valueOf(viewType));
        if (viewType == TYPE_HEADER) {
            return new ViewHolderHeder(inflater.inflate(R.layout.holder_invoice_header, parent, false));
        } else if (viewType == TYPE_FOOTER) {
            return new ViewHolderFooter(inflater.inflate(R.layout.holder_invoice_footer, parent, false));
        } else {
            return new ViewHolderMain(inflater.inflate(R.layout.holder_invoice_main, parent, false));
        }
    }

    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
        Map<String,Object> data = lisData.get(position);
        int typeNya =  Integer.parseInt(String.valueOf(data.get("type")));
        if (typeNya == TYPE_MAIN){
            int extraBed = String.valueOf(data.get("extrabed")).equals("")?0:Integer.valueOf( String.valueOf(data.get("extrabed")));
            ViewHolderMain main = (ViewHolderMain)holder;
            main.invoiceDay.setText(String.valueOf(data.get("day")));
            main.invoiceTanggal.setText(String.valueOf(data.get("date")));
            main.invoiceRoom.setText(String.valueOf(data.get("room")));
            main.invoiceExtraBed.setText(String.valueOf(extraBed));
            main.invoiceamount.setText(String.valueOf(data.get("room_price")));
            main.invoiceTotalAmount.setText(String.valueOf(Integer.valueOf(String.valueOf(data.get("room_price")))+extraBed));

        }
    }

    @Override
    public int getItemCount() {
        return lisData.size();
    }

    @Override
    public int getItemViewType(int position) {
        Map<String, Object> ambilType = lisData.get(position);
        String typenya = String.valueOf(ambilType.get("type"));
        return Integer.parseInt(typenya);
    }

    class ViewHolderHeder extends RecyclerView.ViewHolder {

        public ViewHolderHeder(@NonNull View itemView) {
            super(itemView);
        }
    }

    class ViewHolderFooter extends RecyclerView.ViewHolder {

        public ViewHolderFooter(@NonNull View itemView) {
            super(itemView);
        }
    }

    class ViewHolderMain extends RecyclerView.ViewHolder {

        @BindView(R.id.invoiceDay)
        TextView invoiceDay;
        @BindView(R.id.invoiceTanggal)
        TextView invoiceTanggal;
        @BindView(R.id.invoiceRoom)
        TextView invoiceRoom;
        @BindView(R.id.invoiceExtraBed)
        TextView invoiceExtraBed;
        @BindView(R.id.invoiceamount)
        TextView invoiceamount;
        @BindView(R.id.invoiceTotalAmount)
        TextView invoiceTotalAmount;

        public ViewHolderMain(@NonNull View itemView) {
            super(itemView);
            ButterKnife.bind(this,itemView);
        }
    }
}
```



```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    xmlns:app="http://schemas.android.com/apk/res-auto">
    <androidx.cardview.widget.CardView
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:cardUseCompatPadding="true">
        <ScrollView
            android:layout_width="fill_parent"
            android:layout_height="fill_parent"
            android:scrollbars="vertical"
            android:padding="8dp">
            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:orientation="vertical">
                <TextView
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:text="Performa Invoice"
                    android:textSize="24sp"
                    android:padding="16dp"
                    android:maxLines="1"
                    android:textColor="@color/colorHitam"
                    android:textAlignment="center"
                    android:fontFamily="@font/light"/>
                <LinearLayout
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:orientation="vertical"
                    android:padding="8dp">
                    <LinearLayout
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content">
                        <TextView
                            android:layout_width="0dp"
                            android:layout_weight="1"
                            android:layout_height="wrap_content"
                            android:text="Guest Name"
                            android:padding="4dp"
                            android:textStyle="bold"
                            android:textColor="@color/colorHitam"/>
                        <TextView
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:text=":"
                            android:padding="4dp"/>
                        <TextView
                            android:id="@+id/invoiceNama"
                            android:layout_width="0dp"
                            android:layout_weight="2"
                            android:layout_height="wrap_content"
                            android:text="Loading ..."/>
                    </LinearLayout>
                    <LinearLayout
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content">
                        <TextView
                            android:layout_width="0dp"
                            android:layout_weight="1"
                            android:layout_height="wrap_content"
                            android:text="Res"
                            android:padding="4dp"
                            android:textStyle="bold"
                            android:textColor="@color/colorHitam"/>
                        <TextView
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:text=":"
                            android:padding="4dp"/>
                        <TextView
                            android:id="@+id/invoiceRes"
                            android:layout_width="0dp"
                            android:layout_weight="2"
                            android:layout_height="wrap_content"
                            android:text="Loading ..."/>
                    </LinearLayout>
                    <LinearLayout
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content"
                        android:gravity="center_vertical">
                        <LinearLayout
                            android:layout_width="0dp"
                            android:layout_height="wrap_content"
                            android:layout_weight="3"
                            android:orientation="vertical">
                            <LinearLayout
                                android:layout_width="match_parent"
                                android:layout_height="wrap_content">
                                <TextView
                                    android:layout_width="0dp"
                                    android:layout_weight="1"
                                    android:layout_height="wrap_content"
                                    android:text="Check In"
                                    android:padding="4dp"
                                    android:textStyle="bold"
                                    android:textColor="@color/colorHitam"/>
                                <TextView
                                    android:layout_width="wrap_content"
                                    android:layout_height="wrap_content"
                                    android:text=":"
                                    android:padding="4dp"/>
                                <TextView
                                    android:id="@+id/invoiceCheckIn"
                                    android:layout_width="0dp"
                                    android:layout_weight="1"
                                    android:layout_height="wrap_content"
                                    android:text="Loading ..."/>
                            </LinearLayout>
                            <LinearLayout
                                android:layout_width="match_parent"
                                android:layout_height="wrap_content">
                                <TextView
                                    android:layout_width="0dp"
                                    android:layout_weight="1"
                                    android:layout_height="wrap_content"
                                    android:text="Check Out"
                                    android:padding="4dp"
                                    android:textStyle="bold"
                                    android:textColor="@color/colorHitam"/>
                                <TextView
                                    android:layout_width="wrap_content"
                                    android:layout_height="wrap_content"
                                    android:text=":"
                                    android:padding="4dp"/>
                                <TextView
                                    android:id="@+id/invoiceCheckOut"
                                    android:layout_width="0dp"
                                    android:layout_weight="1"
                                    android:layout_height="wrap_content"
                                    android:text="Loading ..."/>
                            </LinearLayout>
                        </LinearLayout>
                        <TextView
                            android:id="@+id/invoiceNight"
                            android:layout_width="0dp"
                            android:layout_weight="1"
                            android:layout_height="wrap_content"
                            android:text="Night"
                            android:padding="8dp"/>
                        <TextView
                            android:id="@+id/invoiceRa"
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:text="PA"
                            android:padding="8dp"/>
                    </LinearLayout>
                    <LinearLayout
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content">
                        <TextView
                            android:layout_width="0dp"
                            android:layout_weight="1"
                            android:layout_height="wrap_content"
                            android:text="Agent Namr"
                            android:padding="4dp"
                            android:textStyle="bold"
                            android:textColor="@color/colorHitam"/>
                        <TextView
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:text=":"
                            android:padding="4dp"/>
                        <TextView
                            android:id="@+id/invoiceAgent"
                            android:layout_width="0dp"
                            android:layout_weight="2"
                            android:layout_height="wrap_content"
                            android:text="Loading ..."/>
                    </LinearLayout>
                    <LinearLayout
                        android:layout_width="match_parent"
                        android:layout_height="wrap_content">
                        <TextView
                            android:layout_width="0dp"
                            android:layout_weight="1"
                            android:layout_height="wrap_content"
                            android:text="Rate Plane"
                            android:padding="4dp"
                            android:textStyle="bold"
                            android:textColor="@color/colorHitam"/>
                        <TextView
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content"
                            android:text=":"
                            android:padding="4dp"/>
                        <TextView
                            android:id="@+id/invoiceRatePlane"
                            android:layout_width="0dp"
                            android:layout_weight="2"
                            android:layout_height="wrap_content"
                            android:text="Loading ..."/>
                    </LinearLayout>
                </LinearLayout>
                <TableLayout
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:background="@drawable/border_hitam"
                    android:padding="8dp">
                    <HorizontalScrollView>
                        <androidx.recyclerview.widget.RecyclerView
                            android:id="@+id/invoiceDetails"
                            android:layout_width="wrap_content"
                            android:layout_height="wrap_content">

                        </androidx.recyclerview.widget.RecyclerView>
                    </HorizontalScrollView>
                </TableLayout>
            </LinearLayout>
        </ScrollView>
    </androidx.cardview.widget.CardView>
</LinearLayout>
```


```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content">
    <HorizontalScrollView
        android:layout_width="match_parent"
        android:layout_height="wrap_content">
        <LinearLayout
            android:layout_width="wrap_content"
            android:layout_height="wrap_content">
            <TextView
                android:id="@+id/invoiceDay"
                android:layout_width="70dp"
                android:layout_height="wrap_content"
                android:text="loading ..."
                android:padding="8dp"/>
            <TextView
                android:id="@+id/invoiceTanggal"
                android:layout_width="100dp"
                android:layout_height="wrap_content"
                android:text="loading ..."
                android:padding="8dp"/>
            <TextView
                android:id="@+id/invoiceRoom"
                android:layout_width="70dp"
                android:layout_height="wrap_content"
                android:text="loading ..."
                android:padding="8dp"/>
            <TextView
                android:id="@+id/invoiceExtraBed"
                android:layout_width="100dp"
                android:layout_height="wrap_content"
                android:text="loading ..."
                android:padding="8dp"/>
            <TextView
                android:id="@+id/invoiceamount"
                android:layout_width="100dp"
                android:layout_height="wrap_content"
                android:text="loading ..."
                android:padding="8dp"/>
            <TextView
                android:id="@+id/invoiceTotalAmount"
                android:layout_width="100dp"
                android:layout_height="wrap_content"
                android:text="loading ..."
                android:padding="8dp"/>
        </LinearLayout>
    </HorizontalScrollView>

</LinearLayout>
```
