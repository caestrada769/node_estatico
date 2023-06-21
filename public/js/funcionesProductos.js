const validarFormularioProductos = () =>{
    const expresionNombre = /^[a-zA-ZñÑ]+ *[a-zA-ZñÑ]*$/
    const expresionDescripcion = /^\b[a-zA-ZñÑ]+(?:\s+\b[a-zA-ZñÑ]+)*\.?\b$/
    const expresionPrecio = /^[0-9]{4,15}$/
    
    let errorNombre = '';
    let errorCategoria = '';
    let errorDescripcion = '';
    let errorPrecio = '';
    let errorEstado = '';

    const nombre = document.getElementById('nombre').value
    const categoria = document.getElementById('categoria').value
    const descripcion = document.getElementById('descripcion').value
    const precio = document.getElementById('precio').value
    const estado = document.getElementById('estado').value
    console.log(precio)

    if(!expresionNombre.test(nombre)){
        errorNombre = 'El nombre debe contener unicamente letras'
    }
    if(nombre === ''){
        errorNombre = 'El nombre es necesario'
    }

    if(categoria === ''){
        errorCategoria = 'Debe seleccionar una categoria'
    }

    if(!expresionDescripcion.test(descripcion)){
        errorDescripcion = 'La descripción debe contener unicamente letras'
    }
    if(descripcion === ''){
        errorDescripcion = 'La descripción es necesaria'
    }

    if(!expresionPrecio.test(precio)){
        errorPrecio = 'El precio debe contener unicamente números'
    }
    if (precio === '') {
        errorPrecio = 'El precio es necesario';
    }

    if(estado == ''){
        errorEstado = 'Debe seleccionar un estado'
    }

    document.getElementById('nombreError').innerText = errorNombre
    document.getElementById('categoriaError').innerText = errorCategoria
    document.getElementById('descripcionError').innerText = errorDescripcion
    document.getElementById('precioError').innerText = errorPrecio
    document.getElementById('estadoError').innerText = errorEstado

    // Verificar si hay algún error en los campos
    if (errorNombre == '' && errorCategoria == '' && errorDescripcion == '' && errorPrecio == '' && errorEstado == '') {
        return true; // Validación exitosa
    } else {
        return false; // Validación fallida
    }
};


//url de la api.
//Al desplegarla en el servidor colocar la api del servidor
const url = 'http://localhost:8080/api/producto'

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
        let listaProductos = data.productos
        return listaProductos.map(function(producto) {
            respuesta += `<tr><td>${producto.nombre}</td>`+
                    `<td>${producto.categoria}</td>`+
                    `<td>${producto.descripcion}</td>`+
                    `<td>${producto.precio}</td>`+
                    `<td><div class="custom-control custom-switch text-center">
                    <input type="checkbox" class="custom-control-input" id="check${producto.id}" ${producto.estado ? 'checked' : ''}>
                    <label class="custom-control-label" for="check${producto.id}"></label>
                    </div></td>`+
                    `<td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModal" onclick='editar(${JSON.stringify(producto)})'>Editar</button> 
                    <button type="button" class="btn btn-danger" onclick='eliminar(${JSON.stringify(producto)})'>Eliminar</button></td></tr>`
            body.innerHTML = respuesta

        })
    })
}

const obtenerCategorias = async () => {
    try {
      const resp = await fetch('http://localhost:8080/api/categoria');
      if (resp.ok) {
        const data = await resp.json();
        return data.categorias;
      } else {
        throw new Error('Error al obtener las categorías');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const construirOpcionesCategoria = (categorias) => {
    const selectCategoria = document.getElementById('categoria');
  
    categorias.forEach((categoria) => {
      if (categoria.estado === true) {
        const opcion = document.createElement('option');
        opcion.value = categoria.nombre;
        opcion.textContent = categoria.nombre;
        selectCategoria.appendChild(opcion);
      }
    });
  };


const registrar = async () => {

    let _nombre = document.getElementById('nombre').value
    let _categoria = document.getElementById('categoria').value
    let _descripcion = document.getElementById('descripcion').value
    let _precio = document.getElementById('precio').value
    let _estado = document.getElementById('estado').value

        let _producto = {
            nombre: _nombre,
            categoria: _categoria,
            descripcion: _descripcion,
            precio: _precio,
            estado: _estado
        }
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(_producto),//Convertir el objeto usuario a JSON
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

const editar = (producto) => {
    document.getElementById('nombre').value =''
    document.getElementById('categoria').value =''
    document.getElementById('descripcion').value =''
    document.getElementById('precio').value =''
    document.getElementById('estado').value =''

    document.getElementById('nombre').value = producto.nombre
    document.getElementById('categoria').value = producto.categoria
    document.getElementById('descripcion').value = producto.descripcion
    document.getElementById('precio').value = producto.precio
    document.getElementById('estado').value = producto.estado
}

const actualizar = async () => {

    let _nombre = document.getElementById('nombre').value
    let _categoria = document.getElementById('categoria').value
    let _descripcion = document.getElementById('descripcion').value
    let _precio = document.getElementById('precio').value
    let _estado = document.getElementById('estado').value

        let _producto = {
            nombre: _nombre,
            categoria: _categoria,
            descripcion: _descripcion,
            precio: _precio,
            estado: _estado
        }
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(_producto),//Convertir el objeto usuario a JSON
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
        title: '¿Está seguro de eliminar el producto?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let producto = {
                _id: id
            };
            fetch(url, {
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify(producto),
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




// Llamada a la función para obtener las categorías y construir las opciones del select
obtenerCategorias().then((categorias) => {
    construirOpcionesCategoria(categorias);
});

//document.querySelector('#btnCrearProducto').addEventListener('click',() => registrar())
if (document.querySelector('#btnCrearProducto')) {
    document.querySelector('#btnCrearProducto').addEventListener('click', () => {
        if (validarFormularioProductos()) {
            registrar();
        }
    });
}

document.querySelector('#btnActualizarProducto').addEventListener('click',() => actualizar())