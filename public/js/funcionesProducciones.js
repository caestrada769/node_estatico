//url de la api.
//Al desplegarla en el servidor colocar la api del servidor
const url = 'https://api-backend-91n0.onrender.com/api/produccion'

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
        let listaProducciones = data.producciones
        return listaProducciones.map(function(produccion) {
            respuesta += `<tr><td>${produccion.area}</td>`+
                    `<td>${produccion.producto}</td>`+
                    `<td class="text-center">${produccion.cantidad}</td>`+
                    `<td>${produccion.fecha_actualizacion.substring(0,16)}</td>`+
                    `<td>${produccion.estado}</td>`+
                    `<td>${produccion.fecha_entrega.substring(0,10)}</td>`+
                    `<td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModal" onclick='editar(${JSON.stringify(produccion)})'>Editar</button> 
                    <button type="button" class="btn btn-danger" onclick='eliminar(${JSON.stringify(produccion)})'>Eliminar</button></td></tr>`
            body.innerHTML = respuesta

        })
    })
}


const registrar = async () => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      });
  
      const json = await response.json();
      console.log(json.msg);
      Swal.fire(json.msg, '', 'success').then(() => {
        location.reload();//Para recargar la pagina
    });
    } catch (error) {
      console.error('Ocurrió un error al registrar:', error);
      Swal.fire('Error al registrar', '', 'error');
    }
  };
  

const editar = (produccion) => {
    document.getElementById('area').value =''
    document.getElementById('producto').value =''
    document.getElementById('cantidad').value =''
    document.getElementById('fecha_actualizacion').value =''
    document.getElementById('estado').value =''
    document.getElementById('fecha_entrega').value =''
    document.getElementById('idProduccion').value = ''


    document.getElementById('area').value = produccion.area
    document.getElementById('producto').value = produccion.producto
    document.getElementById('cantidad').value = produccion.cantidad
    document.getElementById('fecha_actualizacion').value = produccion.fecha_actualizacion
    document.getElementById('estado').value = produccion.estado
    document.getElementById('fecha_entrega').value = produccion.fecha_entrega
    document.getElementById('idProduccion').value = produccion._id;
}

const actualizar = async () => {
    let _id = document.getElementById('idProduccion').value;
    let _estado = document.getElementById('estado').value;
    let _fecha_actualizacion = new Date()
  
    let _produccion = {
      _id: _id,
      estado: _estado,
      fecha_actualizacion: _fecha_actualizacion,
    };
  
    fetch(url, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(_produccion),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
      .then((resp) => resp.json())
      .then((json) => {
        Swal.fire(json.msg, '', 'success').then(() => {
          location.reload();
        });
      });
  };
  

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
            let produccion = {
                _id: id
            };
            fetch(url, {
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify(produccion),
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


if(document.querySelector('#btnActualizarOrdenes')){
    document.querySelector('#btnActualizarOrdenes').addEventListener('click',() => registrar())
}


document.querySelector('#btnActualizarEstadoProduccion').addEventListener('click',() => actualizar())

