//url de la api.
//Al desplegarla en el servidor colocar la api del servidor
const url = 'http://localhost:8080/api/produccion'

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
        let listaProducciones = data.produccionesArray
        return listaProducciones.map(function(produccion) {
            respuesta += `<tr><td>${produccion.area}</td>`+
                    `<td>${produccion.producto}</td>`+
                    `<td class="text-center">${produccion.cantidad}</td>`+
                    `<td>${produccion.fecha_actualizacion.substring(0,16)}</td>`+
                    `<td>${produccion.estado}</td>`+
                    `<td>${produccion.fecha_entrega.substring(0,10)}</td>`+
                    `<td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModal" onclick='editar(${JSON.stringify(produccion)})'>Editar</button></td></tr>`
            body.innerHTML = respuesta

        })
    })
}


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

    const url_d_pedido = 'http://localhost:8080/api/d_pedido'

    let _producto = document.getElementById('producto').value;
    let _fecha_entrega = document.getElementById('fecha_entrega').value;
    let _estado = document.getElementById('estado').value;

  
    let _d_pedido = {
      producto: _producto,
      fecha_entrega: _fecha_entrega,
      estado: _estado,
    };
  
    fetch(url_d_pedido, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(_d_pedido),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
      .then((resp) => resp.json())
      .then((json) => {
        Swal.fire(json.msg, '', 'success').then(() => {
          location.reload();
        });
      });
  };


document.querySelector('#btnActualizarEstadoProduccion').addEventListener('click',() => actualizar())

