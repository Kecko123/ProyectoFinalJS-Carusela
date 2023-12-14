const carritoTabla = document.querySelector("#tablaCarrito tbody")
const vaciarCarrito = document.querySelector("#vaciar-carrito")
const carritoEntero = document.querySelector(".carritoDeCompras")
let carrito = []

function saveStorage() {
    localStorage.setItem('cart', JSON.stringify(carrito))
}

function displayCarritoHTML() {
    borrarViejos()
    carrito.forEach(producto => {
        const fila = document.createElement('tr')
        fila.innerHTML = `
        <td class="text-center borderSimple" ><img src="${producto.imagen}" class=" tableImg" width="100" /></td>
        <td class="text-center fontSizeVariable py-5 borderSimple tableText" > ${producto.nombre}</td>
        <td class="text-center fontSizeVariable py-5 borderSimple tableText" > ${producto.precio}</td>
        <td class="borderSimple text-center py-5">
            <a href="#" class="borrarProducto fs-3 tableText" data-id="${producto.id}">🗑</a>
        </td>
        `
        if (carritoTabla){
            carritoTabla.appendChild(fila)
        }else{

        }        
    })
    saveStorage()
}

function eliminarProducto(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('borrarProducto')) {
        const producto = evt.target.parentElement.parentElement
        const productoId = producto.querySelector("a").getAttribute("data-id")
        carrito = carrito.filter(producto => producto.id !== productoId)
        displayCarritoHTML()
    }
}

function limpiarCarrito() {
    while (carritoTabla.firstChild) {
        carritoTabla.removeChild(carritoTabla.firstChild)
    }
    carrito = []
    saveStorage()
}

function borrarViejos() {
    if(carritoTabla){
        while (carritoTabla.firstChild) {
            carritoTabla.removeChild(carritoTabla.firstChild)
        }
    } else{

    }
}

let inputPrecioMaximo = document.querySelector('.filtroInput');
let selectTipoProducto = document.querySelector('.filtroSelect');
document.addEventListener('DOMContentLoaded', function () {

    try {
        selectTipoProducto.addEventListener('change', actualizarFiltro);
        inputPrecioMaximo.addEventListener('input', actualizarFiltro);
    } catch (error) {

    }

    function actualizarFiltro() {
        let tipoSeleccionado = selectTipoProducto.value;
        let precioMaximo = parseFloat(inputPrecioMaximo.value) || Infinity;

        let productos = document.querySelectorAll('.cardsUnfiltered');


        productos.forEach(function (producto) {
            let precioProducto = parseFloat(producto.getAttribute('data-precio')) || 0;


            if ((tipoSeleccionado === 'Todos' || producto.classList.contains(tipoSeleccionado)) &&
                precioProducto <= precioMaximo) {
                producto.classList.add('visible');
                producto.classList.remove('hidden');
            } else {
                producto.classList.add('hidden');
                producto.classList.remove('visible');
            }
        });
    }

    const cartas = document.querySelectorAll(".cardsUnfiltered");

    for (const carta of cartas) {
        carta.addEventListener('click', agregarProducto);
    }

    function agregarProducto(evt) {
        const boton = evt.target;
        if (boton.tagName === 'A' && boton.classList.contains('btnAgregarAlCarrito')) {
            const nombre = boton.getAttribute('data-nombre');
            const precio = boton.getAttribute('data-precio');
            const imagen = boton.getAttribute('data-imagen');
            const id = boton.getAttribute("data-id")
            const producto = {
                nombre: nombre,
                precio: precio,
                imagen: imagen,
                id: id
            };

            carrito.push(producto);
            localStorage.setItem('cart', JSON.stringify(carrito));
            Toastify({
                text: `"Añadiste ${producto.nombre} al carrito!"`,
                duration: 2000,
                className: "info",
                style: {
                    background: "linear-gradient(to right, #ffd700, #ffff00)",
                    color: "black"
                }
            }).showToast();


            displayCarritoHTML()
            // console.log("Producto añadido al carrito:", producto);
        }
    }
    if(vaciarCarrito){
        vaciarCarrito.addEventListener("click", limpiarCarrito)
    }else{

    }
    if(carritoEntero){
        carritoEntero.addEventListener("click", eliminarProducto)
    }else{

    }
    
    
    carrito = JSON.parse(localStorage.getItem('cart')) || [];

    displayCarritoHTML()

});









