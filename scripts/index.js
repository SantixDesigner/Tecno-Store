if (((sessionStorage.getItem('username') != null) && (sessionStorage.getItem('username') != "")) && (sessionStorage.getItem('password') != null) && (sessionStorage.getItem('password') != "")){
    let inputSearch = document.getElementById('inputSearch');
    let search = document.getElementById('search');
    let searchS = "";
    let filter;
    let main = document.getElementById('main');
    inputSearch.addEventListener('input',(e)=>{ //Utiliza el buscador para filtrar elementos
        searchS = e.target.value;
        console.log(searchS);
        searchS = searchS.toUpperCase();
        if (minimumN == 0 && maximumN == 100000){
            filter = productsCPU.filter(el => el.nameS.includes(searchS) || el.marca.includes(searchS));
            if (e.key == "Enter"){
                e.preventDefault();
                renderizar(filter);
            }
        } else if (minimumN != 0 || maximumN != 100000){ //Si no es el rango estipulado, entonces busca segun este
            filter = productsCPU.filter(el => (el.nameS.includes(searchS) || el.marca.includes(searchS)) && el.price > minimumN && el.price < maximumN);
            if (e.key == "Enter"){
                e.preventDefault();
                renderizar(filter);
            }
        }
    });
    search.addEventListener('click',(e)=>{
        e.preventDefault();
        renderizar(filter);
    }) //La diferencia con los del arriba es en el "buscar"
    let minimum = document.getElementById('minimum');
    let maximum = document.getElementById('maximum');
    let minimumN = 0;
    let maximumN = 100000;
    let valueMinimum = document.getElementById('valueMinimum');
    let valueMaximum = document.getElementById('valueMaximum'); //valores por defecto
    valueMinimum.value = minimumN;
    valueMaximum.value = maximumN;
    valueMinimum.innerHTML = `$${valueMinimum.value}`;
    valueMaximum.innerHTML = `$${valueMaximum.value}`;
    minimum.addEventListener('input',(e)=>{
        minimumN = e.target.value;
        valueMinimum.value = minimumN;
        valueMinimum.innerHTML = `$${valueMinimum.value}`;
        minimumN = parseInt(minimumN);
    });
    maximum.addEventListener('input',(e)=>{
        maximumN = e.target.value;
        valueMaximum.value = maximumN
        valueMaximum.innerHTML = `$${valueMaximum.value}`;
        maximumN = parseInt(maximumN);
    }) //El minimum y el maximum estipulan los rangos
    let importT = document.getElementById('import');
    importT.addEventListener('click',(e) =>{
        e.preventDefault();
        if ((eventA == "todas" || eventA == "" && searchS == eventA)){
            let filterPrice = productsCPU.filter(el=>el.price > minimumN && el.price < maximumN);
            renderizar(filterPrice);
        }
        else if (searchS != eventA){
            let filterPrice = productsCPU.filter(el => (el.nameS.includes(searchS) || el.marca.includes(searchS) ) && el.price > minimumN && el.price < maximumN);
            console.log(searchS);
            renderizar(filterPrice);
        }
        else{
            let filterPrice = productsCPU.filter(el=> el.price > minimumN && el.price < maximumN && el.marca.includes(eventA));
            renderizar(filterPrice);
        } //toma 3 condicionales, si no se cumple, se procede al último
    })
    let subM = document.getElementById('subM');
    let nameX = document.getElementById('nameX');
    let surnameX = document.getElementById('surnameX');
    let email = document.getElementById('email');
    let dir = document.getElementById('dir');
    let header = document.getElementById('header-index');
    let username = document.createElement('p');
    let usernameN = sessionStorage.getItem('username');
    username.innerHTML = `¡Bienvenido ${usernameN}! Espero que disfrutes tu estadía aquí ^-^`;
    header.append(username);
    let shopping = document.getElementById('shopping');
    shopping.addEventListener('click',()=>{
        document.querySelector('.main-section-3').classList.toggle('hide');
    })
    let form = document.getElementById('formCategory')
    const mainSection2 = document.querySelector("#main-section-2");
    let additionPrice = 0;
    const productsCPU = [
        {id: 1, nameS: "RYZEN 7 3700X", price: 6500, marca: "AMD", link: "./assets/Ryzen7.jpeg"},
        {id: 2, nameS: "I5 9400F", price: 2500, marca: "INTEL", link: "./assets/i5-9400F.jpg"},
        {id: 3, nameS: "RYZEN 3 1200", price: 1100, marca: "AMD", link: "./assets/ryzenej.jpg"},
        {id: 4, nameS: "I7 7700K", price: 3000, marca: "INTEL", link: "./assets/intel.jpeg"},
        {id: 5, nameS: "I9 9900KF", price: 5000, marca: "INTEL", link: "./assets/i9-9900KF.jpg"},
        {id: 6, nameS: "RYZEN 5 2400G", price: 1800, marca: "AMD", link:"./assets/Ryzen5.jpeg"},
        {id: 7, nameS: "I5 10600K", price: 7635, marca: "INTEL", link: "./assets/i5-10400f.jpg"},
        {id: 8, nameS: "RYZEN 3 2200G", price: 1350, marca: "AMD", link:"./assets/ryzenej.jpg"},
        {id: 9, nameS: "I7 12700KF", price: 10000, marca: "INTEL", link: "./assets/i7-12700K.jpg"},
        {id: 10, nameS: "RYZEN 9 3900X", price: 9000, marca: "AMD", link:"./assets/Ryzen9.jpg"},
        {id: 11, nameS: "I9 12900K", price: 30000, marca: "INTEL", link: "./assets/i9-12900.jpeg"},
        {id: 12, nameS: "RYZEN 5 3600", price: 2500, marca: "AMD", link: "./assets/Ryzen5.jpeg"},
        {id: 13, nameS: "RYZEN 5 5600X", price: 8000, marca: "AMD", link: "./assets/Ryzen5.jpeg"},
        {id: 14, nameS: "I5 12400F", price: 9000, marca: "INTEL", link: "./assets/i5-12400F.jpeg"},
        {id: 15, nameS: "I3 9100F", price: 2000, marca: "INTEL", link: "./assets/i3-9100f.jpeg"},
        {id: 16, nameS: "RYZEN 9 3990XT", price: 13370, marca: "AMD", link: "./assets/Ryzen9.jpg"},
        {id: 17, nameS: "I9 12900F", price: 18000, marca: "INTEL", link: "./assets/i9-12900.jpeg"},
        {id: 18, nameS: "FUENTE GENÉRICA 500W", price: 5000, marca: "FUENTE", link:"./assets/500wgen.jpg"},
        {id: 19, nameS: "FUENTE EVGA 600W 80 PLUS BRONCE", price: 7500, marca: "FUENTE", link:"./assets/600wevga.png"},
        {id: 20, nameS: "FUENTE 750W CORSAIR 80 PLUS", price: 10000, marca: "FUENTE", link:"./assets/750w.jpg"},
        {id: 21, nameS: "FUENTE 1000W EVGA 80 PLUS", price: 12000, marca: "FUENTE", link:"./assets/1000wevga.jpg"},
        {id: 22, nameS: "MOTHER A320 AM4", price: 900, marca: "MOTHER", link:"./assets/a320.jpg"},
        {id: 23, nameS: "MOTHER ASUS B-550 AM4", price: 1300, marca: "MOTHER", link:"./assets/asus-b550.jpg"},
        {id: 24, nameS: "GABINETE ASUS", price: 3700, marca: "GABINETE", link:"./assets/asus.jpg"},
        {id: 25, nameS: "AURICULAR REDRAGON GAMER", price: 250, marca: "PERIFERICO", link:"./assets/auricular-redragon.jfif"},
        {id: 26, nameS: "MOTHER B250 AM4", price: 1100, marca: "MOTHER", link:"./assets/b250.jfif"},
        {id: 27, nameS: "DISPLAYPORT CABLE VERIFICADO", price: 300, marca: "ADICIONALES", link:"./assets/displayport.jpg"},
        {id: 28, nameS: "CABLE DVI PARA MONITORES ANTIGUOS", price: 100, marca: "ADICIONALES", link:"./assets/dvi.jpg"},
        {id: 29, nameS: "CABLE ETHERNET", price: 25, marca: "ADICIONALES", link:"./assets/ethernet.jpg"},
        {id: 30, nameS: "H61 6TA GEN INTEL", price: 650, marca: "MOTHER", link:"./assets/h61.png"},
        {id: 31, nameS: "H110 7MA GEN INTEL", price: 800, marca: "MOTHER", link:"./assets/h110.jfif"},
        {id: 32, nameS: "MOUSE G203 GAMER", price: 65, marca:"PERIFERICO", link:"./assets/g203-mouse.jpg"},
        {id: 33, nameS: "RAM HP GAMER", price: 90, marca:"RAM", link:"./assets/hp-ram.jpg"},
        {id: 34, nameS: "CABLE HDMI", price: 20, marca:"ADICIONALES", link:"./assets/hdmi.jpg"},
        {id: 35, nameS: "GABINETE KEDIERS GAMER ATX", price: 1500, marca:"GABINETE", link:"./assets/kediers-atx.jpg"},
        {id: 36, nameS: "KOTION EACH G9000 GAMER AURICULAR", price: 200, marca:"PERIFERICO", link:"./assets/KotionEachg9000.jpg"},
        {id: 37, nameS: "MONITOR DELL 27 PULGADAS", price: 300, marca:"MONITOR", link:"./assets/monitor-dell-27p.jpg"},
        {id: 38, nameS: "MONITOR 144HZ 1MS GAMER", price: 1000, marca:"MONITOR", link:"./assets/monitor-144hz-1ms.jpeg"},
        {id: 39, nameS: "MONITOR LED 60HZ 20 PULGADAS 5MS", price: 500, marca:"MONITOR", link:"./assets/monitor-led-60hz-5ms-lg.jpeg"},
        {id: 40, nameS: "MONITOR SAMSUNG CURVO GAMER", price: 2500, marca:"MONITOR", link:"./assets/monitor-samsung-curvo.jfif"},
        {id: 41, nameS: "MONITOR 19 PULGADAS SAMSUNG", price: 120, marca:"MONITOR", link:"./assets/monitor-samsung.jpeg"},
        {id: 42, nameS: "MOTHER ASUS B460 LGA1200", price: 235, marca:"MOTHER", link:"./assets/mother-asus-b460.png"},
        {id: 43, nameS: "TECLADO NKB GAMER", price: 200, marca:"PERIFERICO", link:"./assets/nkb.png"},
        {id: 44, nameS: "NOGA STORMER AURICULAR GAMER", price: 150, marca:"PERIFERICO", link:"./assets/noga-stormer.jpg"},
        {id: 45, nameS: "MOUSE OPTICO BOCA", price: 100000, marca:"PERIFERICO", link:"./assets/optico-boca.jpg"},
        {id: 46, nameS: "PARLANTE HP GAMER", price: 25, marca:"PERIFERICO", link:"./assets/parlante-hp.jpg"},
        {id: 47, nameS: "PLACA WIFI MOTHER", price: 50, marca:"ADICIONALES", link:"./assets/placa-wifi.jpg"},
        {id: 48, nameS: "COMBO RAZER GAMER TECLADO Y MOUSE", price: 1150, marca:"PERIFERICO", link:"./assets/razer-combo.jpeg"},
        {id: 49, nameS: "COMBO REDRAGON GAMER TECLADO Y MOUSE", price: 850, marca:"PERIFERICO", link:"./assets/redragon-combo.jpg"},
        {id: 50, nameS: "ROG STRIX GABINETE", price: 300, marca:"GABINETE", link:"./assets/rog-strix.jfif"},
        {id: 51, nameS: "ROG SWIFT 360HZ", price: 5000, marca:"MONITOR", link:"./assets/rog-swift-360hz.jpg"},
        {id: 52, nameS: "FUENTE 1200W ROG", price: 7500, marca:"FUENTE", link:"./assets/rog1200w.jpg"},
        {id: 53, nameS: "RTX 3060TI NVIDIA", price: 15000, marca:"PLACA DE VIDEO", link:"./assets/rtx-3060ti.jpg"},
        {id: 54, nameS: "RTX 3080TI NVIDIA", price: 25000, marca:"PLACA DE VIDEO", link:"./assets/rtx-3080ti.jpg"},
        {id: 55, nameS: "RTX 2060 NVIDIA", price: 5000, marca:"PLACA DE VIDEO", link:"./assets/rtx2060.jpg"},
        {id: 56, nameS: "RTX 2070TI", price: 7500, marca:"PLACA DE VIDEO", link:"./assets/rtx2070ti.jpg"},
        {id: 57, nameS: "RADEON RX 6600XT", price: 3500, marca:"PLACA DE VIDEO", link:"./assets/rx-6600xt.jpg"},
        {id: 58, nameS: "RADEON RX 6800XT", price: 7500, marca:"PLACA DE VIDEO", link:"./assets/rx-6800xt.jpg"},
        {id: 59, nameS: "MOTHER Z490 LGA1200", price: 500, marca:"MOTHER", link:"./assets/z490.png"},
        {id: 60, nameS: "MOTHER Z590 LGA1200", price: 900, marca:"MOTHER", link:"./assets/z590.png"},
        {id: 61, nameS: "XTRIKE ME MOUSE GAMER", price: 200, marca:"PERIFERICO", link:"./assets/Xtrike-me.jpg"},
        {id: 62, nameS: "YINDIAO TECLADO GAMER", price: 100, marca:"PERIFERICO", link:"./assets/yindiao-v4.jfif"},
        {id: 63, nameS: "MOTHER X570 AM3", price: 750, marca:"MOTHER", link:"./assets/x570.png"},
        {id: 64, nameS: "RAM VENGEANCE", price: 1000, marca:"RAM", link:"./assets/vengeance-ram.jpg"},
        {id: 65, nameS: "CABLE VGA", price: 10, marca:"ADICIONALES", link:"./assets/vga.jpg"},
        {id: 66, nameS: "THERMALTAKE V200 GABINETE GAMER", price: 775, marca:"GABINETE", link:"./assets/thermaltake-v200.jfif"},
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
    let cantityT = 0;
    let mainSection3 = document.getElementById('main-section-3');
    let mainSection4 = document.getElementById('main-section-4');
    let totalPrice = document.createElement('p');
    let buy = document.createElement('li'); 
    const buying = (mainSection2) =>{ 
        mainSection2.addEventListener('click',(e)=>{
            if (e.target.value == "buy"){
                let nombreProducto = e.target.parentElement.firstElementChild.nextElementSibling.innerHTML;
                e.preventDefault();
                mainSection4.append(e.target.parentElement);
                cantityT++;
                additionPrice += parseInt(e.target.previousElementSibling.previousElementSibling.firstElementChild.innerHTML);
                mainSection3.append(e.target.parentElement);
                let filter = productsCPU.filter(el => (el.nameS.includes(searchS) || el.marca.includes(searchS)) && el.price > minimumN && el.price < maximumN);
                renderizar(filter); //Esto renderiza nuevamente el arreglo para evitar que se vayan eliminando productos sin que el usuario lo haya querido
                mainSection3.lastElementChild.lastElementChild.remove();
                let ticketOfBuy = document.createElement('div');
                let toastContainer = document.querySelector('.container-toast');
                setTimeout(()=>{
                    ticketOfBuy.className = "separator-hide";
                    ticketOfBuy.innerHTML = `
                    <p class="tituloCompra">Gracias por comprar</p>
                    <p>Compraste: ${nombreProducto}</p>`;
                    toastContainer.append(ticketOfBuy);
                    main.append(toastContainer);
                    setTimeout(()=>{
                        ticketOfBuy.remove();
                    },3000);
                },1000) //Esto genera un ticket de compra
            }
            
            buy.className = "buy";
            buy.innerHTML = `<a href="#main-section-4">Comprar</a>`
            mainSection3.append(buy);
        })
        buy.addEventListener('click',(eventE) => {
            form.remove();
            mainSection2.remove();
            let cantity = document.createElement('p');
            cantity.innerHTML = `<p>Cantidad total de productos: ${cantityT}</p>`;
            mainSection4.append(cantity);
            shopping.classList.add('hideshopping');
            let div = document.getElementById('container');
            div.innerHTML = mainSection3.innerHTML;
            mainSection3.remove();
            totalPrice.className = "endPrice"
            totalPrice.innerHTML = `Total: u$d${additionPrice}`
            mainSection4.append(totalPrice);
            mainSection4.classList.remove('hide');
        })
    }
    let nameXs;
    let surnameXs;
    let emailX;
    let dirX;
    nameX.addEventListener('focusout',()=>{
        nameXs = nameX.value;
    })
    surnameX.addEventListener('focusout',()=>{
        surnameXs = surnameX.value;
    })
    email.addEventListener('focusout',()=>{
        emailX = email.value;
    })
    dir.addEventListener('focusout',() =>{
        dirX = dir.value;
    });
    subM.addEventListener('click',(e)=>{
        e.preventDefault();
        if (nameXs == null || nameXs == "" || surnameXs == null || surnameXs == "" || emailX == null || emailX == "" || emailX.includes('@') == false ||dirX == null || dirX == ""){
            alert("Le falta ingresar un dato");
        }else{
            alert(`Genial ${usernameN}, a la persona ${nameXs} ${surnameXs} le estaremos enviando información a ${emailX}, para enviar sus ${cantityT} productos a ${dirX}, gracias por confiar en nosotros!`);
        }
    })
    let eventA = "";
    renderizar(productsCPU);
    buying(mainSection2);
    const btnSelect = document.getElementById('boton');
    form.addEventListener ('click',(event) =>{
        btnSelect.addEventListener('click', (e) =>{
            e.preventDefault();
            eventA = event.target.value;
            searchS = eventA;
            if (event.target.value == "todas"){
                renderizar(productsCPU);
            }else{
                let filterList = productsCPU.filter(el => el.marca == event.target.value);
                renderizar(filterList);
            }
        });
    })
}
else{
    let main = document.getElementById('main');
    main.remove();
    let header = document.getElementById('header-index');
    let p = document.createElement('p');
    p.className = "NEEDUSER";
    p.innerHTML = `Vuelva atrás y digite un usuario y una contraseña`;
    header.append(p);
} //Si no hay usuario, sucede esto