var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.addEventListener("load", iniciar);
function iniciar() {
    var boton = document.getElementById("registrarse");
    boton.addEventListener("click", registrarse);
    var boton2 = document.getElementById("conectar");
    boton2.addEventListener("click", conectar);
    var boton3 = document.getElementById("reset");
    boton3.addEventListener("click", reset);
}
function conectar() {    
    alert("Por favor ingrese, email y contraseña correctos.");
} 
function registrarse() {
    location.href='Registro.html';
}
function reset() {
    location.href='AreaClientes.html';
}