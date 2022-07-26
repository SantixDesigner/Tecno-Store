let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);
if (cart == null){
    window.location.replace('./inicios.html');
}
let buyZ = document.getElementById('onlyMain');
let precioFinal = 0;
let cantity = 0;
let content = "";
for (const cartS of cart) {
    content += `
    <div>
        <img src="${cartS.link}">
        <p>${cartS.nameS}</p>
        <p>$${cartS.price * cartS.cantity}</p>
    </div>
    `
    precioFinal += cartS.price * cartS.cantity;
    cantity += parseInt(cartS.cantity);
} //Impone todos los productos comprados
let total = document.createElement('div');
total.className = "total-cantity";
total.innerHTML = `
<p>El precio final con IVA es: u$d${Math.round(precioFinal * 1.21)}</p>
<p>Productos totales: ${cantity}</p>`;
buyZ.innerHTML = content;
buyZ.append(total);

let installments1 = document.getElementById('1installment');
let installments3 = document.getElementById('3installments');
let installments6 = document.getElementById('6installments');
let installments12 = document.getElementById('12installments');
let installments18 = document.getElementById('18installments');
let installments30 = document.getElementById('30installments');
installments1.innerHTML = `Paga en una cuota de u$d${Math.round((precioFinal) * 1.21)}`;
installments3.innerHTML = `Paga en 3 cuotas de u$d${(Math.round((precioFinal / 3) * 1.21))}`;
installments6.innerHTML = `Paga en 6 cuotas de u$d${(Math.round((precioFinal / 6) * 1.21))}`;
installments12.innerHTML = `Paga en 12 cuotas de u$d${(Math.round((precioFinal / 12) * 1.21))}`;
installments18.innerHTML = `Paga en 18 cuotas de u$d${(Math.round((precioFinal / 18) * 1.21))}`;
installments30.innerHTML = `Paga en 30 cuotas de u$d${(Math.round((precioFinal / 30) * 1.21))}`;

let namePerson = document.getElementById('namePerson');
let surname = document.getElementById('surnamePerson');
let dirPerson = document.getElementById('dirPerson');
let mailPerson = document.getElementById('mailPerson');

let nameX = ""
let surnameX = ""
let dirX = ""
let mailX = "";
namePerson.addEventListener('input', (e) => {
    nameX = e.target.value;
})
surname.addEventListener('input', (e) => {
    surnameX = e.target.value;
})
dirPerson.addEventListener('input', (e) => {
    dirX = e.target.value;
})
mailPerson.addEventListener('input', (e) => {
    mailX = e.target.value;
})
let buyZr = document.getElementById('buyZrS');
buyZr.addEventListener('click', (e) => {
    e.preventDefault();
    if (nameX != "" && surnameX != "" && dirX != "" && mailX != "" && mailX.includes('@') && mailX.includes('.')) {
        Swal.fire({
            icon: "success",
            title: "La compra se hizo con éxito",
            text: "Has comprado " + cantity + " productos con éxito",
            footer: `Le enviaremos los productos a la persona ${nameX} ${surnameX} en los próximos minutos a ${dirX}, con información a ${mailX}`,
        })
        localStorage.removeItem("cart");
        buyZ.remove();
    } //Remueve del localStorage los archivos con cart y remueve el onlyMain
    else {
        Swal.fire({
            icon: "error",
            title: "Hubo un error...",
            text: "Te falta ingresar uno o varios datos"
        })
    } //Si no se ingresan los datos bien, ocurre este error
})