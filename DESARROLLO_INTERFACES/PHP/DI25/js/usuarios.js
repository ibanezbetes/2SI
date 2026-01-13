// Llama a la función genérica 'buscar' para obtener la lista de usuarios filtrada
function buscarUsuarios(pagina = 1, tamPag = 5) {
  const params = `pagina=${pagina}&tam_pag=${tamPag}`;
  buscar("Usuarios", "getVistaListadoUsuarios", "formularioBuscar", "capaResultadosBusqueda", params);
}

// Resetea el formulario y muestra todos los usuarios
function verTodosUsuarios() {
  document.getElementById("formularioBuscar").reset();
  buscar("Usuarios", "getVistaListadoUsuarios", "formularioBuscar", "capaResultadosBusqueda");
}

function limpiarBusqueda() {
  document.getElementById("formularioBuscar").reset();
  document.getElementById("capaResultadosBusqueda").innerHTML = '<p class="text-muted text-center">Utilice los campos de búsqueda</p>';
}

// Genera y muestra el formulario HTML para crear un nuevo usuario
function mostrarFormularioCrear() {
  const formulario = `
    <!-- Overlay de fondo -->
    <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1040;"></div>
    
    <!-- Modal Centrado -->
    <div class="p-4 rounded shadow" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 33%; min-width: 400px; max-height: 90vh; overflow-y: auto; z-index: 1050; background-color: var(--surface-color); color: var(--bs-body-color); border: 1px solid var(--bs-border-color);">
        <h4 class="mb-4" style="color: var(--bs-light) !important;">Crear Nuevo Usuario</h4>
        <div id="mensajesUsuario"></div>
        <form id="formUsuario">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Nombre *</label>
              <input type="text" class="form-control" id="nombreUsuario" name="nombre" required>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Primer Apellido *</label>
              <input type="text" class="form-control" id="apellido1Usuario" name="apellido1" required>
            </div>
          </div>
          
          <div class="row">
             <div class="col-md-6 mb-3">
              <label class="form-label">Segundo Apellido</label>
              <input type="text" class="form-control" id="apellido2Usuario" name="apellido2">
            </div>
             <div class="col-md-6 mb-3">
              <label class="form-label">Email *</label>
              <input type="email" class="form-control" id="mailUsuario" name="mail" required>
            </div>
          </div>
          
          <div class="row">
             <div class="col-md-6 mb-3">
              <label class="form-label">Móvil</label>
              <input type="text" class="form-control" id="movilUsuario" name="movil">
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Sexo</label>
              <select class="form-control" id="sexoUsuario" name="sexo">
                <option value="H">Hombre</option>
                <option value="M">Mujer</option>
              </select>
            </div>
          </div>
          
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Login *</label>
              <input type="text" class="form-control" id="loginUsuario" name="login" required>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Contraseña *</label>
              <input type="password" class="form-control" id="passUsuario" name="pass" required>
            </div>
          </div>
          
          <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
            <button type="button" class="btn btn-primary" onclick="guardarUsuario();">Guardar</button>
            <button type="button" class="btn btn-secondary" onclick="cancelarFormulario();">Cancelar</button>
          </div>
        </form>
    </div>
  `;

  document.getElementById("formularioUsuario").innerHTML = formulario;
  document.getElementById("formularioUsuario").style.display = "block";
}

// Pide al servidor los datos de un usuario y muestra el formulario de edición
function editarUsuario(idUsuario) {
  fetch(`CFrontal.php?controlador=Usuarios&metodo=obtenerUsuario&idUsuario=${idUsuario}`)
    .then((response) => response.json())
    .then((usuario) => {
      if (usuario.error) {
        alert("Error al cargar usuario");
      } else {
        mostrarFormularioEditar(usuario);
      }
    });
}

function mostrarFormularioEditar(usuario) {
  const formulario = `
    <!-- Overlay de fondo -->
    <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1040;"></div>
    
    <!-- Modal Centrado -->
    <div class="p-4 rounded shadow" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 33%; min-width: 400px; max-height: 90vh; overflow-y: auto; z-index: 1050; background-color: var(--surface-color); color: var(--bs-body-color); border: 1px solid var(--bs-border-color);">
        <h4 class="mb-4" style="color: var(--bs-light) !important;">Editar Usuario</h4>
        <div id="mensajesUsuario"></div>
        <form id="formUsuario">
          <input type="hidden" id="idUsuario" value="${usuario.idUsuario}">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Nombre *</label>
              <input type="text" class="form-control" id="nombreUsuario" value="${usuario.nombre}" required>
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Primer Apellido *</label>
              <input type="text" class="form-control" id="apellido1Usuario" value="${usuario.apellido1}" required>
            </div>
          </div>
          
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Segundo Apellido</label>
              <input type="text" class="form-control" id="apellido2Usuario" value="${usuario.apellido2 || ""}">
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Email *</label>
              <input type="email" class="form-control" id="mailUsuario" value="${usuario.mail}" required>
            </div>
          </div>
    
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Móvil</label>
              <input type="text" class="form-control" id="movilUsuario" value="${usuario.movil || ""}">
            </div>
            <div class="col-md-6 mb-3">
              <label class="form-label">Login *</label>
              <input type="text" class="form-control" id="loginUsuario" value="${usuario.login}" required>
            </div>
          </div>
            
          <div class="row">
             <div class="col-md-12 mb-3">
              <label class="form-label">Sexo</label>
              <select class="form-control" id="sexoUsuario">
                <option value="H" ${usuario.sexo === "H" ? "selected" : ""}>Hombre</option>
                <option value="M" ${usuario.sexo === "M" ? "selected" : ""}>Mujer</option>
              </select>
            </div>
          </div>
    
          <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
            <button type="button" class="btn btn-primary" onclick="actualizarUsuario();">Actualizar</button>
            <button type="button" class="btn btn-secondary" onclick="cancelarFormulario();">Cancelar</button>
          </div>
        </form>
    </div>
  `;

  document.getElementById("formularioUsuario").innerHTML = formulario;
  document.getElementById("formularioUsuario").style.display = "block";
}

// Recoge datos del formulario, valida y envía petición para crear usuario
function guardarUsuario() {
  limpiarMensajes("mensajesUsuario");

  const nombre = document.getElementById("nombreUsuario").value.trim();
  const apellido1 = document.getElementById("apellido1Usuario").value.trim();
  const mail = document.getElementById("mailUsuario").value.trim();
  const movil = document.getElementById("movilUsuario").value.trim();
  const login = document.getElementById("loginUsuario").value.trim();
  const pass = document.getElementById("passUsuario").value.trim();

  if (!nombre || !apellido1 || !mail || !login || !pass) {
    mostrarError("mensajesUsuario", "Todos los campos marcados con * son obligatorios");
    return;
  }

  if (!validarEmail(mail)) {
    mostrarError("mensajesUsuario", "El email no es válido");
    return;
  }

  if (movil && !validarMovil(movil)) {
    mostrarError("mensajesUsuario", "El móvil no es válido");
    return;
  }

  let parametros = "controlador=Usuarios&metodo=crearUsuario";
  parametros += "&" + new URLSearchParams(new FormData(document.getElementById("formUsuario"))).toString();

  fetch("CFrontal.php?" + parametros)
    .then((response) => response.text())
    .then((data) => {
      if (data.includes("exitosamente")) {
        mostrarExito("mensajesUsuario", "Usuario creado correctamente");
        setTimeout(() => {
          cancelarFormulario();
          verTodosUsuarios();
        }, 1500);
      } else {
        mostrarError("mensajesUsuario", "Error al crear el usuario");
      }
    });
}

// Recoge datos, valida y envía petición para actualizar usuario existente
function actualizarUsuario() {
  limpiarMensajes("mensajesUsuario");

  const nombre = document.getElementById("nombreUsuario").value.trim();
  const apellido1 = document.getElementById("apellido1Usuario").value.trim();
  const apellido2 = document.getElementById("apellido2Usuario").value.trim();
  const mail = document.getElementById("mailUsuario").value.trim();
  const movil = document.getElementById("movilUsuario").value.trim();
  const login = document.getElementById("loginUsuario").value.trim();
  const sexo = document.getElementById("sexoUsuario").value;

  if (!nombre || !apellido1 || !mail || !login) {
    mostrarError("mensajesUsuario", "Todos los campos obligatorios deben estar completos");
    return;
  }

  if (!validarEmail(mail)) {
    mostrarError("mensajesUsuario", "El email no es válido");
    return;
  }

  if (movil && !validarMovil(movil)) {
    mostrarError("mensajesUsuario", "El móvil no es válido");
    return;
  }

  const datos = {
    controlador: "Usuarios",
    metodo: "actualizarUsuario",
    idUsuario: document.getElementById("idUsuario").value,
    nombre: nombre,
    apellido1: apellido1,
    apellido2: apellido2,
    mail: mail,
    movil: movil,
    login: login,
    sexo: sexo
  };

  fetch("CFrontal.php", {
    method: "POST",
    body: new URLSearchParams(datos)
  })
    .then((response) => response.text())
    .then((data) => {
      if (data.includes("exitosamente")) {
        mostrarExito("mensajesUsuario", "Usuario actualizado correctamente");
        setTimeout(() => {
          cancelarFormulario();
          verTodosUsuarios();
        }, 1500);
      } else {
        mostrarError("mensajesUsuario", "Error al actualizar");
      }
    });
}

function cancelarFormulario() {
  document.getElementById("formularioUsuario").style.display = "none";
  document.getElementById("formularioUsuario").innerHTML = "";
}

// Pide confirmación y envía petición para eliminar (desactivar) un usuario
function eliminarUsuario(idUsuario, nombreUsuario) {
  if (confirm(`¿Eliminar al usuario '${nombreUsuario}'?`)) {
    const datos = {
      controlador: "Usuarios",
      metodo: "eliminarUsuario",
      idUsuario: idUsuario
    };

    fetch("CFrontal.php", {
      method: "POST",
      body: new URLSearchParams(datos)
    })
      .then((response) => response.text())
      .then((data) => {
        if (data.includes("exitosamente")) {
          mostrarExito("capaResultadosBusqueda", "Usuario eliminado");
          setTimeout(() => verTodosUsuarios(), 1500);
        } else {
          mostrarError("capaResultadosBusqueda", "Error al eliminar");
        }
      });
  }
}
