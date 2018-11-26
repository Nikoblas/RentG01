            var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
            var dataBase = null;            
   
            function startDB() {
                dataBase = indexedDB.open("rentg01", 1);
                dataBase.onupgradeneeded = function (e) {
                    var active = dataBase.result;
                    //clientes
                    var cliente = active.createObjectStore("clientes", {keyPath: 'id', autoIncrement: true});
                    cliente.createIndex('by_email', 'email', {unique: true});
                    cliente.createIndex('by_contraseña', 'contraseña', {unique: false});                    
                    cliente.createIndex('by_nombre', 'nombre', {unique: false});
                    cliente.createIndex('by_dni', 'dni', {unique: true});                    
                    cliente.createIndex('by_movil', 'movil', {unique: false});
                    cliente.createIndex('by_imagen', 'imagen', {unique: false});
                    //coches
                    var coche = active.createObjectStore("coches", {keyPath: 'id', autoIncrement: true});
                    coche.createIndex('by_matricula', 'matricula', {unique: true});
                    coche.createIndex('by_marca', 'marca', {unique: false});                    
                    coche.createIndex('by_imagen', 'imagen', {unique: false});
                    //reservas
                    var reserva = active.createObjectStore("reservas", {keyPath: 'id', autoIncrement: true});
                    reserva.createIndex('by_email', 'email', {unique: false});
                    reserva.createIndex('by_matricula', 'matricula', {unique: false});                    
                    reserva.createIndex('by_fechahora_inicio', 'fechahora_inicio', {unique: false});
                    reserva.createIndex('by_fechahora_entrega', 'fechahora_entrega', {unique: false});                    
                    reserva.createIndex('by_lugar', 'lugar', {unique: false});
                };
                dataBase.onsuccess = function (e) {
                    alert('Database loaded');
                };
                dataBase.onerror = function (e) {
                    alert('Error loading database');
                };
                addRS();
            }
            function addRS(){
                var active = dataBase.result;
                var data = active.transaction(["clientes"], "readwrite");
                var object = data.objectStore("clientes");
                var request = object.put({
                    email: "a@a.com".value,
                    contraseña: "a".value,
                    nombre: "RS".value,
                    dni: "RS".value,
                    movil: "RS".value,
                    imagen: "RS".value
                });
                request.onerror = function (e) {
                    alert(request.error.name + '\n\n' + request.error.message);
                };
                data.oncomplete = function (e) {
                    alert('Object successfully added');
                };
            }
            function addCliente() {
                var active = dataBase.result;
                var data = active.transaction(["clientes"], "readwrite");
                var object = data.objectStore("clientes");
                var request = object.put({
                    email: document.querySelector("#email").value,
                    contraseña: document.querySelector("#contraseña").value,
                    nombre: document.querySelector("#nombre").value,
                    dni: document.querySelector("#dni").value,
                    movil: document.querySelector("#movil").value,
                    imagen: document.querySelector("#imagen").value
                });
                request.onerror = function (e) {
                    alert(request.error.name + '\n\n' + request.error.message);
                };
                data.oncomplete = function (e) {
                    document.querySelector('#dni').value = '';
                    document.querySelector('#name').value = '';
                    document.querySelector('#surname').value = '';
                    alert('Object successfully added');
                };
            }
            
            
            function load(id) {
                var active = dataBase.result;
                var data = active.transaction(["people"], "readonly");
                var object = data.objectStore("people");
                var request = object.get(parseInt(id));
                request.onsuccess = function () {
                    var result = request.result;
                    if (result !== undefined) {
                        alert("ID: " + result.id + "\n\
                               DNI " + result.dni + "\n\
                               Name: " + result.name + "\n\
                               Surname: " + result.surname);
                    }
                };
            }
            function loadByDni(dni) {
                var active = dataBase.result;
                var data = active.transaction(["people"], "readonly");
                var object = data.objectStore("people");
                var index = object.index("by_dni");
                var request = index.get(String(dni));
                request.onsuccess = function () {
                    var result = request.result;
                    if (result !== undefined) {
                        alert("ID: " + result.id + "\n\
                               DNI " + result.dni + "\n\
                               Name: " + result.name + "\n\
                               Surname: " + result.surname);
                    }
                };
            }
            function loadAll() {
                var active = dataBase.result;
                var data = active.transaction(["people"], "readonly");
                var object = data.objectStore("people");
                var elements = [];
                object.openCursor().onsuccess = function (e) {
                    var result = e.target.result;
                    if (result === null) {
                        return;
                    }
                    elements.push(result.value);
                    result.continue();
                };
                data.oncomplete = function () {
                    var outerHTML = '';
                    for (var key in elements) {
                        outerHTML += '\n\
                        <tr>\n\
                            <td>' + elements[key].dni + '</td>\n\
                            <td>' + elements[key].name + '</td>\n\
                            <td>\n\
                                <button type="button" onclick="load(' + elements[key].id + ')">Details</button>\n\
                                <button type="button" onclick="loadByDni(' + elements[key].dni + ')">Details DNI</button>\n\
                            </td>\n\
                        </tr>';
                    }
                    elements = [];
                    document.querySelector("#elementsList").innerHTML = outerHTML;
                };
            }            
            function loadAllByName() {
                var active = dataBase.result;
                var data = active.transaction(["people"], "readonly");
                var object = data.objectStore("people");
                var index = object.index("by_name");                
                var elements = [];
                index.openCursor().onsuccess = function (e) {
                    var result = e.target.result;
                    if (result === null) {
                        return;
                    }
                    elements.push(result.value);
                    result.continue();
                };
                data.oncomplete = function () {
                    var outerHTML = '';
                    for (var key in elements) {
                        outerHTML += '\n\
                        <tr>\n\
                            <td>' + elements[key].dni + '</td>\n\
                            <td>' + elements[key].name + '</td>\n\
                            <td>\n\
                                <button type="button" onclick="load(' + elements[key].id + ')">Details</button>\n\
                                <button type="button" onclick="loadByDni(' + elements[key].dni + ')">Details DNI</button>\n\
                            </td>\n\
                        </tr>';
                    }
                    elements = [];
                    document.querySelector("#elementsList").innerHTML = outerHTML;
                };
            }