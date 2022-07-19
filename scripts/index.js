if (((sessionStorage.getItem('username') != null) && (sessionStorage.getItem('username') != "")) && (sessionStorage.getItem('password') != null) && (sessionStorage.getItem('password') != "")){
    let carrito = document.getElementById('carrito');
    carrito.addEventListener('click',()=>{
        document.querySelector('.main-section-3').classList.toggle('hide');
    })
    let form = document.createElement('form');
    form.innerHTML = `
    <div id="categorias">
        <div>
            <label>Todos</label>
            <input class="todas" type="radio" value="todas" name="asd">
        </div>
        <div>
            <label>AMD</label>
            <input class="AMD" type="radio" value="AMD" name="asd">
        </div>
        <div>
            <label>Intel</label>
            <input class="Intel" type="radio" value="Intel" name="asd">
        </div>
    </div>
    <div>
    <button id="boton">APLICAR</button>
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
    </div>
    <div>
    <button>APLICAR</button>
    </div>`
    const mainSection1 = document.getElementById('main-section-1');
    mainSection1.append(form);
    const mainSection2 = document.querySelector("#main-section-2");
    let additionPrice = 0;
    const productsCPU = [
        {id: 1, nameS: "Ryzen 7 3700x", price: 6500, marca: "AMD", link: "./assets/ryzenej.jpg"},
        {id: 2, nameS: "i5 9400F", price: 2500, marca: "Intel", link: "./assets/intel.jpeg"},
        {id: 3, nameS: "Ryzen 3 1200", price: 1100, marca: "AMD", link: "./assets/ryzenej.jpg"},
        {id: 4, nameS: "i7 7700K", price: 3000, marca: "Intel", link: "./assets/intel.jpeg"},
        {id: 5, nameS: "i9 9900KF", price: 5000, marca: "Intel", link: "./assets/intel.jpeg"},
        {id: 6, nameS: "Ryzen 5 2400g", price: 1800, marca: "AMD", link:"./assets/ryzenej.jpg"},
        {id: 7, nameS: "i5 10600K", price: 7635, marca: "Intel", link: "./assets/intel.jpeg"},
        {id: 8, nameS: "Ryzen 3 2200g", price: 1350, marca: "AMD", link:"./assets/ryzenej.jpg"},
        {id: 9, nameS: "i7 12700KF", price: 10000, marca: "Intel", link: "./assets/intel.jpeg"},
        {id: 10, nameS: "Ryzen 9 3900x", price: 9000, marca: "AMD", link:"./assets/ryzenej.jpg"},
        {id: 11, nameS: "i9 12900K", price: 30000, marca: "Intel", link: "./assets/intel.jpeg"},
        {id: 12, nameS: "Ryzen 5 3600", price: 2500, marca: "AMD", link: "./assets/ryzenej.jpg"},
        {id: 13, nameS: "Ryzen 5 5600x", price: 8000, marca: "AMD", link: "./assets/ryzenej.jpg"},
        {id: 14, nameS: "i5 12400F", price: 9000, marca: "Intel", link: "./assets/intel.jpeg"},
        {id: 15, nameS: "i3 9100F", price: 2000, marca: "Intel", link: "./assets/intel.jpeg"},
        {id: 16, nameS: "Ryzen 9 3990xt", price: 13370, marca: "AMD", link: "./assets/ryzenej.jpg"},
        {id: 17, nameS: "i9 12900F", price: 18000, marca: "Intel", link: "./assets/intel.jpeg"}
    ]
    const renderizar = (productos) =>{
        let contenido = "";
        for (const elemento of productos){
            contenido += 
            `<div>
            <img src="${elemento.link}">
            <h2>${elemento.nameS}</h2>
            <span>Precio: </span>
            <span class="borderDel">u$d<span>${elemento.price}</span></span>
            <p class = "nodisplay">marca${elemento.marca}</p>
            <button class="buy" value="buy">Comprar</button>
            </div>`;
        }
        mainSection2.innerHTML = contenido;
    }
    let array = [];
    let cantidad = document.createElement('p');
    let cantidadT = 0;
    let mainSection3 = document.getElementById('main-section-3');
    let mainSection4 = document.getElementById('main-section-4');
    let total = document.createElement('p');
    let comprar = document.createElement('li');
    const buying = (mainSection2) =>{
        mainSection2.addEventListener('click',(e)=>{
            if (e.target.value == "buy"){
                e.preventDefault();
                mainSection4.append(e.target.parentElement);
                cantidadT++;
                additionPrice += parseInt(e.target.previousElementSibling.previousElementSibling.firstElementChild.innerHTML);
                console.log(additionPrice);
                mainSection3.append(e.target.parentElement);
                console.log(mainSection3);
                if ((eventA == "todas")||(eventA=="")){
                    renderizar(productsCPU);
                    } else{
                        let listaFiltrada = productsCPU.filter(el => el.marca == eventA);
                        renderizar(listaFiltrada);
                    }
                    array.push(e.target.parentElement.children);
                    console.log(array);
                    mainSection3.append(e.target.parentElement);
                    mainSection3.lastElementChild.lastElementChild.remove();
            }
            
            comprar.className = "comprar";
            comprar.innerHTML = `<a href="#main-section-4">Comprar</a>`
            mainSection3.append(comprar);
        })
        comprar.addEventListener('click',(eventE) => {
            let cantity = document.createElement('p');
            cantity.innerHTML = `<p>Cantidad total de productos: ${cantidadT}</p>`;
            mainSection4.append(cantity);
            let carrito = document.getElementById('carrito');
            carrito.classList.add('hidecarrito');
            let div = document.getElementById('container');
            div.innerHTML = mainSection3.innerHTML
            mainSection3.remove();
            total.className = "endPrice"
            total.innerHTML = `Total: u$d${additionPrice}`
            mainSection4.append(total);
            mainSection4.classList.remove('hide');
        })
    }
    let eventA = "";
    renderizar(productsCPU);
    buying(mainSection2);
    const btnSelect = document.getElementById('boton');
    form.addEventListener ('click',(event) =>{
        console.log(event.target.value);
        btnSelect.addEventListener('click', (e) =>{
            e.preventDefault();
            eventA = event.target.value;
            if (event.target.value == "todas"){
                renderizar(productsCPU);
            }else{
                let listaFiltrada = productsCPU.filter(el => el.marca == event.target.value);
                renderizar(listaFiltrada);
            }
        });
    })
}
else{
    let main = document.getElementById('main');
    main.remove();
    let p = document.createElement('p');
    p.className = "NEEDUSER";
    p.innerHTML = `Vuelve atrás e ingresa un usuario y una contraseña`;
    let header = document.getElementById('header');
    header.append(p);
}