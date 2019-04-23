
## mendapatkan posisi terakhir pada recyclerview

``` java
 perkenalanContainer.addOnScrollListener(new RecyclerView.OnScrollListener() {
                    @Override
                    public void onScrolled(@NonNull RecyclerView recyclerView, int dx, int dy) {
                        LinearLayoutManager manager = ((LinearLayoutManager)perkenalanContainer.getLayoutManager());
                        final int pos = manager.findLastCompletelyVisibleItemPosition();
                        int jumblah = perkenalanContainer.getAdapter().getItemCount();

                        if ((pos+1) == jumblah){
                            lanjutContainer.setVisibility(View.VISIBLE);
                            lanjut.setOnClickListener(new View.OnClickListener() {
                                @Override
                                public void onClick(View v) {
                                    startActivity(new Intent(MainActivity.this,Main2Activity.class));
                                }
                            });

                        }else {
                            lanjutContainer.setVisibility(View.GONE);
                        }
                        super.onScrolled(recyclerView, dx, dy);

                    }
                });

```
