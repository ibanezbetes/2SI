// ========================================
// FUNCIONES DE VALIDACIÓN
// ========================================

/**
 * Valida formato de email
 * @param {string} email - Email a validar
 * @returns {boolean} - true si es válido
 */
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Valida formato de móvil español (9 dígitos)
 * @param {string} movil - Número de móvil a validar
 * @returns {boolean} - true si es válido
 */
function validarMovil(movil) {
  const regex = /^[6-9]\d{8}$/;
  return regex.test(movil.replace(/\s/g, ''));
}

/**
 * Muestra un mensaje de error en el contenedor especificado
 * @param {string} contenedorId - ID del contenedor donde mostrar el error
 * @param {string} mensaje - Mensaje de error a mostrar
 */
function mostrarError(contenedorId, mensaje) {
  const contenedor = document.getElementById(contenedorId);
  if (contenedor) {
    contenedor.innerHTML = `
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>⚠️ Error:</strong> ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    contenedor.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/**
 * Muestra un mensaje de éxito en el contenedor especificado
 * @param {string} contenedorId - ID del contenedor donde mostrar el éxito
 * @param {string} mensaje - Mensaje de éxito a mostrar
 */
function mostrarExito(contenedorId, mensaje) {
  const contenedor = document.getElementById(contenedorId);
  if (contenedor) {
    contenedor.innerHTML = `
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>✅ Éxito:</strong> ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    contenedor.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/**
 * Limpia mensajes de error/éxito del contenedor
 * @param {string} contenedorId - ID del contenedor a limpiar
 */
function limpiarMensajes(contenedorId) {
  const contenedor = document.getElementById(contenedorId);
  if (contenedor) {
    contenedor.innerHTML = '';
  }
}

/**
 * Verifica si un login ya existe en la base de datos
 * @param {string} login - Login a verificar
 * @param {number} idUsuario - ID del usuario actual (opcional, para edición)
 * @returns {Promise<boolean>} - true si el login está disponible
 */
async function verificarLoginDisponible(login, idUsuario = null) {
  try {
    let url = `CFrontal.php?controlador=Usuarios&metodo=verificarLogin&login=${encodeURIComponent(login)}`;
    if (idUsuario) {
      url += `&idUsuario=${idUsuario}`;
    }
    
    const response = await fetch(url);
    const data = await response.json();
    return data.disponible === true;
  } catch (error) {
    console.error('Error al verificar login:', error);
    return false;
  }
}

// ========================================
// FUNCIONES PRINCIPALES
// ========================================

function obtenerVista(controlador, metodo, destino, parametrosExtra = "") {
  let parametros = "controlador=" + controlador + "&metodo=" + metodo;
  if (parametrosExtra) {
    parametros += "&" + parametrosExtra;
  }

  let opciones = { method: "GET" };

  fetch("CFrontal.php?" + parametros, opciones)
    .then((res) => {
      if (res.ok) {
        // Verificar si la respuesta es JSON
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return res.json();
        } else {
          return res.text();
        }
      }
    })
    .then((respuesta) => {
      if (typeof respuesta === "object") {
        // Es una respuesta JSON (para buscarUsuarios)
        if (metodo === "buscarUsuarios") {
          mostrarResultados(respuesta);
        }
      } else {
        // Es HTML normal
        document.getElementById(destino).innerHTML = respuesta;
      }
    })
    .catch((err) => {
      document.getElementById(destino).innerHTML =
        "Se ha producido un error, vuelva a intentarlo";
      console.error("Error:", err);
    });
} //FIN obtenerVista

function buscar(controlador, metodo, formulario, destino) {
  let parametros = "controlador=" + controlador + "&metodo=" + metodo;
  parametros +=
    "&" +
    new URLSearchParams(
      new FormData(document.getElementById(formulario))
    ).toString();
  let opciones = { method: "GET" };
  fetch("CFrontal.php?" + parametros, opciones)
    .then((res) => {
      if (res.ok) {
        return res.text();
      }
    })
    .then((vista) => {
      document.getElementById(destino).innerHTML = vista;
    })
    .catch((err) => {
      document.getElementById(destino).innerHTML =
        "Se ha producido un error, vuelva a intentarlo";
    });
} //FIN buscar

// ========================================
// FUNCIONES DE GESTIÓN DE USUARIOS
// ========================================

function buscarUsuarios() {
  buscar(
    "Usuarios",
    "getVistaListadoUsuarios",
    "formularioBuscar",
    "capaResultadosBusqueda"
  );
}

function verTodosUsuarios() {
  document.getElementById("formularioBuscar").reset();
  buscar(
    "Usuarios",
    "getVistaListadoUsuarios",
    "formularioBuscar",
    "capaResultadosBusqueda"
  );
}

function limpiarBusqueda() {
  document.getElementById("formularioBuscar").reset();
  document.getElementById("capaResultadosBusqueda").innerHTML =
    '<p class="text-muted text-center">Utilice los campos de búsqueda para encontrar usuarios</p>';
}

/**
 * Muestra el formulario para crear un nuevo usuario
 */
function mostrarFormularioCrear() {
  const formulario = `
    <div id="mensajesUsuario"></div>
    <form id="formUsuario">
      <div class="mb-3">
        <label for="nombreUsuario" class="form-label">Nombre <span class="text-danger">*</span></label>
        <input type="text" class="form-control" id="nombreUsuario" name="nombre" required>
      </div>
      <div class="mb-3">
        <label for="apellido1Usuario" class="form-label">Primer Apellido <span class="text-danger">*</span></label>
        <input type="text" class="form-control" id="apellido1Usuario" name="apellido1" required>
      </div>
      <div class="mb-3">
        <label for="apellido2Usuario" class="form-label">Segundo Apellido</label>
        <input type="text" class="form-control" id="apellido2Usuario" name="apellido2">
      </div>
      <div class="mb-3">
        <label for="mailUsuario" class="form-label">Email <span class="text-danger">*</span></label>
        <input type="email" class="form-control" id="mailUsuario" name="mail" required>
        <div class="form-text">Formato: usuario@dominio.com</div>
      </div>
      <div class="mb-3">
        <label for="movilUsuario" class="form-label">Móvil</label>
        <input type="text" class="form-control" id="movilUsuario" name="movil" placeholder="612345678">
        <div class="form-text">Formato: 9 dígitos, comenzando por 6, 7, 8 o 9</div>
      </div>
      <div class="mb-3">
        <label for="loginUsuario" class="form-label">Login <span class="text-danger">*</span></label>
        <input type="text" class="form-control" id="loginUsuario" name="login" required>
        <div class="form-text">Usuario único para acceder al sistema</div>
      </div>
      <div class="mb-3">
        <label for="passUsuario" class="form-label">Contraseña <span class="text-danger">*</span></label>
        <input type="password" class="form-control" id="passUsuario" name="pass" required>
      </div>
      <div class="mb-3">
        <label for="sexoUsuario" class="form-label">Sexo</label>
        <select class="form-control" id="sexoUsuario" name="sexo">
          <option value="H">Hombre</option>
          <option value="M">Mujer</option>
        </select>
      </div>
      <div class="d-grid gap-2">
        <button type="button" class="btn btn-primary" onclick="guardarUsuario();">
          💾 Guardar Usuario
        </button>
        <button type="button" class="btn btn-secondary" onclick="cancelarFormulario();">
          ❌ Cancelar
        </button>
      </div>
    </form>
  `;

  document.getElementById("formularioUsuario").innerHTML = formulario;
  document.getElementById("formularioUsuario").style.display = "block";
}

/**
 * Carga los datos de un usuario y muestra el formulario de edición
 * @param {number} idUsuario - ID del usuario a editar
 */
function editarUsuario(idUsuario) {
  fetch(`CFrontal.php?controlador=Usuarios&metodo=obtenerUsuario&idUsuario=${idUsuario}`)
    .then((response) => response.json())
    .then((usuario) => {
      if (usuario.error) {
        mostrarError("capaResultadosBusqueda", usuario.error);
      } else {
        mostrarFormularioEditar(usuario);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      mostrarError("capaResultadosBusqueda", "Error al cargar los datos del usuario");
    });
}

/**
 * Muestra el formulario de edición con los datos del usuario
 * @param {Object} usuario - Objeto con los datos del usuario
 */
function mostrarFormularioEditar(usuario) {
  const formulario = `
    <div id="mensajesUsuario"></div>
    <form id="formUsuario">
      <input type="hidden" id="idUsuario" value="${usuario.idUsuario}">
      <input type="hidden" id="loginOriginal" value="${usuario.login}">
      
      <div class="mb-3">
        <label for="nombreUsuario" class="form-label">Nombre <span class="text-danger">*</span></label>
        <input type="text" class="form-control" id="nombreUsuario" value="${usuario.nombre}" required>
      </div>
      <div class="mb-3">
        <label for="apellido1Usuario" class="form-label">Primer Apellido <span class="text-danger">*</span></label>
        <input type="text" class="form-control" id="apellido1Usuario" value="${usuario.apellido1}" required>
      </div>
      <div class="mb-3">
        <label for="apellido2Usuario" class="form-label">Segundo Apellido</label>
        <input type="text" class="form-control" id="apellido2Usuario" value="${usuario.apellido2 || ""}">
      </div>
      <div class="mb-3">
        <label for="mailUsuario" class="form-label">Email <span class="text-danger">*</span></label>
        <input type="email" class="form-control" id="mailUsuario" value="${usuario.mail}" required>
        <div class="form-text">Formato: usuario@dominio.com</div>
      </div>
      <div class="mb-3">
        <label for="movilUsuario" class="form-label">Móvil</label>
        <input type="text" class="form-control" id="movilUsuario" value="${usuario.movil || ""}" placeholder="612345678">
        <div class="form-text">Formato: 9 dígitos, comenzando por 6, 7, 8 o 9</div>
      </div>
      <div class="mb-3">
        <label for="loginUsuario" class="form-label">Login <span class="text-danger">*</span></label>
        <input type="text" class="form-control" id="loginUsuario" value="${usuario.login}" required>
        <div class="form-text">Usuario único para acceder al sistema</div>
      </div>
      <div class="mb-3">
        <label for="sexoUsuario" class="form-label">Sexo</label>
        <select class="form-control" id="sexoUsuario">
          <option value="H" ${usuario.sexo === "H" ? "selected" : ""}>Hombre</option>
          <option value="M" ${usuario.sexo === "M" ? "selected" : ""}>Mujer</option>
        </select>
      </div>
      <div class="d-grid gap-2">
        <button type="button" class="btn btn-primary" onclick="actualizarUsuario();">
          ✏️ Actualizar Usuario
        </button>
        <button type="button" class="btn btn-secondary" onclick="cancelarFormulario();">
          ❌ Cancelar
        </button>
      </div>
    </form>
  `;

  document.getElementById("formularioUsuario").innerHTML = formulario;
  document.getElementById("formularioUsuario").style.display = "block";
}

/**
 * Valida los datos del formulario de usuario
 * @param {boolean} esNuevo - true si es creación, false si es edición
 * @returns {Object} - {valido: boolean, errores: array}
 */
function validarFormularioUsuario(esNuevo = true) {
  const errores = [];
  
  // Obtener valores
  const nombre = document.getElementById("nombreUsuario").value.trim();
  const apellido1 = document.getElementById("apellido1Usuario").value.trim();
  const mail = document.getElementById("mailUsuario").value.trim();
  const movil = document.getElementById("movilUsuario").value.trim();
  const login = document.getElementById("loginUsuario").value.trim();
  const pass = esNuevo ? document.getElementById("passUsuario").value.trim() : null;
  
  // Validar campos obligatorios
  if (!nombre) errores.push("El nombre es obligatorio");
  if (!apellido1) errores.push("El primer apellido es obligatorio");
  if (!mail) errores.push("El email es obligatorio");
  if (!login) errores.push("El login es obligatorio");
  if (esNuevo && !pass) errores.push("La contraseña es obligatoria");
  
  // Validar formato de email
  if (mail && !validarEmail(mail)) {
    errores.push("El formato del email no es válido");
  }
  
  // Validar formato de móvil (solo si se ingresó)
  if (movil && !validarMovil(movil)) {
    errores.push("El formato del móvil no es válido (debe tener 9 dígitos y comenzar por 6, 7, 8 o 9)");
  }
  
  return {
    valido: errores.length === 0,
    errores: errores
  };
}

/**
 * Guarda un nuevo usuario tras validar los datos
 */
async function guardarUsuario() {
  limpiarMensajes("mensajesUsuario");
  
  // Validar formulario
  const validacion = validarFormularioUsuario(true);
  if (!validacion.valido) {
    mostrarError("mensajesUsuario", validacion.errores.join("<br>"));
    return;
  }
  
  // Verificar login disponible
  const login = document.getElementById("loginUsuario").value.trim();
  const loginDisponible = await verificarLoginDisponible(login);
  
  if (!loginDisponible) {
    mostrarError("mensajesUsuario", "El login ingresado ya está en uso. Por favor, elija otro.");
    return;
  }
  
  // Preparar parámetros
  let parametros = "controlador=Usuarios&metodo=crearUsuario";
  parametros += "&" + new URLSearchParams(
    new FormData(document.getElementById("formUsuario"))
  ).toString();

  // Enviar petición
  fetch("CFrontal.php?" + parametros)
    .then((response) => response.text())
    .then((data) => {
      if (data.includes("exitosamente")) {
        mostrarExito("mensajesUsuario", "Usuario creado exitosamente");
        setTimeout(() => {
          cancelarFormulario();
          verTodosUsuarios();
        }, 1500);
      } else {
        // Extraer mensaje de error del HTML si existe
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const alertDiv = doc.querySelector('.alert-danger');
        const mensajeError = alertDiv ? alertDiv.textContent.trim() : "Error al crear el usuario";
        mostrarError("mensajesUsuario", mensajeError);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      mostrarError("mensajesUsuario", "Error de conexión al crear el usuario");
    });
}

/**
 * Actualiza un usuario existente tras validar los datos
 */
async function actualizarUsuario() {
  limpiarMensajes("mensajesUsuario");
  
  // Validar formulario
  const validacion = validarFormularioUsuario(false);
  if (!validacion.valido) {
    mostrarError("mensajesUsuario", validacion.errores.join("<br>"));
    return;
  }
  
  // Verificar login disponible (solo si cambió)
  const idUsuario = document.getElementById("idUsuario").value;
  const login = document.getElementById("loginUsuario").value.trim();
  const loginOriginal = document.getElementById("loginOriginal").value;
  
  if (login !== loginOriginal) {
    const loginDisponible = await verificarLoginDisponible(login, idUsuario);
    if (!loginDisponible) {
      mostrarError("mensajesUsuario", "El login ingresado ya está en uso. Por favor, elija otro.");
      return;
    }
  }
  
  // Preparar datos
  const datos = {
    controlador: "Usuarios",
    metodo: "actualizarUsuario",
    idUsuario: idUsuario,
    nombre: document.getElementById("nombreUsuario").value.trim(),
    apellido1: document.getElementById("apellido1Usuario").value.trim(),
    apellido2: document.getElementById("apellido2Usuario").value.trim(),
    mail: document.getElementById("mailUsuario").value.trim(),
    movil: document.getElementById("movilUsuario").value.trim(),
    login: login,
    sexo: document.getElementById("sexoUsuario").value,
  };

  const params = new URLSearchParams(datos);

  // Enviar petición
  fetch("CFrontal.php", {
    method: "POST",
    body: params,
  })
    .then((response) => response.text())
    .then((data) => {
      if (data.includes("exitosamente")) {
        mostrarExito("mensajesUsuario", "Usuario actualizado exitosamente");
        setTimeout(() => {
          cancelarFormulario();
          verTodosUsuarios();
        }, 1500);
      } else {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const alertDiv = doc.querySelector('.alert-danger');
        const mensajeError = alertDiv ? alertDiv.textContent.trim() : "Error al actualizar el usuario";
        mostrarError("mensajesUsuario", mensajeError);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      mostrarError("mensajesUsuario", "Error de conexión al actualizar el usuario");
    });
}

function cancelarFormulario() {
  document.getElementById("formularioUsuario").style.display = "none";
  document.getElementById("formularioUsuario").innerHTML = "";
}

/**
 * Elimina un usuario tras confirmar la acción
 * @param {number} idUsuario - ID del usuario a eliminar
 * @param {string} nombreUsuario - Nombre del usuario para mostrar en confirmación
 */
function eliminarUsuario(idUsuario, nombreUsuario) {
  if (confirm(`¿Está seguro de que desea eliminar al usuario '${nombreUsuario}'?\n\nEsta acción no se puede deshacer.`)) {
    const datos = {
      controlador: "Usuarios",
      metodo: "eliminarUsuario",
      idUsuario: idUsuario,
    };

    const params = new URLSearchParams(datos);

    fetch("CFrontal.php", {
      method: "POST",
      body: params,
    })
      .then((response) => response.text())
      .then((data) => {
        if (data.includes("exitosamente")) {
          mostrarExito("capaResultadosBusqueda", "Usuario eliminado exitosamente");
          setTimeout(() => verTodosUsuarios(), 1500);
        } else {
          mostrarError("capaResultadosBusqueda", "Error al eliminar el usuario");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        mostrarError("capaResultadosBusqueda", "Error de conexión al eliminar el usuario");
      });
  }
}

// ========================================
// FUNCIONES DE GESTIÓN DE PRODUCTOS
// ========================================

function buscarProductos() {
  buscar(
    "Productos",
    "getVistaListadoProductos",
    "formularioBuscarProducto",
    "capaResultadosProductos"
  );
}

function verTodosProductos() {
  document.getElementById("formularioBuscarProducto").reset();
  buscar(
    "Productos",
    "getVistaListadoProductos",
    "formularioBuscarProducto",
    "capaResultadosProductos"
  );
}

/**
 * Muestra el formulario para crear un nuevo producto
 */
function mostrarFormularioCrearProducto() {
  const formulario = `
    <div id="mensajesProducto"></div>
    <form id="formProducto">
      <div class="mb-3">
        <label for="productoNombre" class="form-label">Producto <span class="text-danger">*</span></label>
        <input type="text" class="form-control" id="productoNombre" name="producto" required>
      </div>
      <div class="mb-3">
        <label for="productoDescripcion" class="form-label">Descripción</label>
        <textarea class="form-control" id="productoDescripcion" name="descripcion" rows="3"></textarea>
      </div>
      <div class="mb-3">
        <label for="productoStock" class="form-label">Stock</label>
        <input type="number" class="form-control" id="productoStock" name="stock" value="0" min="0">
      </div>
      <div class="mb-3">
        <label for="productoPrecio" class="form-label">Precio Venta <span class="text-danger">*</span></label>
        <input type="number" step="0.01" class="form-control" id="productoPrecio" name="precioVenta" required min="0">
        <div class="form-text">Formato: 0.00 (euros)</div>
      </div>
      <div class="d-grid gap-2">
        <button type="button" class="btn btn-primary" onclick="guardarProducto();">
          💾 Guardar Producto
        </button>
        <button type="button" class="btn btn-secondary" onclick="cancelarFormularioProducto();">
          ❌ Cancelar
        </button>
      </div>
    </form>
  `;
  document.getElementById("formularioProducto").innerHTML = formulario;
  document.getElementById("formularioProducto").style.display = "block";
}

/**
 * Carga los datos de un producto y muestra el formulario de edición
 * @param {number} idProducto - ID del producto a editar
 */
function editarProducto(idProducto) {
  fetch(`CFrontal.php?controlador=Productos&metodo=obtenerProducto&idProducto=${idProducto}`)
    .then((response) => response.json())
    .then((producto) => {
      if (producto.error) {
        mostrarError("capaResultadosProductos", producto.error);
      } else {
        mostrarFormularioEditarProducto(producto);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      mostrarError("capaResultadosProductos", "Error al cargar los datos del producto");
    });
}

/**
 * Muestra el formulario de edición con los datos del producto
 * @param {Object} producto - Objeto con los datos del producto
 */
function mostrarFormularioEditarProducto(producto) {
  const formulario = `
    <div id="mensajesProducto"></div>
    <form id="formProducto">
      <input type="hidden" id="idProducto" value="${producto.idProducto}">
      <div class="mb-3">
        <label for="productoNombre" class="form-label">Producto <span class="text-danger">*</span></label>
        <input type="text" class="form-control" id="productoNombre" value="${producto.producto}" required>
      </div>
      <div class="mb-3">
        <label for="productoDescripcion" class="form-label">Descripción</label>
        <textarea class="form-control" id="productoDescripcion" rows="3">${producto.descripcion || ""}</textarea>
      </div>
      <div class="mb-3">
        <label for="productoStock" class="form-label">Stock</label>
        <input type="number" class="form-control" id="productoStock" value="${producto.stock || 0}" min="0">
      </div>
      <div class="mb-3">
        <label for="productoPrecio" class="form-label">Precio Venta <span class="text-danger">*</span></label>
        <input type="number" step="0.01" class="form-control" id="productoPrecio" value="${producto.precioVenta}" required min="0">
        <div class="form-text">Formato: 0.00 (euros)</div>
      </div>
      <div class="d-grid gap-2">
        <button type="button" class="btn btn-primary" onclick="actualizarProducto();">
          ✏️ Actualizar Producto
        </button>
        <button type="button" class="btn btn-secondary" onclick="cancelarFormularioProducto();">
          ❌ Cancelar
        </button>
      </div>
    </form>
  `;
  document.getElementById("formularioProducto").innerHTML = formulario;
  document.getElementById("formularioProducto").style.display = "block";
}

/**
 * Valida los datos del formulario de producto
 * @returns {Object} - {valido: boolean, errores: array}
 */
function validarFormularioProducto() {
  const errores = [];
  
  // Obtener valores
  const producto = document.getElementById("productoNombre").value.trim();
  const precio = document.getElementById("productoPrecio").value.trim();
  const stock = document.getElementById("productoStock").value.trim();
  
  // Validar campos obligatorios
  if (!producto) errores.push("El nombre del producto es obligatorio");
  if (!precio) errores.push("El precio de venta es obligatorio");
  
  // Validar que el precio sea un número positivo
  if (precio && (isNaN(precio) || parseFloat(precio) < 0)) {
    errores.push("El precio debe ser un número positivo");
  }
  
  // Validar que el stock sea un número positivo
  if (stock && (isNaN(stock) || parseInt(stock) < 0)) {
    errores.push("El stock debe ser un número positivo");
  }
  
  return {
    valido: errores.length === 0,
    errores: errores
  };
}

/**
 * Guarda un nuevo producto tras validar los datos
 */
function guardarProducto() {
  limpiarMensajes("mensajesProducto");
  
  // Validar formulario
  const validacion = validarFormularioProducto();
  if (!validacion.valido) {
    mostrarError("mensajesProducto", validacion.errores.join("<br>"));
    return;
  }
  
  let parametros = "controlador=Productos&metodo=crearProducto";
  parametros += "&" + new URLSearchParams(
    new FormData(document.getElementById("formProducto"))
  ).toString();
  
  fetch("CFrontal.php?" + parametros)
    .then((response) => response.text())
    .then((data) => {
      if (data.includes("exitosamente")) {
        mostrarExito("mensajesProducto", "Producto creado exitosamente");
        setTimeout(() => {
          cancelarFormularioProducto();
          verTodosProductos();
        }, 1500);
      } else {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const alertDiv = doc.querySelector('.alert-danger');
        const mensajeError = alertDiv ? alertDiv.textContent.trim() : "Error al crear el producto";
        mostrarError("mensajesProducto", mensajeError);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      mostrarError("mensajesProducto", "Error de conexión al crear el producto");
    });
}

/**
 * Actualiza un producto existente tras validar los datos
 */
function actualizarProducto() {
  limpiarMensajes("mensajesProducto");
  
  // Validar formulario
  const validacion = validarFormularioProducto();
  if (!validacion.valido) {
    mostrarError("mensajesProducto", validacion.errores.join("<br>"));
    return;
  }
  
  const datos = {
    controlador: "Productos",
    metodo: "actualizarProducto",
    idProducto: document.getElementById("idProducto").value,
    producto: document.getElementById("productoNombre").value.trim(),
    descripcion: document.getElementById("productoDescripcion").value.trim(),
    stock: document.getElementById("productoStock").value,
    precioVenta: document.getElementById("productoPrecio").value,
  };
  
  const params = new URLSearchParams(datos);
  
  fetch("CFrontal.php", { method: "POST", body: params })
    .then((response) => response.text())
    .then((data) => {
      if (data.includes("exitosamente")) {
        mostrarExito("mensajesProducto", "Producto actualizado exitosamente");
        setTimeout(() => {
          cancelarFormularioProducto();
          verTodosProductos();
        }, 1500);
      } else {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const alertDiv = doc.querySelector('.alert-danger');
        const mensajeError = alertDiv ? alertDiv.textContent.trim() : "Error al actualizar el producto";
        mostrarError("mensajesProducto", mensajeError);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      mostrarError("mensajesProducto", "Error de conexión al actualizar el producto");
    });
}

function cancelarFormularioProducto() {
  document.getElementById("formularioProducto").style.display = "none";
  document.getElementById("formularioProducto").innerHTML = "";
}

/**
 * Elimina un producto tras confirmar la acción
 * @param {number} idProducto - ID del producto a eliminar
 * @param {string} nombreProducto - Nombre del producto para mostrar en confirmación
 */
function eliminarProducto(idProducto, nombreProducto) {
  if (confirm(`¿Está seguro de que desea eliminar el producto '${nombreProducto}'?`)) {
    const datos = {
      controlador: "Productos",
      metodo: "eliminarProducto",
      idProducto: idProducto,
    };
    
    const params = new URLSearchParams(datos);
    
    fetch("CFrontal.php", { method: "POST", body: params })
      .then((response) => response.text())
      .then((data) => {
        if (data.includes("exitosamente")) {
          mostrarExito("capaResultadosProductos", "Producto eliminado correctamente");
          setTimeout(() => verTodosProductos(), 1500);
        } else {
          mostrarError("capaResultadosProductos", "Error al eliminar el producto");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        mostrarError("capaResultadosProductos", "Error de conexión al eliminar el producto");
      });
  }
}
