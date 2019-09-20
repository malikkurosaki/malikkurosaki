---
layout: post
title:  "komunikasi antara fragment"
tanggal : "2019-09-20"
author: "malikkurosaki"
categories: ["global","tutorial android studio"]
image: "https://i.postimg.cc/dVwTPZd9/image.png"
permalink: /:title
toc: true
---
setelah berkutik seharian akhirnya berhasil membuat komunikasi antara fragmentl <!-- more -->


```java
package probus.malikkurosaki.probussystem;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.drawable.AnimationDrawable;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.view.View;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.mapzen.speakerbox.Speakerbox;
import com.ncorti.slidetoact.SlideToActView;

import java.util.Locale;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import butterknife.BindView;
import butterknife.ButterKnife;

public class ProbusSplashActivity extends AppCompatActivity implements Phis_panel.DariFragmentPanel {

    /*
    MAIN
    ====
     */
    @BindView(R.id.splash_loading)
    ProgressBar splashLoading;
    @BindView(R.id.splash_next)
    SlideToActView splashNext;
    @BindView(R.id.splashIcon)
    ImageView splashIcon;

    private String TAG = "-->";

    // speaker box
    private Speakerbox speakerbox;
    private int IJIN = 123;

    private String URLNYA_EZEE = "https://live.ipms247.com";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.probus_splash_activity);
        ButterKnife.bind(this);


        speakerbox = new Speakerbox(getApplication());
        String bahasa = Locale.getDefault().getDisplayLanguage();
        if (!bahasa.equals("English")) {
            speakerbox.play("selamat datang di probus sistem");
        } else {
            speakerbox.play("welcome to the probus system");
        }


        splashNext.setVisibility(View.GONE);
        new CountDownTimer(3000, 1000) {
            @Override
            public void onTick(long l) {

            }

            @Override
            public void onFinish() {
                splashLoading.setVisibility(View.GONE);
                splashNext.setVisibility(View.VISIBLE);

            }
        }.start();

        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.RECORD_AUDIO, Manifest.permission.READ_EXTERNAL_STORAGE}, IJIN);

        }

        splashNext.setOnSlideCompleteListener(slideToActView -> {
            startActivity(new Intent(ProbusSplashActivity.this, Activity_User.class));
            finish();
        });



    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == IJIN) {
            if (grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                Toast.makeText(getApplicationContext(), "permisi has granted click next", Toast.LENGTH_LONG).show();
                recreate();
            }
        }
    }
    

    @Override
    public void maka(String nama) {
        Toast.makeText(getApplicationContext(),nama,Toast.LENGTH_LONG).show();
    }
}
```
