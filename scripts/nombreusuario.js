let user = document.getElementById('user');
let password = document.getElementById('password');
let reset = document.getElementById('reset');
let save = document.getElementById('save');
let createUsers = document.getElementById('createUsers');
if (sessionStorage.getItem("username") && sessionStorage.getItem("password")){
    window.location.replace('./inicios.html');
} //Si ya tenemos el sessionStorage, entonces directamente reconecta a la página principal
//Guardado de usuarios
class Usuario {
    constructor(user, password) {
        this.user = user;
        this.password = password;
    }
} //Clase que genera usuarios
let guardarUsuario = [];
let usuario;
let login;
let passwordS;
createUsers.addEventListener('click', (e) => {
    e.preventDefault();
    Swal.fire({
        title: 'Crear usuario',
        html: `<input type="text" id="login" class="swal2-input" placeholder="Usuario">
        <input type="password" id="password" class="swal2-input" placeholder="Contraseña">`,
        confirmButtonText: 'Registrar',
        focusConfirm: false,
        preConfirm: () => {
            login = Swal.getPopup().querySelector('#login').value;
            passwordS = Swal.getPopup().querySelector('#password').value;
            if (!login || !passwordS) {
                Swal.showValidationMessage(`Por favor, ingresa un usuario y una contraseña`);
            }
            else {
                usuario = new Usuario(login, passwordS);
                guardarUsuario.push(usuario);
                localStorage.setItem("users",JSON.stringify(guardarUsuario));
            } //Guarda el usuario en el localStorage
            return { login: login, password: passwordS };
        }
    }).then((result) => {
        Swal.fire(`
          Usuario: ${result.value.login},
          Contraseña: ${result.value.password}
        `.trim()
        )
    })
}); //Creación de usuarios con SweetAlert
let userN;
let passwordN;
user.addEventListener('input', () => {
    userN = user.value;
})
password.addEventListener('input', () => {
    passwordN = password.value;
}) //Guarda valores de los inputs
save.addEventListener('click', (e) => {
    e.preventDefault();
    let findUser = guardarUsuario.filter(el => userN == el.user && passwordN == el.password);
    let nombre = "";
    guardarUsuario.forEach (el =>{
        el.user == userN ? nombre = userN : null; //Si el.user es igual a userN, entonces que el nombre sea igual, si no, nulo
    });
    let passwordX = "";
    guardarUsuario.forEach (el =>{
        el.password == passwordN ? passwordX = passwordN : null; //Lo mismo pero con la contraseña
    })
    if (nombre && passwordX){
        Swal.fire({
            icon: "success",
            text: "Inicio de sesión guardado",
            confirmButtonText: "<a class='botonS' href='./inicios.html'>IR A INICIO</a>",
        });
        sessionStorage.setItem ("username",nombre);
        sessionStorage.setItem("password",passwordX)
    } //Se guarda en el sessionStorage
    else{
        Swal.fire({
            icon: "error",
            text: "No se encuentra el usuario"
        });
    } //Si no se encuentra en el array, da un error
})
if (localStorage.getItem("users")){
    guardarUsuario = JSON.parse(localStorage.getItem("users"));
} //Cada vez que iniciemos la página, automaticamente se guardan los usuarios previos