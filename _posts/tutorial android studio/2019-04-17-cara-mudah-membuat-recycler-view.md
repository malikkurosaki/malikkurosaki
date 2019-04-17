---
layout: post
title:  "cara mudah membuat recycler view"
tanggal : "2019-04-17"
author: "malikkurosaki"
categories: ["trick","tutorial android studio"]
image: "https://i.postimg.cc/KztZvh3J/android-recyclerview-multiviewholders.jpg"
permalink: /:title
toc: true
---

cara mudah dan simple membuat recycler view yang terkadang menjadi menakutkan karena 
memang terbilang agak ribet dan susah , kali ini saya akan membagikan trik mudahnya 
<!-- more -->


### dependency

`implementation 'com.android.support:appcompat-v7:27.1.1`

`implementation 'com.android.support:recyclerview-v7:27.1.1`


### buka android studio 

![{{ page.author }} {{ page.title }}](https://i.postimg.cc/DznDbW0V/image.png)

__buat class namanya MyrecyclerViewAdapter__

``` java
class MyRecyclerViewAdapter extends RecyclerView.Adapter<MyRecyclerViewAdapter.ViewHolder> {

    private LayoutInflater inflater;
    private List<String> data;
    private KetikaDiKlick ketikaDiKlick;

    MyRecyclerViewAdapter(Context context1,List<String> data1 ){
        this.inflater = LayoutInflater.from(context1);
        this.data = data1;
    }
    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        View view  = inflater.inflate(R.layout.layout1,viewGroup,false);

        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder viewHolder, int i) {
        String isinya = data.get(i);
        viewHolder.a1.setText(isinya);
    }

    @Override
    public int getItemCount() {
        return data.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        private TextView a1;
        public ViewHolder(@NonNull View itemView) {
            super(itemView);

            a1 = itemView.findViewById(R.id.a1);

        }

        @Override
        public void onClick(View v) {
            ketikaDiKlick.diClick(v,getAdapterPosition());
        }
    }

    String getId(int pos){
        return data.get(pos);
    }

    void setKetikaDiKlick(KetikaDiKlick ketikaDiKlick1){
        this.ketikaDiKlick = ketikaDiKlick1;
    }
    interface KetikaDiKlick{
        void diClick(View view,int position);
    }
}

```

### layout main activity xml

``` xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity"
    android:orientation="vertical">

    <android.support.v7.widget.RecyclerView
        android:id="@+id/container1"
        android:layout_width="match_parent"
        android:layout_height="match_parent">

    </android.support.v7.widget.RecyclerView>

</LinearLayout>
```

### layout1 xml

``` xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content">

    <TextView
        android:id="@+id/a1"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="ini dari layout satu"/>

</LinearLayout>

```


### deklarasi main activity java

``` java
public class MainActivity extends AppCompatActivity implements MyRecyclerViewAdapter.KetikaDiKlick{

    private MyRecyclerViewAdapter adapter;
    private RecyclerView recyclerView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        recyclerView = findViewById(R.id.container1);

        ArrayList<String> nama = new ArrayList<>();

        for (int v = 0; v < 20;v++){
            nama.add("apa kabarnya"+v);
        }

        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        adapter = new MyRecyclerViewAdapter(this,nama);
        adapter.setKetikaDiKlick(this);
        recyclerView.setAdapter(adapter);


    }

    @Override
    public void diClick(View view, int position) {
        Toast.makeText(getApplicationContext(),"posisinya adalah : "+position,Toast.LENGTH_SHORT).show();
    }
}


```



selesai ... 


