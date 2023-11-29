const articulos = [
    {
        tipo: "Taza",
        nombre: "Taza De Gryffindor",
        precio: 3000,
        descripcion: "Taza de ceramica de la casa de Harry Potter Gryffindor con capacidad de 250Ml"
    },
    {
        tipo: "Taza",
        nombre: "Taza De Slytherin",
        precio: 3000,
        descripcion: "Taza de ceramica de la casa de Harry Potter Slytherin con capacidad de 250Ml"
    },
    {
        tipo: "Taza",
        nombre: "Taza De Hufflepuff",
        precio: 3000,
        descripcion: "Taza de ceramica de la casa de Harry Potter Hufflepuff con capacidad de 250Ml"
    },
    {
        tipo: "Taza",
        nombre: "Taza De Ravenclaw",
        precio: 3000,
        descripcion: "Taza de ceramica de la casa de Harry Potter Ravenclaw con capacidad de 250Ml"
    },
    {
        tipo: "Prenda",
        nombre: "Remera de Gryffindor",
        precio: 7000,
        descripcion: "Remera hecha 100% de algodon con el logo de Gryffindor",
    },
    {
        tipo: "Prenda",
        nombre: "Remera de Slytherin",
        precio: 7000,
        descripcion: "Remera hecha 100% de algodon con el logo de Slytherin",
    },
    {
        tipo: "Prenda",
        nombre: "Remera de Hufflepuff",
        precio: 7000,
        descripcion: "Remera hecha 100% de algodon con el logo de Hufflepuff",
    },
    {
        tipo: "Prenda",
        nombre: "Remera de Ravenclaw",
        precio: 7000,
        descripcion: "Remera hecha 100% de algodon con el logo de Ravenclaw",
    },
    {
        tipo: "Decoracion",
        nombre: "Snitch Dorada",
        precio: 2300,
        descripcion: "Una snitch dorada de harry potter de 10cm de longitud, perfecta para decoración"
    },
    {
        tipo: "Varita",
        nombre: "Varita de Saúco",
        precio: 6500,
        descripcion: "Varita de sauco, tambien llamada la varita mas poderosa del mundo, perteneció a Dumbledor, y es una de las 3 reliquias de la muerte"
    },
    {
        tipo: "Accesorio",
        nombre: "Colgante de las reliquias de la muerte",
        precio: 2500,
        descripcion: "Un collar con el simbolo de las reliquias de la muerte en él"
    },
    {
        tipo: "Accesorio",
        nombre: "Pendientes de las reliquias de la muerte",
        precio: 1500,
        descripcion: "Dos pendientes con el simbolo de las reliquias de la muerte"
    },
]

const carrito = []



const cartas = document.querySelectorAll(".card")

for (const carta of cartas) {
    carta.addEventListener('click', (evt)=> {
        agregarProducto(evt)
    });
  }
function agregarProducto(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains("btnAgregarAlCarrito")) {
    const productoNombre = document.querySelector("body > main > div > div > div:nth-child(1) > div > div > h5");
    const productoPrecio = document.querySelector("body > main > div > div > div:nth-child(1) > div > div > p.text-center.card-text.fs-5.precioProducto")
    const productoImagen = document.querySelector("body > main > div > div > div:nth-child(1) > div > img")
    console.log(productoNombre.textContent);
    console.log(productoPrecio.textContent);
    console.log(productoImagen.src);
    }
  }


let inputPrecioMaximo = document.querySelector('.filtroInput');
let selectTipoProducto = document.querySelector('.filtroSelect');

document.addEventListener('DOMContentLoaded', function () {
    selectTipoProducto.addEventListener('change', actualizarFiltro);
    inputPrecioMaximo.addEventListener('input', actualizarFiltro);

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
});









