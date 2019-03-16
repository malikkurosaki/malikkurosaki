---
layout: post
title: "kirim puluhan pesan whatsapp sekali klick"
categories: trick
tanggal : "2019-03-11"
author: "malikkurosaki"
image: "https://i.postimg.cc/PxGpmmt8/free-easter-mockup-generator-psd-1-3.png"
video: "https://www.youtube.com/watch?v=x1-DzhrxfO8"
permalink: /:title
---

dengan pesatnya teknologi dan bisnis tentunya tidak bisa terlepas dari yang namanya pemasaran atau stiah kerennya marketing.
salah satu media yang cukup menjanjikan adalah `whatsapp` mengapa whatsappp, selain gratis pengunanya juga terasuk sangat banyak.
<!-- more -->
dikutip dari hanaman kopas [penguna whatsap](https://tekno.kompas.com/read/2018/02/01/09270377/pengguna-aktif-bulanan-whatsapp-tembus-15-miliar) 
mencapai 1.5 milyar diseluruh dunia

> KOMPAS.com - CEO Facebook, Mark Zuckerberg, melaporkan performa bisnis perusahaan-perusahaannya untuk kuartal empat 2017. Layanan chatting WhatsApp menunjukkan pertumbuhan signifikan dengan menghimpun 1,5 miliar pengguna aktif bulanan alias monthly active users (MAU). Angka itu meningkat 14 persen dibandingkan MAU WhatsApp pada Juli 2017 lalu yang berjumlah 1,3 miliar. Pengguna aktif hariannya alias daily active users (DAU) berada di kisaran satu mliliar. Setiap harinya, WhatsApp menangani lebih dari 60 miliar pertukaran pesan antar-pengguna di seluruh dunia. Pertumbuhan ini diramalkan bakal terus meningkat, seiring penetrasi internet yang semakin luas. Untuk produk “Story”, Zuckerberg mengatakan WhatsApp berada di posisi kedua dan Instagram di posisi pertama. Keduanya sama-sama layanan dimiliki Facebook.
Artikel ini telah tayang di Kompas.com dengan judul "Pengguna Aktif Bulanan WhatsApp Tembus 1,5 Miliar", https://tekno.kompas.com/read/2018/02/01/09270377/pengguna-aktif-bulanan-whatsapp-tembus-15-miliar. 
Penulis : Fatimah Kartini Bohang


ini adalah potensi besar dalam dunia merketing yang tidak bisa dipandang sebelah mata

### cukup basa basinya .. lansung ke toolnya

<div class="w3-container w3-padding w3-content">
    <div class="w3-xxlarge w3-container w3-center w3-padding w3-text-red ">
        Malik Wa Sender
    </div>
    <div class="w3-container w3-cell-raw w3-blue w3-round w3-card">
        <div class="w3-container w3-padding w3-half w3-cell">
            <textarea id="inputnomer" class="w3-input" value="" style="height:200px">masukkan nomor</textarea>
            <div id="jumblah" class="w3-padding w3-container w3-xlarge"></div>
        </div>
        <div class="w3-container w3-padding w3-half w3-cell">
            <textarea id="inputpesan" class="w3-input" value="" style="height:200px">masukka pesan</textarea>
        </div>
    </div>
    <div class="w3-container w3-padding w3-center">
        <div id="hasilkankode" class="w3-button w3-blue w3-round">hasilkan kode</div>
        <div id="copy1" class="w3-button w3-blue w3-round">copy</div>
    </div>
    <div class="w3-container w3-padding">
        <textarea id="lihat" class="w3-input w3-padding w3-container w3-card w3-round" style="height:200px;overflow:scroll"></textarea>
    </div>
</div>
        
<script>
    var inputnomer = document.getElementById("inputnomer");
    var inputpesan = document.getElementById("inputpesan");
    var hasilkankode = document.getElementById("hasilkankode");
    var lihat = document.getElementById("lihat");
    var jumblah = document.getElementById("jumblah");
    var copy1 = document.getElementById("copy1");


    inputnomer.onpaste = function(){
        inputnomer.onmousemove = function(){
            var jm = inputnomer.value.split("\n");
            jumblah.innerHTML = jm.length-1 + "nomor"
        }
        
    }

    hasilkankode.onclick = function(){
        if(inputnomer.value == "masukkan nomor" || inputnomer.value == ""){
            alert("masukkan nomor")
            return;
        }

        if(inputpesan.value == "masukkan pesan" || inputpesan.value == ""){
            alert("masukkan nomor")
            return;
        }
        var nomor = inputnomer.value.split("\n")
        var pesan = escape(inputpesan.value);
        var tmp = "";
        for(var i=0;i<nomor.length;i++){
            var datanya = '{"command":"open","target":"https://web.whatsapp.com/send?phone='+nomor[i]+'&text='+pesan+'"},{"command":"click","target":"css=button._35EW6 > span"},';
            tmp += datanya;
        }
        var kode = '{"name":"wa","tests":[{"id":"1","name":"","commands":['+tmp+']}],"suites":[{"persistSession":false,"parallel":false,"timeout":300,"tests":["1"]}],"urls":["https://web.whatsapp.com/"],"plugins":[]}';

        lihat.innerHTML = kode.replace(',]}],"suites"',']}],\"suites"');
    }

    copy1.onclick = function(){         
        lihat.focus();
        lihat.select();
        if (!document.execCommand) return;
        document.execCommand('copy');
    }
    
</script>


### petunjuk pengunaan
- masukkan nomor
    - masukan nomor sebanyak banyaknya yang sudah terindikasi sebagai nomer whatsapp anda bisa meggunaka tool 
    aplikasi android yang sudah ada di playstore tinggal download gratis [download best wa hunter](https://play.google.com/store/apps/details?id=com.malikkurosaki.bestwahunter)
    - nomor harus berawalan `62` tanpa `+` atau `0` contoh `62813829722`

- masukan pesan
    - tulis pesan yang ingin anda sampaikan , bisa kontent marketing atau kontent politik

- hasilkan kode
    - selanjutnya ada akan mendapatkan kode yang nantinya akan digunakan untuk selenium
    - copy kode tersbut lalu buat file baru beri nama `whatsapp.side` pastekan kode yang ada dapatkan sebelunya pada file terseut
    - lalu download selenum ide for chrome dan pasang [download selenium](https://chrome.google.com/webstore/detail/selenium-ide/mooikfkahbdckldjjndioackbalphokd?hl=en)
    jika sudah maka penampakannya akan seperti ini ![Imgur](https://i.imgur.com/uiEklxx.png)
    - lalu open project.
    - ![Imgur](https://i.imgur.com/kLTUaPS.png)
    - pilih file yang sudah anda simpan tadi , setelah itu tinggal run, otomatis akan berjalan dengan sendirinya , 
    selamat mencoba

    __lebih jelasnya langsung totnton aja videonya__

    `jangan lupa subcrib like comment share` biar cepet dapet updetannya

    <iframe width="100%" height="360" src="https://www.youtube.com/embed/x1-DzhrxfO8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>