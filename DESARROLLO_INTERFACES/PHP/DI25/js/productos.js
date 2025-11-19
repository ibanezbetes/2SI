function buscarProductos() {
  buscar("Productos", "getVistaListadoProductos", "formularioBuscarProducto", "capaResultadosProductos");
}

function verTodosProductos() {
  document.getElementById("formularioBuscarProducto").reset();
  buscar("Productos", "getVistaListadoProductos", "formularioBuscarProducto", "capaResultadosProductos");
}

function mostrarFormularioCrearProducto() {
  const formulario = `
    <div id="mensajesProducto"></div>
    <form id="formProducto">
      <div class="mb-3">
        <label class="form-label">Producto *</label>
        <input type="text" class="form-control" id="productoNombre" name="producto" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Descripción</label>
        <textarea class="form-control" id="productoDescripcion" name="descripcion" rows="3"></textarea>
      </div>
      <div class="mb-3">
        <label class="form-label">Stock</label>
        <input type="number" class="form-control" id="productoStock" name="stock" value="0">
      </div>
      <div class="mb-3">
        <label class="form-label">Precio *</label>
        <input type="number" step="0.01" class="form-control" id="productoPrecio" name="precioVenta" required>
      </div>
      <div class="d-grid gap-2">
        <button type="button" class="btn btn-primary" onclick="guardarProducto();">Guardar</button>
        <button type="button" class="btn btn-secondary" onclick="cancelarFormularioProducto();">Cancelar</button>
      </div>
    </form>
  `;
  document.getElementById("formularioProducto").innerHTML = formulario;
  document.getElementById("formularioProducto").style.display = "block";
}

function editarProducto(idProducto) {
  fetch(`CFrontal.php?controlador=Productos&metodo=obtenerProducto&idProducto=${idProducto}`)
    .then((response) => response.json())
    .then((producto) => {
      mostrarFormularioEditarProducto(producto);
    });
}

function mostrarFormularioEditarProducto(producto) {
  const formulario = `
    <div id="mensajesProducto"></div>
    <form id="formProducto">
      <input type="hidden" id="idProducto" value="${producto.idProducto}">
      <div class="mb-3">
        <label class="form-label">Producto *</label>
        <input type="text" class="form-control" id="productoNombre" value="${producto.producto}" required>
      </div>
      <div class="mb-3">
        <label class="form-label">Descripción</label>
        <textarea class="form-control" id="productoDescripcion" rows="3">${producto.descripcion || ""}</textarea>
      </div>
      <div class="mb-3">
        <label class="form-label">Stock</label>
        <input type="number" class="form-control" id="productoStock" value="${producto.stock || 0}">
      </div>
      <div class="mb-3">
        <label class="form-label">Precio *</label>
        <input type="number" step="0.01" class="form-control" id="productoPrecio" value="${producto.precioVenta}" required>
      </div>
      <div class="d-grid gap-2">
        <button type="button" class="btn btn-primary" onclick="actualizarProducto();">Actualizar</button>
        <button type="button" class="btn btn-secondary" onclick="cancelarFormularioProducto();">Cancelar</button>
      </div>
    </form>
  `;
  document.getElementById("formularioProducto").innerHTML = formulario;
  document.getElementById("formularioProducto").style.display = "block";
}

function guardarProducto() {
  limpiarMensajes("mensajesProducto");
  
  const producto = document.getElementById("productoNombre").value.trim();
  const precio = document.getElementById("productoPrecio").value.trim();
  
  if (!producto || !precio) {
    mostrarError("mensajesProducto", "El nombre y precio son obligatorios");
    return;
  }
  
  let parametros = "controlador=Productos&metodo=crearProducto";
  parametros += "&" + new URLSearchParams(new FormData(document.getElementById("formProducto"))).toString();
  
  fetch("CFrontal.php?" + parametros)
    .then((response) => response.text())
    .then((data) => {
      if (data.includes("exitosamente")) {
        mostrarExito("mensajesProducto", "Producto creado");
        setTimeout(() => {
          cancelarFormularioProducto();
          verTodosProductos();
        }, 1500);
      } else {
        mostrarError("mensajesProducto", "Error al crear");
      }
    });
}

function actualizarProducto() {
  limpiarMensajes("mensajesProducto");
  
  const datos = {
    controlador: "Productos",
    metodo: "actualizarProducto",
    idProducto: document.getElementById("idProducto").value,
    producto: document.getElementById("productoNombre").value.trim(),
    descripcion: document.getElementById("productoDescripcion").value.trim(),
    stock: document.getElementById("productoStock").value,
    precioVenta: document.getElementById("productoPrecio").value
  };
  
  fetch("CFrontal.php", { method: "POST", body: new URLSearchParams(datos) })
    .then((response) => response.text())
    .then((data) => {
      if (data.includes("exitosamente")) {
        mostrarExito("mensajesProducto", "Producto actualizado");
        setTimeout(() => {
          cancelarFormularioProducto();
          verTodosProductos();
        }, 1500);
      } else {
        mostrarError("mensajesProducto", "Error al actualizar");
      }
    });
}

function cancelarFormularioProducto() {
  document.getElementById("formularioProducto").style.display = "none";
  document.getElementById("formularioProducto").innerHTML = "";
}

function eliminarProducto(idProducto, nombreProducto) {
  if (confirm(`¿Eliminar '${nombreProducto}'?`)) {
    const datos = {
      controlador: "Productos",
      metodo: "eliminarProducto",
      idProducto: idProducto
    };
    
    fetch("CFrontal.php", { method: "POST", body: new URLSearchParams(datos) })
      .then((response) => response.text())
      .then((data) => {
        if (data.includes("exitosamente")) {
          mostrarExito("capaResultadosProductos", "Producto eliminado");
          setTimeout(() => verTodosProductos(), 1500);
        } else {
          mostrarError("capaResultadosProductos", "Error al eliminar");
        }
      });
  }
}
