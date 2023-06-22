const validarFormularioCategorias = () =>{
    const expresionNombre = /^[a-zA-ZñÑ]+ *[a-zA-ZñÑ]*$/
    const expresionDescripcion = /^\b[a-zA-ZñÑ]+(?:\s+\b[a-zA-ZñÑ]+)*\.?\b$/
    
    let errorNombre = '';
    let errorDescripcion = '';
    let errorEstado = '';

    const nombre = document.getElementById('nombre').value
    const descripcion = document.getElementById('descripcion').value
    const estado = document.getElementById('estado').value


    if(!expresionNombre.test(nombre)){
        errorNombre = 'El nombre debe contener unicamente letras'
    }
    if(nombre === ''){
        errorNombre = 'El nombre es necesario'
    }

    if(!expresionDescripcion.test(descripcion)){
        errorDescripcion = 'La descripción debe contener unicamente letras'
    }
    if(descripcion === ''){
        errorDescripcion = 'La descripción es necesaria'
    }

    if(estado === ''){
        errorEstado = 'Debe seleccionar un estado'
    }

    document.getElementById('nombreError').innerText = errorNombre
    document.getElementById('descripcionError').innerText = errorDescripcion
    document.getElementById('estadoError').innerText = errorEstado

    // Verificar si hay algún error en los campos
    if (errorNombre === '' && errorDescripcion === '' && errorEstado === '') {
        return true; // Validación exitosa
    } else {
        return false; // Validación fallida
    }
}


//url de la api.
//Al desplegarla en el servidor colocar la api del servidor
const url = 'http://localhost:8080/api/categoria'

const listarDatos = async() => {
    let respuesta = ''
    let body = document.getElementById('contenido')
    
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json()) //obtener respuesta y convertirla a json
    .then(function(data) {
        let listaCategorias = data.categorias
        return listaCategorias.map(function(categoria) {
            respuesta += `<tr><td>${categoria.nombre}</td>`+
                    `<td>${categoria.descripcion}</td>`+
                    `<td><div class="custom-control custom-switch text-center">
                    <input type="checkbox" class="custom-control-input" id="check${categoria.id}" ${categoria.estado ? 'checked' : ''}>
                    <label class="custom-control-label" for="check${categoria.id}"></label>
                    </div></td>`+
                    `<td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModal" onclick='editar(${JSON.stringify(categoria)})'>Editar</button> 
                    <button type="button" class="btn btn-danger" onclick='eliminar(${JSON.stringify(categoria)})'>Eliminar</button></td></tr>`
            body.innerHTML = respuesta

        })
    })
}

const registrar = async () => {

    let _nombre = document.getElementById('nombre').value
    let _descripcion = document.getElementById('descripcion').value
    let _estado = document.getElementById('estado').value

        let _categoria = {
            nombre: _nombre,
            descripcion: _descripcion,
            estado: _estado
        }
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(_categoria),//Convertir el objeto usuario a JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //obtener respuesta y convertirla a json
        .then(json => {
            console.log(json.msg)
            //alert(json.msg)//Mensaje que retorna la API
            Swal.fire(
                json.msg,
                '',
                'success'
              )
        })
}

const editar = (categoria) => {
    document.getElementById('nombre').value =''
    document.getElementById('descripcion').value =''
    document.getElementById('estado').value =''

    document.getElementById('nombre').value = categoria.nombre
    document.getElementById('descripcion').value = categoria.descripcion
    document.getElementById('estado').value = categoria.estado
}

const actualizar = async () => {

    let _nombre = document.getElementById('nombre').value
    let _descripcion = document.getElementById('descripcion').value
    let _estado = document.getElementById('estado').value

        let _categoria = {
            nombre: _nombre,
            descripcion: _descripcion,
            estado: _estado
        }
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(_categoria),//Convertir el objeto categoria a JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //obtener respuesta y convertirla a json
        .then(json => {
            Swal.fire(
                json.msg,
                '',
                'success'
              ).then(() => {
                    location.reload();//Para recargar la pagina
                });
        })
}

const eliminar = (id) => {
    Swal.fire({
        title: '¿Está seguro de eliminar la categoria?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let categoria = {
                _id: id
            };
            fetch(url, {
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify(categoria),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
            .then((resp) => resp.json())
            .then(json => {
                Swal.fire(
                    json.msg,//mensaje que retorna la API
                    '',
                    'success'
                ).then(() => {
                    location.reload();//Para recargar la pagina
                });
            });
        }
    });
};



//document.querySelector('#btnCrearCategoria').addEventListener('click', registrar)

if (document.querySelector('#btnCrearCategoria')) {
    document.querySelector('#btnCrearCategoria').addEventListener('click', () => {
        if (validarFormularioCategorias()) {
            registrar();
        }
    });
}

//document.querySelector('#btnActualizarCategoria').addEventListener('click', actualizar)

if (document.querySelector('#btnActualizarCategoria')) {
    document.querySelector('#btnActualizarCategoria').addEventListener('click', () => {
        if (validarFormularioCategorias()) {
            actualizar();
        }
    });
}


