var editor = document.querySelectorAll(".editor");
for (var n = 0;n< editor.length;n++){
    editor[n].style.display = "none"
}

var edit = document.getElementById("edit");
edit.onclick = function(){
    for (var n = 0;n< editor.length;n++){
        editor[n].style.display = "block"
    }
}
