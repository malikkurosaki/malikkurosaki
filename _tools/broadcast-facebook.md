---
layout: "post"
title: "broadcast facebook"
permalink: "broadcast-facebook"
---

<div class="w3-container w3-blue w3-card w3-content w3-center">
    <h1>Bakemono FB Bulk masager</h1>
    <i>by malik kurosaki</i>
</div>
<div class="w3-content w3-container">
    <input id="alamat" class="w3-container w3-input w3-border w3-padding w3-margin w3-light-grey" placeholder="masukkan alamat url disini">
    <input id="pesan" class="w3-container w3-input w3-border w3-padding w3-margin w3-light-grey" placeholder="masukkan isi pesannya disini">
    <input id="banyak" class="w3-quarter w3-container w3-input w3-border w3-padding w3-margin w3-light-grey" placeholder="berapa banyak">
    <button id="produksi" class="w3-quarter w3-input w3-margin">produksi</button>
</div>
<div class="w3-container w3-content w3-input w3-light-grey w3-padding" style="height:400px">
    <textarea id="lihat" class="w3-container w3-pading w3-border w3-content" style="width:100%;height: 100%"></textarea>
</div>
        
<script>
    var alamat = document.getElementById("alamat");
    var banyak = document.getElementById("banyak");
    var produksi = document.getElementById("produksi");
    var lihat = document.getElementById("lihat");
    var pesan = document.getElementById("pesan");
    var naik = 0;
    var scrl = 0;
    produksi.onclick = function(){
        var alamatnya = alamat.value;
        var banyaknya = banyak.value;''
        var pesannya = pesan.value;


        if(alamatnya == ""){
            alert("alamatnya gk bole kosong")
            return
        }

        if(pesannya == ""){
            alert("pesan jangan kosong coy")
            return;
        }
        if (banyaknya == ""){
            alert("jumblah gk bole kosong")
            return;
        }
        
        var kepala = '{"name": "fb",\n\
                    "url": "'+alamatnya+'",\n\
                    "tests": [{\n\
                    "name": "coba",\n\
                    "commands": [{\n\
                    "command": "open",\n\
                    "target": "'+alamatnya+'"\n\
                    },';
        

            var total = "";
            var jadiTurun = "";
        for(var i = 0;i<banyaknya;i++){
            var turun = '{"command": "runScript",\n\
                        "target": "window.scrollTo(0,'+scrl+')"\n\
                    }';
            naik++;
            scrl +=200;
            jadiTurun += turun;
            var badan = jadiTurun+', {\n\
                        "command": "click",\n\
                        "target": "xpath=//div['+naik+']/div/a/i"\n\
                    },{\n\
                        "command": "click",\n\
                        "target": "xpath=//html/body/div[1]/div/div[4]/div/div/div[1]/div[1]/div[2]/div[2]/div/div[4]/a[@role=\'button\']"\n\
                    }, {\n\
                        "command": "wait for element visible",\n\
                        "target": "xpath=//div/div[2]",\n\
                        "value": "2000"\n\
                    }, {\n\
                        "command": "storeXpathCount",\n\
                        "target": "xpath=//textarea",\n\
                        "value": "pesan"\n\
                    }, {\n\
                        "command": "if",\n\
                        "target": "${pesan} == 1"\n\
                    }, {\n\
                        "command": "type",\n\
                        "target": "name=body",\n\
                        "value": "'+pesannya+'"\n\
                    }, {\n\
                        "command": "submit",\n\
                        "target": "xpath=//textarea"\n\
                    }, {\n\
                        "command": "else",\n\
                        "target": ""\n\
                    },{\n\
                        "command": "open",\n\
                        "target": "'+alamatnya+'"\n\
                    },{\n\
                        "command": "end",\n\
                        "target": ""\n\
                    },{\n\
                        "command": "open",\n\
                        "target": "'+alamatnya+'"\n\
                    },';

                    total += badan;
        }

        var kaki = '{\n\
                        "command": "open",\n\
                        "target": "https://freesound.org/data/previews/460/460656_7877945-lq.mp3"\n\
                    },]}],\n\
                    "suites": [{\n\
                        "name": "Default Suite",\n\
                        "persistSession": false,\n\
                        "parallel": false,\n\
                        "timeout": 300\n\
                    }],\n\
                    "urls": [],\n\
                    "plugins": []\n\
                    }';


        var sub = kepala+total+kaki;
        var subTotal = sub.replace(",]","]");
        var sub2 = subTotal.replace(/}{/g,"},{");
        lihat.value = sub2;

    }
</script>
