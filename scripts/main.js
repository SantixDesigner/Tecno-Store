/* let user;
let username = sessionStorage.getItem("username");
let surn;
let surname = sessionStorage.getItem("surname");
if((username) && (surname)){
    user = username;
    surn = surname;
    let response = `Bienvenido ${user} ${surn}`;
    alert(response);
}else if (username == false){
    user = prompt("¿Cuál es tu nombre?");
    sessionStorage.setItem("username",user);
} else if (surname == false){
    surn = prompt("¿Cuál es tu apellido");
    sessionStorage.setItem("surname",surn);
}
else{
    user = prompt("Cuál es tu nombre?");
    sessionStorage.setItem("username",user);
    surn = prompt("¿Cuál es tu apellido?");
    sessionStorage.setItem("surname",surn);
} */

let pricesS;
let pricesSN = 0;
let namesProducts = "";
let allNames = "";
let a = document.createElement("button");
let main = document.getElementById('main');
let button = document.createElement('button');
const newDom = (pricesS,namesProducts, pricesSN, a, divProduct, allNames, button) =>{
    let enlace;
    for (const productoS of componentArray2){
        if (productoS.marca == 'AMD'){
            enlace = "./assets/ryzenej.jpg";
        } else if (productoS.marca == 'Intel'){
            enlace = "./assets/intel.jpeg";
        }
        let producto = document.createElement("div");
        producto.innerHTML = `<img src = "${enlace}">
        <h2>${productoS.nameS}</h2>
        <span>price: </span>
        <span>${productoS.price}</span>
        <p class = "nodisplay">marca${productoS.marca}</p>`;
        producto.className = "producto";
        a = document.createElement('button');
        a.innerHTML = `Comprar`;
        const funcion = e =>{
            pricesS = e.currentTarget.previousElementSibling.previousElementSibling.innerHTML;
            namesProducts = e.currentTarget.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerText;
            allNames += namesProducts + ", ";
            pricesSN += parseInt(pricesS);
            producto.remove();
        }
        a.addEventListener("click", funcion);
        producto.append(a);
        divProduct.append(producto);
    }
    const funcion2 = e =>{
        iva(allNames, pricesSN);
        button.remove();
        const x = new Date();
        alert("Thank you for visit TecnoStore in the day: "+x.getDate()+"/"+(x.getMonth()+1)+"/"+x.getFullYear()); //Genera una fecha en base al día actual
    }
    button.addEventListener('click',funcion2);
}
const CPUS = () =>{ //Esto genera la lista correspondiente a si es AMD o es Intel
    for (const nombre of productsCPU){
        let nombres = nombre;
        componentArray2.push(nombres);
    }
    button.className = "button";
    button.innerHTML = `Terminar`;
    main.append(button);
    newDom(pricesS,namesProducts,pricesSN,a,divProduct,allNames, button);
}
const iva=(nameS,price)=>{
    let iva = 0.21;
    let resultIva = (price*iva)+price;
    alert("The name of all products is: "+nameS+" and the price of this with IVA is: u$d"+Math.round(resultIva));
}
const createComponents = () =>{
    let booleanS = prompt ("Do you want new components on my page?").toLowerCase();
    if (booleanS == "yes"){
        do{
            i = parseInt(prompt("What number of components do you want?"));
            for (let integer = 0; integer<i; integer++){
                nameProduct = prompt("Name of product (Motherboard, Graphic, Monitor, etc)");
                priceProduct2 = parseInt(prompt("Price of this product"));
                let componente = new Componente(nameProduct,priceProduct2);
                componentArray3.push(componente); //Inicia los valores de la variable componente
                let disponibility = prompt("Do you want disponibility?").toLowerCase();
                if(disponibility == "yes"){
                    componentArray3[integer].disponibilities(); //habilita la disponibilidad
                    let stock = parseInt(prompt("How many stock do you want?"));
                    while((isNaN(stock)) || (stock == 0)){
                        stock = parseInt(prompt("How many stock do you want?"));
                    }
                    componentArray3[integer].stocks(stock); //habilita la cantidad de stock
                }
            }
            for (let integer = 0; integer<i; integer++){
                alert("PRODUCT: "+componentArray3[integer].name+" PRICE: $"+componentArray3[integer].price+" disponibility: "+componentArray3[integer].disponibility+" stock: "+componentArray3[integer].stock);
            }
            booleanS = prompt("Do you want to continue?").toUpperCase();
        }while(booleanS != "NO");
    }
}
const eliminarProducto = () =>{
    let apply = form.firstElementChild.children[8].firstElementChild;
    let button1 = form.firstElementChild.firstElementChild.firstElementChild.nextElementSibling;
    button1.addEventListener("click", funcion5);
    function funcion5(){
        //form.classList.add('blocked');
        let producto;
        apply.addEventListener('click',funcionAplicar);
        function funcionAplicar(e){
            e.preventDefault();
            for (let i = 0; i<productsCPU.length; i++){
                producto = document.body.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.children[i];
                if(producto.lastChild.previousSibling.textContent === "marcaIntel"){
                    producto.classList.toggle('hide');
                }
            }
        }
    }
    let button2 = form.firstElementChild.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling;
    button2.addEventListener("click",funcion20);
    function funcion20(){
        let producto;
        apply.addEventListener('click',funcionAplicar);
        function funcionAplicar(e){
            e.preventDefault();
            for (let i = 0; i<productsCPU.length; i++){
                producto = document.body.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.children[i];
                if(producto.lastChild.previousSibling.textContent === "marcaAMD"){
                    producto.classList.toggle('hide');
                }
            }
        }
    }
}
class Componente{
    constructor(name,price) {
        this.name = name;
        this.price = price
        this.disponibility = false;
        this.stock = 0;
    }
    disponibilities(){
        this.disponibility = true;
    }
    stocks(stock){
         this.stock = stock;
    }
}
const productsCPU = [
    {nameS: "Ryzen 7 3700x", price: 6500, marca: "AMD"},
    {nameS: "i5 9400F", price: 2500, marca: "Intel"},
    {nameS: "Ryzen 3 1200", price: 1100, marca: "AMD"},
    {nameS: "i7 7700K", price: 3000, marca: "Intel"},
    {nameS: "i9 9900KF", price: 5000, marca: "Intel"},
    {nameS: "Ryzen 5 2400g", price: 1800, marca: "AMD"},
    {nameS: "i5 10600K", price: 7635, marca: "Intel"},
    {nameS: "Ryzen 3 2200g", price: 1350, marca: "AMD"},
    {nameS: "i7 12700KF", price: 10000, marca: "Intel"},
    {nameS: "Ryzen 9 3900x", price: 9000, marca: "AMD"},
    {nameS: "i9 12900K", price: 30000, marca: "Intel"},
    {nameS: "Ryzen 5 3600", price: 2500, marca: "AMD"},
    {nameS: "Ryzen 5 5600x", price: 8000, marca: "AMD"},
    {nameS: "i5 12400F", price: 9000, marca: "Intel"},
    {nameS: "i3 9100F", price: 2000, marca: "Intel"},
    {nameS: "Ryzen 9 3990xt", price: 13370, marca: "AMD"},
    {nameS: "i9 12900F", price: 18000, marca: "Intel"}
]
let divProduct = document.getElementById("main-section-2");
let nameProduct = "";
let priceProduct2 = 0;
let componentArray2 = [];
let componentArray3 = [];
CPUS();
createComponents();

let section1 = document.getElementById('main-section-1'); 
let form = document.createElement('form');
form.innerHTML = `
<div>
<div class="category-main">
<label for="">AMD</label>
<input type="radio" name="asd" id="">
</div>
<div class="category-main">
<label for="">Intel</label>
<input type="radio" name="asd" id="">
</div>
<div class="category-main">
<label for="">Gabinetes</label>
<input type="radio" name="asd" id="">
</div>
<div class="category-main">
<label for="">Monitores</label>
<input type="radio" name="asd" id="">
</div>
<div class="category-main">
<label for="">Placas de Video</label>
<input type="radio" name="asd" id="">
</div>
<div class="category-main">
<label for="">Ram</label>
<input type="radio" name="asd" id="">
</div>
<div class="category-main">
<label for="">Discos</label>
<input type="radio" name="asd" id="">
</div>
<div class="category-main">
<label for="">Periféricos</label>
<input type="radio" name="asd" id=""">
</div>
<div class="div-a">
<button>APLICAR</button>
</div>
</div>
<div>
<div>
<label for="">Importe mínimo</label>
<input type="range" min="0" max="100000">
</div>
<div>
<label for="">Importe máximo</label>
<input type="range" min="50000" max="200000">
</div>
<div class="div-a">
<button>APLICAR</button>
</div>
</div>`
section1.append(form);
eliminarProducto(); //Ejecuta la función eliminarProducto, el cual, según si se presiona "AMD" o "Intel", se produce un cambio de eliminación de productos