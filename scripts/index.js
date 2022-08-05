import { Product } from './objects.js';
if (sessionStorage.getItem("username") && sessionStorage.getItem("password")) {
    let componentsPC = [];
    const componentsLoad = async() => {
        const response = await fetch('./scripts/data.json');
        componentsPC = await response.json();
        toRender(componentsPC);
    }
    componentsLoad();
    let header = document.getElementById('header-index');
    let username = document.createElement('p');
    let usernameN = sessionStorage.getItem('username');
    username.innerHTML = `¡Bienvenido ${usernameN}! Espero que disfrutes tu estadía aquí ^-^`;
    header.append(username);
    //Bienvenida
    let inputSearch = document.getElementById('inputSearch');
    let search = document.getElementById('search');
    let searchS = "";
    let filter;
    inputSearch.addEventListener('input', (e) => { //Utiliza el buscador para filtrar elementos
        searchS = e.target.value;
        searchS = searchS.toUpperCase();
        const valueDefault = () => {
            filter = componentsPC.filter(el => el.nameS.includes(searchS) || el.brand.includes(searchS));
            if (e.key == "Enter") {
                e.preventDefault();
                toRender(filter);
            }
        }
        const valueDifDefault = () => {
            filter = componentsPC.filter(el => (el.nameS.includes(searchS) || el.brand.includes(searchS)) && el.price > minimumN && el.price < maximumN);
            if (e.key == "Enter") {
                e.preventDefault();
                toRender(filter);
            }
        }
        minimumN == 0 && maximumN == 100000 ? valueDefault() : valueDifDefault();
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
    valueMinimum.innerHTML = `u$d${valueMinimum.value}`;
    valueMaximum.innerHTML = `u$d${valueMaximum.value}`;
    minimum.addEventListener('input', (e) => {
        minimumN = e.target.value;
        valueMinimum.value = minimumN;
        valueMinimum.innerHTML = `u$d${valueMinimum.value}`;
        minimumN = parseInt(minimumN);
    });
    maximum.addEventListener('input', (e) => {
        maximumN = e.target.value;
        valueMaximum.value = maximumN
        valueMaximum.innerHTML = `u$d${valueMaximum.value}`;
        maximumN = parseInt(maximumN);
    }) //El minimum y el maximum estipulan los rangos
    let importT = document.getElementById('import');
    importT.addEventListener('click', (e) => {
        e.preventDefault();
        if (eventA == "todas" || eventA == "" && searchS == eventA) {
            let filterPrice = componentsPC.filter(el => el.price > minimumN && el.price < maximumN);
            toRender(filterPrice);
        } //Si searchS y eventA son iguales, entonces que filtre exclusivamente por precio...
        else if (eventA != searchS) {
            let filterPrice = componentsPC.filter(el => (el.nameS.includes(searchS) || el.brand.includes(searchS)) && el.price > minimumN && el.price < maximumN);
            toRender(filterPrice);
        } //...Si no, por nombre de componentes
        else {
            let filterPrice = componentsPC.filter(el => el.price > minimumN && el.price < maximumN && (el.brand.includes(eventA) || el.nameS.includes(searchS)));
            toRender(filterPrice);
        } //y si no, que busque según la marca 
    })
    let mainSection3 = document.getElementById('main-section-3');
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
                <img src="${element.link}" alt="${element.nameS}">
                <h2>${element.nameS}</h2>
                <span>Precio: </span>
                <span class="borderDel">u$d<span>${element.price}</span></span>
                <p class = "nodisplay">brand${element.brand}</p>
                <button class="buy p-2" value="buy" data-id="${element.id}" data-name="${element.nameS.replaceAll(" ", "_")}" data-price="${element.price}" data-link="${element.link}" data-brand="${element.brand}" data-cantity="${element.cantity}">Comprar</button>
            </div>`; //El replaceAll con el fin de evitar errores
        } //Genera el render por defecto de los productos
        mainSection2.innerHTML = content;
    }
    let cart = [];
    const messageBuy = (product) => {
        let toastContainer = document.getElementById('container-toast');
        let div = document.createElement('div');
        div.className = "separator-hide";
        setTimeout(() => {
            div.innerHTML = `<h2>Compra con éxito</h2>
            <p>Agregaste un ${product.replaceAll("_", " ")} al carro de compras</p>`;
            toastContainer.append(div);
            setTimeout(() => {
                div.classList.add("hide-separator");
                setTimeout(() => {
                    div.remove();
                }, 2000)
            }, 1500)
        }, 0)
    }
    const buyS = (e) => {
        let product = new Product(e.target.dataset.id, e.target.dataset.name, e.target.dataset.price, e.target.dataset.brand, e.target.dataset.link, e.target.dataset.cantity);
        shopping.innerHTML = `${(cantityEntireZ + 1)}`;
        let found = cart.findIndex(el => el.id == e.target.dataset.id);
        found == -1 ? cart.push(product) : cart[found].cantity++; //El index es igual a -1? Si es así, entonces pushea el producto al cart, si no, suma su cantidad en 1
        messageBuy(e.target.dataset.name);
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
                <img src="${productsCart.link}" alt="${productsCart.nameS.replaceAll("_", " ")}">
                <h2>${productsCart.nameS.replaceAll("_", " ")}</h2>
                <span>Precio: </span>
                <span class="borderDel">u$d<span>${productsCart.price * productsCart.cantity}</span></span>
                <p>Cantidad: ${productsCart.cantity}</p>
                <p class = "nodisplay">brand${productsCart.brand}</p>
                <button id = "btn${productsCart.id}" data-id="${productsCart.id}" class="boton_de_eliminar">--</button>
                <button id = "btn${productsCart.id}" data-ids="${productsCart.id}" class="boton_de_eliminar">-</button>
                <button id = "btnAdd${productsCart.id}" data-ida="${productsCart.id}" class="boton_de_agregar">+</button>
            </div>`;
            mainSectionHTML += content;
        } //Muestra los componentes, agregándolos al mainSectionHTML
        localStorage.setItem("cart", JSON.stringify(cart));
        mainSection3.innerHTML = mainSectionHTML;
        reSearch(); //El reSearch averigua la cantidad de productos en el carrito.
        let separator = document.createElement('div');
        separator.innerHTML = `
        <p>Precio Total: u$d${entireZ}</p>
        <p>Cantidad Total: ${cantityEntireZ}</p>
        <li><a href="./compra.html" id = "comprarTodo">Comprar todo</a></li>`;
        mainSection3.append(separator);
    } //Agrega el precio, la cantidad total y un boton para comprar todo
    if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        showCart(cart);
    } //Si el localStorage no está vacío, entonces el cart es el equivalente al localStorage
    const removeProduct = (product) => {
        let toastContainer = document.getElementById('container-toast');
        let div = document.createElement('div');
        div.classList.add('separator-hide', 'red');
        setTimeout(() => {
            div.innerHTML = `<h2>Eliminaste con éxito</h2>
            <p>Eliminaste uno o varios de ${product.replaceAll("_", " ")}</p>`;
            toastContainer.append(div);
            setTimeout(() => {
                div.classList.add("hide-separator");
                setTimeout(() => {
                    div.remove();
                }, 2000)
            }, 1500)
        }, 0)
    }
    const addProduct = (id) => {
        cart.find(item => {
            if (item.id == id) {
                item.cantity++;
            }
        });
        let findProduct = cart.find(item => {
            if (item.id == id) {
                return item;
            }
        })
        messageBuy(findProduct.nameS);
        showCart(cart);
    } //Esto agrega un producto cada vez que se ejecuta
    const delOne = (id) => {
        let findProduct = cart.find(item => {
            if (item.id == id) {
                return item.nameS;
            }
        })
        removeProduct(findProduct.nameS);
        cart.filter(item => {
            if (item.id == id) {
                item.cantity--;
                if (item.cantity < 1) {
                    delProduct(id);
                }
            }
        })
        showCart(cart); //Esto elimina un producto cada que se ejecuta
    }
    const delProduct = (id) => {
        let product = cart.find(el => {
            if (el.id == id) {
                return el.nameS;
            }
        });
        product = product.nameS;
        let findIndex = cart.findIndex(item => item.id == id);
        cart.splice(findIndex, 1);
        showCart(cart);
        removeProduct(product);
    } //Esto elimina el producto correspondiente DE FORMA DIRECTA
    mainSection3.addEventListener('click', (e) => {
        if (e.target !== document.getElementById('main-section-3') && e.target !== document.getElementById('comprarTodo')) {
            if (e.target.dataset.id) {
                let searchProperties = cart.filter(el => el.id == e.target.dataset.id);
                entireZ -= searchProperties[0].price * searchProperties[0].cantity;
                cantityEntireZ -= searchProperties[0].cantity;
                shopping.innerHTML = `${parseInt(cantityEntireZ)}`;
                delProduct(e.target.dataset.id);
            }
            if (e.target.dataset.ida) {
                let searchProperties = cart.filter(el => el.id == e.target.dataset.ida);
                entireZ += searchProperties[0].price;
                cantityEntireZ++;
                shopping.innerHTML = `${parseInt(cantityEntireZ)}`;
                addProduct(e.target.dataset.ida);
            }
            if (e.target.dataset.ids) {
                let searchProperties = cart.filter(el => el.id == e.target.dataset.ids);
                entireZ -= searchProperties[0].price;
                cantityEntireZ--;
                shopping.innerHTML = `${parseInt(cantityEntireZ)}`;
                delOne(e.target.dataset.ids);
            }
        }
    }) //Si el e.target es distinto de cualquier otro lado del mainSection3 que no sean los productos, no arroja error.
    const buying = (mainSection2) => {
        mainSection2.addEventListener('click', (e) => {
            e.target.value == "buy" ? buyS(e) : null;
        })
    } //Esto genera que se reproduzca el buyS cada que se compra un nuevo producto
    let eventA = "";
    buying(mainSection2); //Parámetros por defecto
    const btnSelect = document.getElementById('boton');
    form.addEventListener('click', (event) => {
        btnSelect.addEventListener('click', (e) => {
            e.preventDefault();
            if (event.target.value){
                eventA = event.target.value;
                searchS = eventA;
            }
            event.target.value == "todas" ? brandAll() : otherBrand(event);
        });
    }) //Filtrado por input
    const brandAll = () => {
        if (componentsPC.length > 0) {
            toRender(componentsPC);
        }
    }
    const otherBrand = e => {
        let filterList = componentsPC.filter(el => el.brand == e.target.value);
        if (filterList.length > 0){
            toRender(filterList);
        }
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