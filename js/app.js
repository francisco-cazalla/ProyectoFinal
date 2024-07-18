//Variable que mantiene el estado visible del carrito
var carritoVisible = false;

//Espermos que todos los elementos de la pàgina cargen para ejecutar el script
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    
    //Agregremos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }

    //Agrego funcionalidad al boton sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i<botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

     //Agrego funcionalidad al buton restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0;i<botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    //Agregamos funcionalidad al boton Agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    //Agregamos funcionalidad al botón comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',() => {
        Swal.fire({
            title: "compra",
            text: "la compra se realizo con exito",
            icon: "success",
        imageUrl: "../img/hand-2825166_1920.jpg",
        background: "black",
        color: "white"
        }) 
    })
}
//Eliminamos todos los elementos del carrito y lo ocultamos
function pagarClicked(){
    alert("Gracias por la compra");
    //Elimino todos los elmentos del carrito
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}
//Funciòn que controla el boton clickeado de agregar al carrito
function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    hacerVisibleCarrito();
}

//Funcion que hace visible el carrito
function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items =document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

//Funciòn que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //controlamos que el item que intenta ingresar no se encuentre en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0;i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            Swal.fire({title:"El item ya se encuentra en el carrito"});
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Agregamos la funcionalidad eliminar al nuevo item
     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Agregmos al funcionalidad restar cantidad del nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

    //Agregamos la funcionalidad sumar cantidad del nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    //Actualizamos total
    actualizarTotalCarrito();
}
//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del carrito
    actualizarTotalCarrito();

    //la siguiente funciòn controla si hay elementos en el carrito
    //Si no hay elimino el carrito
    ocultarCarrito();
}
//Funciòn que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
    
        var items =document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}
//Actualizamos el total de Carrito
function actualizarTotalCarrito(){
    //seleccionamos el contenedor carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;
    //recorremos cada elemento del carrito para actualizar el total
    for(var i=0; i< carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        //quitamos el simobolo peso y el punto de milesimos.
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        console.log(precio);
        var cantidad = cantidadItem.value;
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100)/100;

    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$'+total.toLocaleString("es") + ",00";

}

document.addEventListener('DOMContentLoaded', () => {
    // Array de objetos que representa los productos
    const productos = [
        { titulo: "GUITARRA ELÉCTRICA FENDER STRATOCAS", precio: 2158444, imagen: "../img/L46833000001000-02-2000x2000.webp" },
        { titulo: "GUITARRA ELÉCTRICA GIBSON LES PAUL", precio: 3859884, imagen: "../img/gibson-les-paul-signature-120-anniversary.jpg" },
        { titulo: "Guitarra electrica Parquer", precio: 650000, imagen: "../img/NEWG110OPBKFull.png" },
        { titulo: "Guitarra Electrica js450", precio: 1800000, imagen: "../img/jet js450.webp" },
        { titulo: "Guitarra Electrica Sx vintage", precio: 320000, imagen: "../img/sx vintage series.png" },
        { titulo: "Guitarra Electrica Strato Cort", precio: 2225500, imagen: "../img/strato cort g110.jpg" },
        { titulo: "Guitarra Electrica kepooman", precio: 3400000, imagen: "../img/6424f23ffa52001ea648a62b-kepooman-gst-e-electric-guitar-beginner.jpg" },
        { titulo: "Guitarra Electro acustica Scorpion", precio: 1250000, imagen: "../img/natural scorpion.jpg" },
        { titulo: "Guitarra Electroacustica Breedlove", precio: 800800, imagen: "../img/guitarra-electroacustica-breedlove-con-corte-y-equalizador-dsc11-ce.jpg" },
        { titulo: "Guitarra Electroacustica cordoba stage", precio: 42800, imagen: "../img/cordoba stage.jpg" },
        { titulo: "Guitarra Electroacustica sonoran black", precio: 925500, imagen: "../img/sonoran-black1-bcd8521eacfebed9c016117589644630-1024-1024.jpg" },
        { titulo: "Guitarra Electroacustica ibanez aeg50", precio: 772876, imagen: "../img/ibanez aeg50.jpg" }
    ];

    // Contenedor de los productos
    const contenedorItems = document.getElementById('contenedor-items');

    // Generar los productos dinámicamente
    productos.forEach(producto => {
        // Crear el div del producto
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        // Crear el contenido HTML del producto
        itemDiv.innerHTML = `
            <span class="titulo-item">${producto.titulo}</span>
            <img src="${producto.imagen}" alt="${producto.titulo}" class="img-item">
            <span class="precio-item">$${producto.precio.toLocaleString()}</span>
            <button class="boton-item">Agregar al Carrito</button>
        `;

        // Agregar el div del producto al contenedor
        contenedorItems.appendChild(itemDiv);
    });
});

const productos = [
    {
        titulo: "Yamaha Stage Custom Birch",
        precio: 3558444,
        imagen: "../img/cuando-se-creo-la-bateria-acustica-1-scaled.webp"
    },
    {
        titulo: "Batería Acústica De 5 Cuerpos Yamaha",
        precio: 4794884,
        imagen: "../img/bateria-acustica-yamaha-stage-raven-black-de-5-cuerpos-con-bombo-22-sbp2f5rb.jpg"
    },
    {
        titulo: "Batería Acústica Premier Apk Stage 20",
        precio: 1650000,
        imagen: "../img/olympic-6195-bk-definitiva1-f5020d43cb7b0f78f915119482451099-1024-1024.jpg"
    },
    {
        titulo: "Set De Platillos Zildjian Planet",
        precio: 800000,
        imagen: "../img/set-de-platillos-zildjian-a-series-14-16-18-21.jpg"
    },
    {
        titulo: "Set De Platillos Para Batería Vansir 4",
        precio: 720000,
        imagen: "../img/1200.webp"
    },
    {
        titulo: "Palillo de Bateria Wincent Dynabea",
        precio: 55500,
        imagen: "../img/palillo-de-bateria-wincent-dynabeat-punta-madera-5b.webp"
    },
    {
        titulo: "Batería Acústica De 5 Cuerpos Yamaha",
        precio: 5400000,
        imagen: "../img/bateria-acustica-yamaha-stage-custom-bombo-20-sbp0f5ha.jpg"
    },
    {
        titulo: "Redoblante Mapex Maple 13 X 6 8",
        precio: 550000,
        imagen: "../img/mapex-mpbo4550frmb-redoblante.jpg"
    },
    {
        titulo: "Bateria Sonor Aqx Jazz Bombo",
        precio: 2800800,
        imagen: "../img/Pedal_Sonor_TECNICA-08.webp"
    },
    {
        titulo: "Alesis - Debut Kit",
        precio: 5420800,
        imagen: "../img/71aitMgk8kL.jpg"
    },
    {
        titulo: "Bateria Electronica Soundking Skd350",
        precio: 4925500,
        imagen: "../img/BEHRINGER-XD8USB-BATERIA-ELECTRICA-8-PIEZAS-.123-SONIDOS.webp"
    },
    {
        titulo: "Set Platillos Sabian Sbr5003",
        precio: 372876,
        imagen: "../img/877604-MLA53990679020_022023-F.jpg"
    }
];

const productos3 = [
    {
        titulo: "YAMAHA RT VOLIUM 3 T2-00",
        imagen: "../img/descarga.webp",
        precio: 455900
    },
    {
        titulo: "ORGANO MUSICAL MQ601",
        imagen: "../img/Organo-Teclado-Musical-MQ6101.jpg",
        precio: 859884
    },
    {
        titulo: "Piano Blanth BL-180 88 Teclas",
        imagen: "../img/piano-digital-88-teclas-portatil-blanth-bl-180.jpg",
        precio: 788000
    },
    {
        titulo: "YAMAHA PIAGGERO NP15B",
        imagen: "../img/teclado-np-yamaha-piaggero-np15b-61-teclas.jpg",
        precio: 1200000
    },
    {
        titulo: "ARTESIA21 MP422 -REDTAK",
        imagen: "../img/artesia21-f0734369ff5a2af97316749448564586-1024-1024.jpg",
        precio: 720000
    },
    {
        titulo: "Piano Rodflayt 56-Tokyo",
        imagen: "../img/images (1).jpg",
        precio: 1225500
    },
    {
        titulo: "Piano Digital Kurzweil",
        imagen: "../img/piano digital kurzweil.jpg",
        precio: 1235000
    },
    {
        titulo: "Teclado TMCDP-S160-CD",
        imagen: "../img/tmcdp-s160bk-casio-cdp-s-160-bk-41-e17254832630ef6aa916673371559935-1024-1024.jpg",
        precio: 850000
    },
    {
        titulo: "YAMAHA P125-T5-Red-Pak-78 Teclas",
        imagen: "../img/yamaha-p125.jpg",
        precio: 995800
    },
    {
        titulo: "CASIO CT S-200 Red-FFLI",
        imagen: "../img/casio ct s200.jpg",
        precio: 628800
    },
    {
        titulo: "Casiotone CT-S1 -Bag-20S",
        imagen: "../img/casiotone ct-s1.jpg",
        precio: 717500
    },
    {
        titulo: "Piano Nord 5-Vol Gota-4",
        imagen: "../img/piano nord 5.jpg",
        precio: 890876
    }
];



document.addEventListener("DOMContentLoaded", function() {
    const questions = document.querySelectorAll('.faq-question');

    questions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;

            
            if (answer.style.display === "block") {
                answer.style.display = "none";
            } else {
                answer.style.display = "block";
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        Swal.fire('Mensaje enviado correctamente!');
    });
});

