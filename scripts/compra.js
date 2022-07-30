let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);
if (cart == null){
    window.location.replace('./inicios.html');
}
let buyZ = document.getElementById('onlyMain');
let endPrice = 0;
let cantity = 0;
let content = "";
for (const cartS of cart) {
    content += `
    <div>
        <img src="${cartS.link}">
        <p>${cartS.nameS.replaceAll("_"," ")}</p>
        <p>u$d${cartS.price * cartS.cantity}</p>
    </div>
    `
    endPrice += cartS.price * cartS.cantity;
    cantity += parseInt(cartS.cantity);
} //Impone todos los productos comprados
let total = document.createElement('div');
total.className = "total-cantity";
total.innerHTML = `
<p>El precio final con IVA es: u$d${Math.round(endPrice * 1.21)}</p>
<p>Productos totales: ${cantity}</p>`;
buyZ.innerHTML = content;
buyZ.append(total);
let installments = document.querySelectorAll('.installments');
for (let i = 0; i<installments.length; i++){
    installments[i].innerHTML = `Paga en ${installments[i].value} cuotas de u$d${Math.round((endPrice/parseInt(installments[i].value))*1.21)}`;
}
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
let installmen = document.getElementById('installmen');
buyZr.addEventListener('click', (e) => {
    e.preventDefault();
    if (nameX != "" && surnameX != "" && dirX != "" && mailX != "" && mailX.includes('@') && mailX.includes('.')) {
        Swal.fire({
            icon: "success",
            title: "La compra se hizo con éxito",
            text: "Has comprado " + cantity + " productos con éxito",
            text: `Se pagará en ${installmen.value} sin interés de u$d${Math.round((endPrice/installmen.value)*1.21)}`,
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