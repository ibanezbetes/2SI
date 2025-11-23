// Validar formato de email (usuario@dominio.com)
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Validar móvil español (9 dígitos, empieza por 6, 7, 8 o 9)
function validarMovil(movil) {
  const regex = /^[6-9]\d{8}$/;
  return regex.test(movil.replace(/\s/g, ''));
}

// Mostrar mensaje de error en un contenedor
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

// Mostrar mensaje de éxito en un contenedor
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

// Limpiar mensajes de un contenedor
function limpiarMensajes(contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  if (contenedor) {
    contenedor.innerHTML = '';
  }
}

// Cargar una vista desde el servidor (AJAX)
// Función genérica para cargar vistas mediante AJAX
// controlador: nombre del controlador (ej: 'Usuarios')
// metodo: nombre del método a llamar (ej: 'getVistaUsuariosPrincipal')
// destino: ID del elemento HTML donde se pintará el resultado
// parametrosExtra: parámetros adicionales para la URL
function obtenerVista(controlador, metodo, destino, parametrosExtra = "") {
  let parametros = "controlador=" + controlador + "&metodo=" + metodo;
  if (parametrosExtra) {
    parametros += "&" + parametrosExtra;
  }

  // Hacer petición al servidor sin recargar la página
  fetch("CFrontal.php?" + parametros)
    .then((res) => res.text())
    .then((respuesta) => {
      // Insertar la respuesta en el contenedor
      document.getElementById(destino).innerHTML = respuesta;
    })
    .catch(() => {
      document.getElementById(destino).innerHTML = "Error al cargar";
    });
}

// Buscar datos enviando un formulario (AJAX)
// Función para enviar formularios de búsqueda por AJAX
// Recoge todos los campos del formulario y los envía al servidor
// Pinta la respuesta en el contenedor 'destino'
function buscar(controlador, metodo, formulario, destino) {
  let parametros = "controlador=" + controlador + "&metodo=" + metodo;

  // Obtener los datos del formulario y convertirlos a URL params
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
