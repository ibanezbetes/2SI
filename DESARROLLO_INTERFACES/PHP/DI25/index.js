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

// Funciones para la gestión de usuarios
function buscarUsuarios() {
  buscar(
    "Usuarios",
    "getVistaListadoUsuarios",
    "formularioBuscar",
    "capaResultadosBusqueda"
  );
}

function verTodosUsuarios() {
  // Limpiar formulario para mostrar todos
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

// Funciones para crear/editar usuarios
function mostrarFormularioCrear() {
  const formulario = `
        <form id="formUsuario">
            <div class="mb-3">
                <label for="nombreUsuario" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombreUsuario" name="nombre" required>
            </div>
            <div class="mb-3">
                <label for="apellido1Usuario" class="form-label">Primer Apellido</label>
                <input type="text" class="form-control" id="apellido1Usuario" name="apellido1" required>
            </div>
            <div class="mb-3">
                <label for="apellido2Usuario" class="form-label">Segundo Apellido</label>
                <input type="text" class="form-control" id="apellido2Usuario" name="apellido2">
            </div>
            <div class="mb-3">
                <label for="mailUsuario" class="form-label">Email</label>
                <input type="email" class="form-control" id="mailUsuario" name="mail" required>
            </div>
            <div class="mb-3">
                <label for="movilUsuario" class="form-label">Móvil</label>
                <input type="text" class="form-control" id="movilUsuario" name="movil">
            </div>
            <div class="mb-3">
                <label for="loginUsuario" class="form-label">Login</label>
                <input type="text" class="form-control" id="loginUsuario" name="login" required>
            </div>
            <div class="mb-3">
                <label for="passUsuario" class="form-label">Contraseña</label>
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
                <button type="button" class="btn btn-primary" onclick="guardarUsuario();">💾 Guardar Usuario</button>
                <button type="button" class="btn btn-secondary" onclick="cancelarFormulario();">❌ Cancelar</button>
            </div>
        </form>
    `;

  document.getElementById("formularioUsuario").innerHTML = formulario;
  document.getElementById("formularioUsuario").style.display = "block";
}

function editarUsuario(idUsuario) {
  // Hacer petición para obtener datos del usuario
  fetch(
    "CFrontal.php?controlador=Usuarios&metodo=obtenerUsuario&idUsuario=" +
      idUsuario
  )
    .then((response) => response.json())
    .then((usuario) => {
      mostrarFormularioEditar(usuario);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error al cargar los datos del usuario");
    });
}

function mostrarFormularioEditar(usuario) {
  const formulario = `
        <form id="formUsuario">
            <input type="hidden" id="idUsuario" value="${usuario.idUsuario}">
            <div class="mb-3">
                <label for="nombreUsuario" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombreUsuario" value="${
                  usuario.nombre
                }" required>
            </div>
            <div class="mb-3">
                <label for="apellido1Usuario" class="form-label">Primer Apellido</label>
                <input type="text" class="form-control" id="apellido1Usuario" value="${
                  usuario.apellido1
                }" required>
            </div>
            <div class="mb-3">
                <label for="apellido2Usuario" class="form-label">Segundo Apellido</label>
                <input type="text" class="form-control" id="apellido2Usuario" value="${
                  usuario.apellido2 || ""
                }">
            </div>
            <div class="mb-3">
                <label for="mailUsuario" class="form-label">Email</label>
                <input type="email" class="form-control" id="mailUsuario" value="${
                  usuario.mail
                }" required>
            </div>
            <div class="mb-3">
                <label for="movilUsuario" class="form-label">Móvil</label>
                <input type="text" class="form-control" id="movilUsuario" value="${
                  usuario.movil || ""
                }">
            </div>
            <div class="mb-3">
                <label for="loginUsuario" class="form-label">Login</label>
                <input type="text" class="form-control" id="loginUsuario" value="${
                  usuario.login
                }" required>
            </div>
            <div class="mb-3">
                <label for="sexoUsuario" class="form-label">Sexo</label>
                <select class="form-control" id="sexoUsuario">
                    <option value="H" ${
                      usuario.sexo === "H" ? "selected" : ""
                    }>Hombre</option>
                    <option value="M" ${
                      usuario.sexo === "M" ? "selected" : ""
                    }>Mujer</option>
                </select>
            </div>
            <div class="d-grid gap-2">
                <button type="button" class="btn btn-primary" onclick="actualizarUsuario();">✏️ Actualizar Usuario</button>
                <button type="button" class="btn btn-secondary" onclick="cancelarFormulario();">❌ Cancelar</button>
            </div>
        </form>
    `;

  document.getElementById("formularioUsuario").innerHTML = formulario;
  document.getElementById("formularioUsuario").style.display = "block";
}

function guardarUsuario() {
  let parametros = "controlador=Usuarios&metodo=crearUsuario";
  parametros +=
    "&" +
    new URLSearchParams(
      new FormData(document.getElementById("formUsuario"))
    ).toString();

  fetch("CFrontal.php?" + parametros)
    .then((response) => response.text())
    .then((data) => {
      if (data.includes("exitosamente")) {
        alert("Usuario creado exitosamente");
        cancelarFormulario();
        verTodosUsuarios(); // Refrescar la lista
      } else {
        alert("Error al crear el usuario");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error al crear el usuario");
    });
}

function actualizarUsuario() {
  const datos = {
    controlador: "Usuarios",
    metodo: "actualizarUsuario",
    idUsuario: document.getElementById("idUsuario").value,
    nombre: document.getElementById("nombreUsuario").value,
    apellido1: document.getElementById("apellido1Usuario").value,
    apellido2: document.getElementById("apellido2Usuario").value,
    mail: document.getElementById("mailUsuario").value,
    movil: document.getElementById("movilUsuario").value,
    login: document.getElementById("loginUsuario").value,
    sexo: document.getElementById("sexoUsuario").value,
  };

  const params = new URLSearchParams(datos);

  fetch("CFrontal.php", {
    method: "POST",
    body: params,
  })
    .then((response) => response.text())
    .then((data) => {
      alert("Usuario actualizado exitosamente");
      cancelarFormulario();
      verTodosUsuarios(); // Refrescar la lista
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error al actualizar el usuario");
    });
}

function cancelarFormulario() {
  document.getElementById("formularioUsuario").style.display = "none";
  document.getElementById("formularioUsuario").innerHTML = "";
}

function eliminarUsuario(idUsuario, nombreUsuario) {
  // Confirmar eliminación
  if (
    confirm(
      "¿Está seguro de que desea eliminar al usuario '" +
        nombreUsuario +
        "'?\n\nEsta acción no se puede deshacer."
    )
  ) {
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
          alert("Usuario eliminado exitosamente");
          verTodosUsuarios(); // Refrescar la lista
        } else {
          alert("Error al eliminar el usuario");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al eliminar el usuario");
      });
  }
}

// --------------------------------------------------
// Funciones para la gestión de Productos (similares a Usuarios)
// --------------------------------------------------
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

function mostrarFormularioCrearProducto() {
  const formulario = `
        <form id="formProducto">
            <div class="mb-3">
                <label for="productoNombre" class="form-label">Producto</label>
                <input type="text" class="form-control" id="productoNombre" name="producto" required>
            </div>
            <div class="mb-3">
                <label for="productoDescripcion" class="form-label">Descripción</label>
                <textarea class="form-control" id="productoDescripcion" name="descripcion"></textarea>
            </div>
            <div class="mb-3">
                <label for="productoStock" class="form-label">Stock</label>
                <input type="number" class="form-control" id="productoStock" name="stock" value="0">
            </div>
            <div class="mb-3">
                <label for="productoPrecio" class="form-label">Precio Venta</label>
                <input type="number" step="0.01" class="form-control" id="productoPrecio" name="precioVenta" required>
            </div>
            <div class="d-grid gap-2">
                <button type="button" class="btn btn-primary" onclick="guardarProducto();">💾 Guardar Producto</button>
                <button type="button" class="btn btn-secondary" onclick="cancelarFormularioProducto();">❌ Cancelar</button>
            </div>
        </form>
    `;
  document.getElementById("formularioProducto").innerHTML = formulario;
  document.getElementById("formularioProducto").style.display = "block";
}

function editarProducto(idProducto) {
  // Hacer petición para obtener datos del usuario
  fetch(
    "CFrontal.php?controlador=Productos&metodo=obtenerProducto&idProducto=" +
      idProducto
  )
    .then((response) => response.json())
    .then((producto) => {
      mostrarFormularioEditarProducto(producto);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error al cargar los datos del producto");
    });
}

function mostrarFormularioEditarProducto(producto) {
  const formulario = `
        <form id="formProducto">
            <input type="hidden" id="idProducto" value="${producto.idProducto}">
            <div class="mb-3">
                <label for="productoNombre" class="form-label">Producto</label>
                <input type="text" class="form-control" id="productoNombre" value="${
                  producto.producto
                }" required>
            </div>
            <div class="mb-3">
                <label for="productoDescripcion" class="form-label">Descripción</label>
                <textarea class="form-control" id="productoDescripcion">${
                  producto.descripcion || ""
                }</textarea>
            </div>
            <div class="mb-3">
                <label for="productoStock" class="form-label">Stock</label>
                <input type="number" class="form-control" id="productoStock" value="${
                  producto.stock || 0
                }">
            </div>
            <div class="mb-3">
                <label for="productoPrecio" class="form-label">Precio Venta</label>
                <input type="number" step="0.01" class="form-control" id="productoPrecio" value="${
                  producto.precioVenta
                }">
            </div>
            <div class="d-grid gap-2">
                <button type="button" class="btn btn-primary" onclick="actualizarProducto();">✏️ Actualizar Producto</button>
                <button type="button" class="btn btn-secondary" onclick="cancelarFormularioProducto();">❌ Cancelar</button>
            </div>
        </form>
    `;
  document.getElementById("formularioProducto").innerHTML = formulario;
  document.getElementById("formularioProducto").style.display = "block";
}

function guardarProducto() {
  let parametros = "controlador=Productos&metodo=crearProducto";
  parametros +=
    "&" +
    new URLSearchParams(
      new FormData(document.getElementById("formProducto"))
    ).toString();
  fetch("CFrontal.php?" + parametros)
    .then((response) => response.text())
    .then((data) => {
      if (data.includes("exitosamente")) {
        alert("Producto creado exitosamente");
        cancelarFormularioProducto();
        verTodosProductos();
      } else {
        alert("Error al crear el producto");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error al crear el producto");
    });
}

function actualizarProducto() {
  const datos = {
    controlador: "Productos",
    metodo: "actualizarProducto",
    idProducto: document.getElementById("idProducto").value,
    producto: document.getElementById("productoNombre").value,
    descripcion: document.getElementById("productoDescripcion").value,
    stock: document.getElementById("productoStock").value,
    precioVenta: document.getElementById("productoPrecio").value,
  };
  const params = new URLSearchParams(datos);
  fetch("CFrontal.php", { method: "POST", body: params })
    .then((response) => response.text())
    .then((data) => {
      alert("Producto actualizado exitosamente");
      cancelarFormularioProducto();
      verTodosProductos();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error al actualizar el producto");
    });
}

function cancelarFormularioProducto() {
  document.getElementById("formularioProducto").style.display = "none";
  document.getElementById("formularioProducto").innerHTML = "";
}

function eliminarProducto(idProducto, nombreProducto) {
  if (
    confirm(
      "¿Está seguro de que desea eliminar el producto '" +
        nombreProducto +
        "' ?"
    )
  ) {
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
          alert("Producto eliminado correctamente");
          verTodosProductos();
        } else {
          alert("Error al eliminar el producto");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error al eliminar el producto");
      });
  }
}
