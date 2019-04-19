---
layout: post
title:  "inject data firebase recyclerview hasmap"
tanggal : "2019-04-19"
author: "malikkurosaki"
categories: ["global","tutorial android studio"]
image: "https://i.postimg.cc/QdGdmh9b/Copy-of-data-list-13.png"
permalink: /:title
toc: true
---
 
bisa jadi akan kesulitan dan kerepotan jika harus membuat pojo untuk setiap kali pemanggilan data dari firebase , atau mungkin gk terpikirkan karus digabungkan antara firebase recyclerview dan hasma menjadi sangat mudah 
<!-- more -->

### dependency 

`cari sendiri di google banyak `

### buat adapter

``` java
public class MyRecyclerViewAdapter extends RecyclerView.Adapter<MyRecyclerViewAdapter.ViewHolder> {

    private LayoutInflater inflater;
    private List<Map<String,Object>> dataList;
    private KetikaDiKlick ketikaDiKlick;

    MyRecyclerViewAdapter(Context context,List<Map<String,Object>> dataList1){
        this.inflater = LayoutInflater.from(context);
        this.dataList = dataList1;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        View view = inflater.inflate(R.layout.layout_tutor_adapter,viewGroup,false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder viewHolder, int i) {
        Map<String,Object> dt = dataList.get(i);
        viewHolder.nama.setText(String.valueOf(dt.get("nm")));

    }

    @Override
    public int getItemCount() {
        return dataList.size();
    }

    class ViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {

        ImageView foto;
        TextView nama;

        ViewHolder(@NonNull View itemView) {
            super(itemView);

            foto = itemView.findViewById(R.id.foto);
            nama = itemView.findViewById(R.id.nama);

            itemView.setOnClickListener(this);
        }

        @Override
        public void onClick(View v) {
            ketikaDiKlick.ngeklik(v,getAdapterPosition());
        }
    }

    String getId(int id){
        return String.valueOf(dataList.get(id));
    }

    void setKetikaDiKlick(KetikaDiKlick diKlick){
        this.ketikaDiKlick = diKlick;
    }

    interface KetikaDiKlick{
        void ngeklik(View view,int position);
    }
}

```

### pemasangan

``` java
reference = FirebaseDatabase.getInstance().getReference();

        reference.child("jadwal")
                .child("tutor")
                .child(yr)
                .child(mn)
                .child(dy)
                .child(idttr).addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                dataList = new ArrayList<>();
                for (DataSnapshot ds:dataSnapshot.getChildren()){
                    Map<String,Object> kgt = (HashMap<String, Object>)ds.getValue();
                    Map<String,Object> dt = new HashMap<>();
                    for (Map.Entry<String,Object> en : kgt.entrySet()){
                        dt.put(String.valueOf(en.getKey()),en.getValue());

                    }
                    dataList.add(dt);
                }

                if (!dataList.isEmpty()){
                    adapter = new JadwalAdapter(Main3Activity.this,dataList);
                    jadwalKontainer = findViewById(R.id.jadwalContainer);
                    jadwalKontainer.setLayoutManager(new LinearLayoutManager(Main3Activity.this));
                    jadwalKontainer.setAdapter(adapter);

                    adapter.setJadwalDiclik(new JadwalAdapter.JadwalDiclik() {
                        @Override
                        public void maka(View view, int position) {
                            Toast.makeText(getApplicationContext(),"aye",Toast.LENGTH_SHORT).show();
                        }
                    });
                }

            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {

            }
        });

```


udah segitu aja , kalo masih bingung hubungi wa saja gratis