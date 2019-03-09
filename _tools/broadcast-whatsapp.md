---
layout: "post"
title: "broadcast whatsapp"
permalink: "/broadcast-whatsapp"
---
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
