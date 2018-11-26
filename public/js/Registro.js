var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.addEventListener("load", iniciar);

function iniciar() {
    var boton = document.getElementById("registrar");
    boton.addEventListener("click", conectar);
    var boton2 = document.getElementById("reset");
    boton2.addEventListener("click", reset);
}
function conectar() {    
    alert("que le follen a todo el mundo");
} 
function reset() {   
    location.href="Registro.html";
}     