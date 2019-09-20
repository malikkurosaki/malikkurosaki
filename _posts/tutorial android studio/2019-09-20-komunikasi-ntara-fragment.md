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


### fragmentnya

```java
package probus.malikkurosaki.probussystem;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.github.mikephil.charting.components.Legend;
import com.google.gson.JsonObject;

import java.util.List;
import java.util.Map;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import butterknife.BindView;
import butterknife.ButterKnife;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Phis_panel extends Fragment{

    @BindView(R.id.arr)
    TextView arr;
    @BindView(R.id.arrCon)
    LinearLayout arrCon;
    @BindView(R.id.dasArrivalAduld)
    TextView dasArrivalAduld;
    @BindView(R.id.dasArrivalChild)
    TextView dasArrivalChild;
    @BindView(R.id.inH)
    TextView inH;
    @BindView(R.id.inhCon)
    LinearLayout inhCon;
    @BindView(R.id.dasInhouseAdult)
    TextView dasInhouseAdult;
    @BindView(R.id.dasInhouseChild)
    TextView dasInhouseChild;
    @BindView(R.id.depCon)
    TextView depCon;
    @BindView(R.id.dep)
    TextView dep;
    @BindView(R.id.dasDerpatureAdult)
    TextView dasDerpatureAdult;
    @BindView(R.id.dasDerpatureChild)
    TextView dasDerpatureChild;
    @BindView(R.id.bok)
    TextView bok;
    @BindView(R.id.bokCon)
    LinearLayout bokCon;
    @BindView(R.id.dasBookingAdult)
    TextView dasBookingAdult;
    @BindView(R.id.dasBookingChild)
    TextView dasBookingChild;


    private Context context;
    private Activity activity;
    private String TAG = "tagnya";

    public DariFragmentPanel dariFragmentPanel;

    public Phis_panel (){

    }

    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);
        this.context = context;
        this.activity = (Activity)context;
        if (context instanceof DariFragmentPanel){
            dariFragmentPanel = (DariFragmentPanel) context;
        }else {
            try {
                throw new IllegalAccessException("harus implement dari fragmen panel");
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }

    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.phis_dashboard_panel,container,false);
        ButterKnife.bind(this,view);
        return view;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {

        Helper_dashboard_panel dashboard_panel = new Helper_dashboard_panel(context, Helper_tools.urlnya(context));

        dashboard_panel.wadahArrivalNya(dashboard_panel.arrivalNya(), new Helper_dashboard_panel.DapatkanDataPanel() {
            @Override
            public void maka(Map<String, Object> datanya) {
                arr.setText(String.valueOf(datanya.get("total")));
                dasArrivalAduld.setText(String.valueOf(datanya.get("adult")));
                dasArrivalChild.setText(String.valueOf(datanya.get("child")));

                arrCon.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        dariFragmentPanel.maka("ayu");
                    }
                });
            }

        });

        dashboard_panel.wadahArrivalNya(dashboard_panel.bookingNya(), new Helper_dashboard_panel.DapatkanDataPanel() {
            @Override
            public void maka(Map<String, Object> datanya) {
                bok.setText(String.valueOf(datanya.get("total")));
                dasBookingAdult.setText(String.valueOf(datanya.get("adult")));
                dasBookingChild.setText(String.valueOf(datanya.get("child")));
            }
        });

        dashboard_panel.wadahArrivalNya(dashboard_panel.depatureNya(), new Helper_dashboard_panel.DapatkanDataPanel() {
            @Override
            public void maka(Map<String, Object> datanya) {
                dep.setText(String.valueOf(datanya.get("total")));
                dasDerpatureAdult.setText(String.valueOf(datanya.get("adult")));
                dasDerpatureChild.setText(String.valueOf(datanya.get("child")));
            }
        });

        dashboard_panel.wadahArrivalNya(dashboard_panel.inHouseNya(), new Helper_dashboard_panel.DapatkanDataPanel() {
            @Override
            public void maka(Map<String, Object> datanya) {
                inH.setText(String.valueOf(datanya.get("total")));
                dasInhouseAdult.setText(String.valueOf(datanya.get("adult")));
                dasInhouseChild.setText(String.valueOf(datanya.get("child")));
            }
        });

    }


    public void setDariFragmentPanel(DariFragmentPanel dariFragmentPanel) {
        this.dariFragmentPanel = dariFragmentPanel;
    }

   interface DariFragmentPanel{
        void maka(String nama);
   }
}
```
