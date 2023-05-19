const validarPedido = () => {
    const expresionNombCliente = /^[a-zA-Z]+ *[a-zA-Z]*$/;
    const expresionProducto = /^[a-zA-Z]+ *[a-zA-Z]*$/;
    const expresionCantidad = /^[0-9]{1,10}$/;
    const expresionPrecio = /^[0-9]{1,10}$/;  
    const expresionFechaEntrega = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/;



    const nombCliente = document.getElementById('NombCliente').value;
    const producto = document.getElementById('Producto').value;
    const cantidad = document.getElementById('Cantidad').value;
    const precio = document.getElementById('Precio').value;
    const fechaEntrega = document.getElementById('FechaEntrega').value;
    let erroresPedido =' ';

    if(!expresionNombCliente.test(nombCliente)){
        erroresPedido += 'Ingresar solo letras en el Nombre.<br>'; 
    }
    if(!expresionProducto.test(producto)){
        erroresPedido += 'Ingresar solo letras en el Producto.<br>'; 
    }
    if(!expresionCantidad.test(cantidad)){
        erroresPedido += 'Ingresar solo números en la Cantidad.<br>'; 
    }
    if(!expresionPrecio.test(precio)){
        erroresPedido += 'Ingresar solo números en el precio.<br>';
    }
    if(!expresionFechaEntrega.test(fechaEntrega)){
        erroresPedido += 'Ingresar fecha con el formulario dd/mes/año.<br>';
    }

    const alertElement = document.getElementById("erroresPedidos")


    if (erroresPedido.length > 0){
        alertElement.style.display = "block";
        alertElement.innerHTML = erroresPedido;
    }else{
        alertElement.style.display = "none";
    }
}

document.querySelector('#btnRegistrarPedido')
.addEventListener('click' , () => validarPedido());