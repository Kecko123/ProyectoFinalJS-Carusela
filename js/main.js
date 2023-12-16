const carritoTabla = document.querySelector("#tablaCarrito tbody")
const vaciarCarrito = document.querySelector("#vaciar-carrito")
const completarCompra = document.querySelector("#completar-compra")
const carritoEntero = document.querySelector(".carritoDeCompras")
const totalPrecio = document.querySelector("#precioTotal")
const datosHarry = document.querySelector("#datosHarryPotter")
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
        <td class="text-center fontSizeVariable py-5 borderSimple tableText" >Precio: $${producto.precio}</td>
        <td class="borderSimple text-center py-5">
            <a href="#" class="borrarProducto fs-3 tableText" data-id="${producto.id}">🗑</a>
        </td>
        `
        if (carritoTabla) {
            carritoTabla.appendChild(fila)
        } else {

        }
    })
    actualizarPrecioTotal()
    saveStorage()
}
function actualizarPrecioTotal() {
    if (totalPrecio) {
        let precioInicial = 0;

        carrito.forEach(producto => {
            precioInicial += parseFloat(producto.precio);
        })
        totalPrecio.textContent = `Precio Total : $${precioInicial} `
    }
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
    actualizarPrecioTotal()
    saveStorage()
}

function borrarViejos() {
    if (carritoTabla) {
        while (carritoTabla.firstChild) {
            carritoTabla.removeChild(carritoTabla.firstChild)
        }
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
    if (vaciarCarrito) {
        vaciarCarrito.addEventListener("click", () => {
            Swal.fire({
                title: "Desea vaciar el carrito de compras?",
                icon: "question",
                iconColor: "gray",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "Cancelar",
                confirmButtonText: "Si, vaciar"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Su carrito ha sido vaciado!",
                        confirmButtonText: "Okay",
                        icon: "success"
                    });
                    limpiarCarrito()
                }
            });
        })
    }
    if (carritoEntero) {
        carritoEntero.addEventListener("click", eliminarProducto)
    }
    if (completarCompra) {
        completarCompra.addEventListener("click", () => {
            Swal.fire({
                title: "Desea completar su compra?",
                icon: "question",
                iconColor: "gray",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "Cancelar",
                confirmButtonText: "¡Completar!"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Compra realizada!",
                        text: "Su compra ha sido completada con exito :D",
                        confirmButtonText: "¡Genial!",
                        icon: "success"
                    });
                }
            });
        })
    }

    carrito = JSON.parse(localStorage.getItem('cart')) || [];

    displayCarritoHTML()
    const url = "https://harry-potter-api.onrender.com/info"

    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            const autora = data[0].contenido
            const titulo = data[1].contenido
            const antagonista = data[2].contenido
            const varitaHarry = data[3].contenido
            const antagonistaNombre= data[5].contenido
            const casas = data[6].contenido
            const varitaVoldemort = data[7].contenido

            datosHarry.innerHTML = `
            <ul>
            <li class="fs-4 listaDatos mb-4">La autora del libro se llama <strong>${autora}</strong>.</li>
            <li class="fs-4 listaDatos mb-4">El antagonista de la serie de libros y peliculas ${titulo} es <strong>${antagonista}</strong>. ${antagonistaNombre}.</li>
            <li class="fs-4 listaDatos mb-4">${varitaHarry}</li>
            <li class="fs-4 listaDatos mb-4">${varitaVoldemort}</li>
            <li class="fs-4 listaDatos mb-4">La varita que <strong>${antagonista}</strong> posee en la ultima entrega de la serie de peliculas, apodada "La varita de sauco" es una reliquia de la muerte y es también la varita del famoso mago y ex-director de Hogwarts Albus Dombuldore.</li>
            <li class="fs-4 listaDatos mb-4">${casas} Cada una de estas tiene a su fundador, <strong>Gryffindor</strong>, fundada por Godric Gryffindor; <strong>Hufflepuff</strong>, fundada por Helga Hufflepuff; <strong>Ravenclaw</strong>, fundada por Rowena Ravenclaw y <strong>Slytherin</strong>, fundada por Salazar Slytherin.</li>
            <li class="fs-4 listaDatos mb-4">En un inicio el protagonista, <strong>${titulo}</strong>, iba a ser seleccionado por el Sombrero Seleccionador, para la casa Slytherin, sin embargo al ver la preocupacion de ${titulo} lo terminó enviando a Gryffindor.</li>
            </ul>
            
            
            `
            // La varita de ${antagonista} era identica a la de ${titulo} es por eso que no podian matarse entre sí.
            console.log(data)
        })
        .catch((e) => console.log(e))

});









