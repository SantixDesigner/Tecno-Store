if (((sessionStorage.getItem('username') != null) && (sessionStorage.getItem('username') != "")) && (sessionStorage.getItem('password') != null) && (sessionStorage.getItem('password') != "")) {
    let inputSearch = document.getElementById('inputSearch');
    let search = document.getElementById('search');
    let searchS = "";
    let filter;
    inputSearch.addEventListener('input', (e) => { //Utiliza el buscador para filtrar elementos
        searchS = e.target.value;
        searchS = searchS.toUpperCase();
        if (minimumN == 0 && maximumN == 100000) {
            filter = componentesPC.filter(el => el.nameS.includes(searchS) || el.brand.includes(searchS));
            if (e.key == "Enter") {
                e.preventDefault();
                toRender(filter);
            }
        } else if (minimumN != 0 || maximumN != 100000) { //Si no es el rango estipulado, entonces busca segun este
            filter = componentesPC.filter(el => (el.nameS.includes(searchS) || el.brand.includes(searchS)) && el.price > minimumN && el.price < maximumN);
            if (e.key == "Enter") {
                e.preventDefault();
                toRender(filter);
            }
        }
    });
    search.addEventListener('click', (e) => {
        e.preventDefault();
        toRender(filter);
    }) //La diferencia con los del arriba es en el "buscar", se tiene que presionar para que empiece
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
    minimum.addEventListener('input', (e) => {
        minimumN = e.target.value;
        valueMinimum.value = minimumN;
        valueMinimum.innerHTML = `$${valueMinimum.value}`;
        minimumN = parseInt(minimumN);
    }); 
    maximum.addEventListener('input', (e) => {
        maximumN = e.target.value;
        valueMaximum.value = maximumN
        valueMaximum.innerHTML = `$${valueMaximum.value}`;
        maximumN = parseInt(maximumN);
    }) //El minimum y el maximum estipulan los rangos
    let importT = document.getElementById('import');
    importT.addEventListener('click', (e) => {
        e.preventDefault();
        if (eventA == "todas" || eventA == "" && searchS == eventA) {
            let filterPrice = componentesPC.filter(el => el.price > minimumN && el.price < maximumN);
            toRender(filterPrice);
        } //Si searchS y eventA son iguales, entonces que filtre exclusivamente por precio...
        else if (eventA != searchS) {
            let filterPrice = componentesPC.filter(el => (el.nameS.includes(searchS) || el.brand.includes(searchS)) && el.price > minimumN && el.price < maximumN);
            toRender(filterPrice);
        } //...Si no, por nombre de componentes
        else {
            let filterPrice = componentesPC.filter(el => el.price > minimumN && el.price < maximumN && el.brand.includes(eventA));
            toRender(filterPrice);
        } //y si no, que busque según la marca 
    })
    let header = document.getElementById('header-index');
    let username = document.createElement('p');
    let usernameN = sessionStorage.getItem('username');
    username.innerHTML = `¡Bienvenido ${usernameN}! Espero que disfrutes tu estadía aquí ^-^`;
    header.append(username);
    let shopping = document.getElementById('shopping');
    shopping.addEventListener('click', () => {
        document.querySelector('.main-section-3').classList.toggle('hide');
    })
    let form = document.getElementById('formCategory')
    const mainSection2 = document.querySelector("#main-section-2");
    const toRender = (products) => {
        let content = "";
        for (const element of products) {
            content +=
            `<div>
                <img src="${element.link}">
                <h2>${element.nameS}</h2>
                <span>Precio: </span>
                <span class="borderDel">u$d<span>${element.price}</span></span>
                <p class = "nodisplay">brand${element.brand}</p>
                <button class="buy" value="buy" data-id="${element.id}" data-name="${element.nameS}" data-price="${element.price}" data-link="${element.link}" data-brand="${element.brand}" data-cantity="${element.cantity}">Comprar</button>
            </div>`;
        } //Genera el render por defecto de los productos
        mainSection2.innerHTML = content;
    }
    let mainSection3 = document.getElementById('main-section-3');
    let cart = [];
    const buyS = (e) => {
        let product = new Product(e.target.dataset.id, e.target.dataset.name, e.target.dataset.price, e.target.dataset.brand, e.target.dataset.link, e.target.dataset.cantity);
        shopping.innerHTML = `${(cantityEntireZ + 1)}`;
        let toastContainer = document.getElementById('container-toast');
        let div = document.createElement('div');
        div.className = "separator-hide";
        setTimeout(() => {
            div.innerHTML = `<h2>Compra con éxito</h2>
            <p>Compraste ${e.target.dataset.name}</p>`;
            toastContainer.append(div);
            setTimeout(() => {
                div.classList.add("hide-separator");
                setTimeout(() => {
                    div.remove();
                }, 2000)
            }, 1500)
        }, 0)
        let encontrado = cart.findIndex(el => el.id == e.target.dataset.id);
        encontrado == -1 ? cart.push(product) : cart[encontrado].cantity++; //El index es igual a -1? Si es así, entonces pushea el producto al cart, si no, suma su cantidad en 1
        showCart(cart);
    } //Esto se reproduce cada vez que compramos un producto
    let entireZ = 0;
    let cantityEntireZ = 0;
    const reSearch = () => {
        let entire = 0;
        let cantityEntire = 0;
        cart.forEach(el => entire += (el.price * el.cantity));
        cart.forEach(cant => cantityEntire += parseInt(cant.cantity));
        entireZ = entire;
        cantityEntireZ = cantityEntire;
    } //rebusca los componentes cada vez que se inicia nuevamente la página
    const showCart = (cartS) => {
        let mainSectionHTML = ``;
        for (const productsCart of cartS) {
            let content = `
            <div>
                <img src="${productsCart.link}">
                <h2>${productsCart.nameS}</h2>
                <span>Precio: </span>
                <span class="borderDel">u$d<span>${productsCart.price * productsCart.cantity}</span></span>
                <p>Cantidad: ${productsCart.cantity}</p>
                <p class = "nodisplay">brand${productsCart.brand}</p>
                <button id = "btn${productsCart.id}" data-id="${productsCart.id}" class="boton_de_eliminar">ELIMINAR</button>
            </div>`;
            mainSectionHTML += content;
        } //Muestra los componentes, agregándolos al mainSectionHTML
        localStorage.setItem("cart", JSON.stringify(cart));
        mainSection3.innerHTML = mainSectionHTML;
        reSearch();
        let separador = document.createElement('div');
        separador.innerHTML = `
        <p>Precio Total: $${entireZ}</p>
        <p>Cantidad Total: ${cantityEntireZ}</p>
        <li><a href="./compra.html" id = "comprarTodo">Comprar todo</a></li>`;
        mainSection3.append(separador);
    } //Agrega el precio, la cantidad total y un boton para comprar todo
    if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        showCart(cart);
    } //Si el localStorage no está vacío, entonces el cart es el equivalente al localStorage
    mainSection3.addEventListener('click', (e) => {
        if (e.target !== document.getElementById('main-section-3') && e.target !== document.getElementById('comprarTodo')) {
            let searchProperties = cart.filter(el => el.id == e.target.dataset.id);
            entireZ -= searchProperties[0].price * searchProperties[0].cantity;
            cantityEntireZ -= searchProperties[0].cantity;
            shopping.innerHTML = `${parseInt(cantityEntireZ)}`;
            delProduct(e.target.dataset.id);
        }
    }) //Si el e.target es distinto de cualquier otro lado del mainSection3 que no sean los productos, no arroja error.
    const buying = (mainSection2) => {
        mainSection2.addEventListener('click', (e) => {
            e.target.value == "buy" ? buyS(e) : null;
        })
    } //Esto genera que se reproduzca el buyS cada que se compra un nuevo producto
    const delProduct = (id) => {
        let encontrarIndex = cart.findIndex(item => item.id == id);
        cart.splice(encontrarIndex, 1);
        showCart(cart);
    } //Esto elimina el producto correspondiente
    let eventA = "";
    toRender(componentesPC);
    buying(mainSection2); //Parámetros por defecto
    const btnSelect = document.getElementById('boton');
    form.addEventListener('click', (event) => {
        btnSelect.addEventListener('click', (e) => {
            e.preventDefault();
            eventA = event.target.value;
            searchS = eventA;
            event.target.value == "todas" ? brandTodas() : otherBrand(event);
        });
    }) //Filtrado por input
    const brandTodas = () => {
        toRender(componentesPC);
    } 
    const otherBrand = e => {
        let filterList = componentesPC.filter(el => el.brand == e.target.value);
        toRender(filterList);
    }
    shopping.innerHTML = `${cantityEntireZ}`; //Esto lo inicio al final del código porque cuando recargamos la página es necesario que muestre los productos de la última vez.
}

else {
    let main = document.getElementById('main');
    main.remove();
    let header = document.getElementById('header-index');
    let p = document.createElement('p');
    p.className = "NEEDUSER";
    p.innerHTML = `Vuelva atrás y digite un usuario y una contraseña`;
    header.append(p);
} //Si no hay usuario, sucede esto