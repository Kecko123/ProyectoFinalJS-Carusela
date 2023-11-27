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
let inputPrecioMaximo = document.querySelector('.filtroInput');
let selectTipoProducto = document.querySelector('.filtroSelect');

function crearArticulo() {
    this.tipo = prompt('Ingrese el tipo del producto:');
    this.nombre = prompt('Ingrese el nombre del producto:');
    const precioString = prompt('Ingrese el precio del producto:');
    this.precio = parseFloat(precioString);
    this.descripcion = prompt('Ingrese la descripción del producto:');
    const nuevoArticulo = {
        tipo,
        nombre,
        precio,
        descripcion,
    };

    if (isNaN(this.precio)) {
        console.log('Ingresar un precio numerico porfavor');
        return;
    } else {
        articulos.push(nuevoArticulo);
    }

}


function verCatalogo() {
    for (let i = 0; i < articulos.length; i += 1)
        console.log(articulos[i])
}

function filtrarProductos() {
    const item = prompt("Ingrese que tipo de articulo desea")

    const articulosFiltrados = articulos.filter(articulo => articulo.tipo === item)

    console.log('Los productos que coinciden con su busqueda son:', articulosFiltrados);
}

function filtrarPrecio() {
    const precioMaximo = parseFloat(inputPrecioMaximo.value) || Infinity;;

    if (isNaN(precioMaximo)) {
        console.log('Por favor, ingrese un número válido.');
        return;
    }

    const preciosFiltrados = articulos.filter(producto => producto.precio <= precioMaximo);

    console.log('Productos con precio igual o inferior a $' + precioMaximo + ':', preciosFiltrados);
}







document.addEventListener('DOMContentLoaded', function () {
    
    

    // Escucha eventos de cambio en el select y el input
    selectTipoProducto.addEventListener('change', actualizarFiltro);
    inputPrecioMaximo.addEventListener('input', actualizarFiltro);

    function actualizarFiltro() {
        let tipoSeleccionado = selectTipoProducto.value;
        let precioMaximo = parseFloat(inputPrecioMaximo.value) || Infinity;

        let productos = document.querySelectorAll('.cardsUnfiltered');
        

        productos.forEach(function (producto) {
            let precioProducto = parseFloat(producto.getAttribute('data-precio')) || 0;

            // Aplica el filtro de tipo y precio
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









// crearArticulo();

// verCatalogo()
// console.log(filtrarTazas)
// console.log(filtrarPrendas)
