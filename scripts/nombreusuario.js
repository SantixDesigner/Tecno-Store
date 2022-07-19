let user = document.getElementById('user');
let password = document.getElementById('password');
let reset = document.getElementById('reset');
let save = document.getElementById('save');
//Guardado de usuarios
if (((sessionStorage.getItem('username') == null) || (sessionStorage.getItem('username') == "")) && ((sessionStorage.getItem('password') == null) || (sessionStorage.getItem('password') == "")) || ((sessionStorage.getItem('username') != null) || (sessionStorage.getItem('username') != "")&& sessionStorage.getItem('password') == null) || ((sessionStorage.getItem('username') == null || sessionStorage.getItem('username') == "") && (sessionStorage.getItem('password') != null) || (sessionStorage.getItem('password') != ""))){
    let userN;
    let passwordN;
    const getUser = (userN) =>{
        if (sessionStorage.getItem('username') == null){
            user.addEventListener('focusout',()=>{
                userN = user.value;
                save.addEventListener('click',e=>{
                    sessionStorage.setItem('username',userN);
                })
            })
        }
    }
    const getPassword = (passwordN) =>{
        if (sessionStorage.getItem('password') == null){
            password.addEventListener('focusout',(e) =>{
                passwordN = password.value;
                save.addEventListener('click',e=>{
                    sessionStorage.setItem('password',passwordN);
                })
            })
        }
    }
    getUser(userN);
    getPassword(passwordN);
    reset.addEventListener('click',e =>{
        sessionStorage.clear();
    })
}else{
    user.value = sessionStorage.getItem('username');
    password.value = sessionStorage.getItem('password');
    reset.addEventListener('click',e =>{
        sessionStorage.clear();
    })
}