## membuat recycler view seperti view pager kesamping


__codenya adalah__
``` java
 SlideShowHelperAdapter helperAdapter = new SlideShowHelperAdapter(Main2Activity.this,slideList);
                slideContainer.setLayoutManager(new LinearLayoutManager(Main2Activity.this,LinearLayoutManager.HORIZONTAL,false));
                slideContainer.setAdapter(helperAdapter);

                SnapHelper snapHelper = new PagerSnapHelper();
                snapHelper.attachToRecyclerView(slideContainer);

```

jreng jreng .....


<div style="color:red">warna merah</div>