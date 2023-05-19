const validarFormularioCliente = () =>{
    const expresionNumeroDocumento = /^[0-9]{5,15}$/
    const expresionNombre = /^[a-zA-ZñÑ]+ *[a-zA-ZñÑ]*$/
    const expresionCorreo = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
    const expresionDireccion = /^\b[a-zA-ZñÑ]+(?:\s+\b[a-zA-ZñÑ]+)*\.?\b$/
    const expresionCelular = /^[0-9]{10}$/
    
    let errorNumeroDocumento ='';
    let errorNombre = '';
    let errorCorreo = '';
    let errorDireccion = '';
    let errorCelular = '';

    const numeroDocumentoError = document.getElementById('NumeroDocumento').value
    const nombre = document.getElementById('nombre').value
    const correo = document.getElementById('correo').value
    const direccion = document.getElementById('direccion').value
    const celular = document.getElementById('celular').value


    if(!expresionNumeroDocumento.test(numeroDocumentoError)){
        errorNumeroDocumento = 'El numero de documento solo se podra ingresar numero sin puntos o signos'
    }

    if(!expresionNombre.test(nombre)){
        errorNombre = 'El nombre debe contener unicamente letras'
    }

    if(!expresionCorreo.test(correo)){
        errorCorreo = 'El correo debe llevar @ y terminar en .com'
    }

    if(!expresionDireccion.test(direccion)){
        errorDireccion = 'El precio debe contener unicamente números'
    }

    if(!expresionCelular.test(celular)){
        errorCelular = 'El numero de celular debe contener unicamente números'
    }

    document.getElementById('NumeroDocumentoError').innerText = errorNumeroDocumento
    document.getElementById('nombreError').innerText = errorNombre
    document.getElementById('correoError').innerText = errorCorreo
    document.getElementById('direccionError').innerText = errorDireccion
    document.getElementById('celularError').innerText = errorCelular
};

document.querySelector('#btnCrearCliente')
.addEventListener('click',() => validarFormularioCliente())