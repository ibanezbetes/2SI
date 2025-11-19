function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validarMovil(movil) {
  const regex = /^[6-9]\d{8}$/;
  return regex.test(movil.replace(/\s/g, ''));
}

function mostrarError(contenedorId, mensaje) {
  const contenedor = document.getElementById(contenedorId);
  if (contenedor) {
    contenedor.innerHTML = `
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Error:</strong> ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
  }
}

function mostrarExito(contenedorId, mensaje) {
  const contenedor = document.getElementById(contenedorId);
  if (contenedor) {
    contenedor.innerHTML = `
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Éxito:</strong> ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
  }
}

function limpiarMensajes(contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  if (contenedor) {
    contenedor.innerHTML = '';
  }
}

function obtenerVista(controlador, metodo, destino, parametrosExtra = "") {
  let parametros = "controlador=" + controlador + "&metodo=" + metodo;
  if (parametrosExtra) {
    parametros += "&" + parametrosExtra;
  }

  fetch("CFrontal.php?" + parametros)
    .then((res) => res.text())
    .then((respuesta) => {
      document.getElementById(destino).innerHTML = respuesta;
    })
    .catch(() => {
      document.getElementById(destino).innerHTML = "Error al cargar";
    });
}

function buscar(controlador, metodo, formulario, destino) {
  let parametros = "controlador=" + controlador + "&metodo=" + metodo;
  parametros += "&" + new URLSearchParams(new FormData(document.getElementById(formulario))).toString();
  
  fetch("CFrontal.php?" + parametros)
    .then((res) => res.text())
    .then((vista) => {
      document.getElementById(destino).innerHTML = vista;
    })
    .catch(() => {
      document.getElementById(destino).innerHTML = "Error al buscar";
    });
}
