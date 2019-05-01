## membuat slide show dengan hanya menggunakan recyclerview

__codenya__

``` java

hitungSlide = 0;
                final Handler handler = new Handler();
                handler.postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        Log.i(TAG, "run: "+hitungSlide);
                        if (hitungSlide >= helperAdapter.getItemCount()){
                            hitungSlide = 0;
                        }
                        slideContainer.smoothScrollToPosition(hitungSlide);
                        hitungSlide++;
                        handler.postDelayed(this,2000);
                    }
                },2000);

```


jreng jreng ... next