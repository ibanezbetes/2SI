// js/pedidos.js

function buscarPedidos(pagina = 1, tamPag = 10) {
    const params = `pagina=${pagina}&tam_pag=${tamPag}`;
    buscar("Pedidos", "getVistaListadoPedidos", "formularioBuscarPedidos", "capaResultadosPedidos", params);
}

function limpiarBusquedaPedidos() {
    document.getElementById("formularioBuscarPedidos").reset();
    buscarPedidos();
}

function mostrarFormularioCrearPedido() {
    // Primero cargamos lista de usuarios para el select
    fetch("CFrontal.php?controlador=Pedidos&metodo=getUsuariosCombo")
        .then(res => res.json())
        .then(usuarios => {
            let options = '<option value="">Seleccione Usuario</option>';
            usuarios.forEach(u => {
                options += `<option value="${u.idUsuario}">${u.nombre} ${u.apellido1}</option>`;
            });
            
            const html = `
    <!-- Overlay de fondo -->
    <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 2000;"></div>
    
    <!-- Modal Centrado -->
    <div class="p-4 rounded shadow" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 400px; z-index: 2001; background-color: var(--surface-color, #fff); color: var(--bs-body-color); border: 1px solid #ccc;">
                    <h4>Nuevo Pedido</h4>
                    <div id="msgPedido"></div>
                    <form id="formPedido">
                        <div class="mb-3">
                            <label class="form-label">Usuario</label>
                            <select class="form-select" id="idUsuarioPedido" name="idUsuario" required>
                                ${options}
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Fecha</label>
                            <input type="date" class="form-control" id="fechaNewPedido" name="fecha" value="${new Date().toISOString().split('T')[0]}" required>
                        </div>
                         <!-- En una versión completa aquí irían los detalles de productos -->
                        <div class="text-end">
                            <button type="button" class="btn btn-secondary" onclick="cerrarFormPedido()">Cancelar</button>
                            <button type="button" class="btn btn-primary" onclick="guardarPedido()">Guardar</button>
                        </div>
                    </form>
                </div>
            `;
            document.getElementById("formularioPedido").innerHTML = html;
            document.getElementById("formularioPedido").style.display = "block";
        })
        .catch(err => alert("Error cargando usuarios: " + err));
}

function cerrarFormPedido() {
    document.getElementById("formularioPedido").style.display = "none";
    document.getElementById("formularioPedido").innerHTML = "";
}

function guardarPedido() {
    const usuario = document.getElementById("idUsuarioPedido").value;
    const fecha = document.getElementById("fechaNewPedido").value;
    
    if(!usuario || !fecha) {
        mostrarError("msgPedido", "Usuario y Fecha requeridos");
        return;
    }
    
    let params = "controlador=Pedidos&metodo=crearPedido";
    params += "&" + new URLSearchParams(new FormData(document.getElementById("formPedido"))).toString();

    fetch("CFrontal.php?" + params)
        .then(res => res.text())
        .then(data => {
            if(data.includes("alert-success")){
                alert("Pedido creado");
                cerrarFormPedido();
                buscarPedidos();
            } else {
                 document.getElementById("msgPedido").innerHTML = data;
            }
        });
}

function editarPedido(idPedido) {
     fetch(`CFrontal.php?controlador=Pedidos&metodo=obtenerPedido&idPedido=${idPedido}`)
        .then(res => res.json())
        .then(pedido => {
            if(pedido.error) { alert(pedido.error); return; }
            
             const html = `
             <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 2000;"></div>
                <div class="p-4 rounded shadow" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 400px; z-index: 2001; background-color: var(--surface-color, #fff); color: var(--bs-body-color); border: 1px solid #ccc;">
                    <h4>Editar Pedido #${pedido.idPedido}</h4>
                    <div id="msgPedidoEdit"></div>
                    <form id="formPedidoEdit">
                        <input type="hidden" name="idPedido" value="${pedido.idPedido}">
                        <div class="mb-3">
                            <label class="form-label">Fecha</label>
                            <input type="date" class="form-control" name="fecha" value="${pedido.fecha}" required>
                        </div>
                         <div class="mb-3">
                            <label class="form-label">Estado</label>
                            <select class="form-select" name="estado">
                                <option value="Pendiente" ${pedido.estado=='Pendiente'?'selected':''}>Pendiente</option>
                                <option value="Procesado" ${pedido.estado=='Procesado'?'selected':''}>Procesado</option>
                                <option value="Enviado" ${pedido.estado=='Enviado'?'selected':''}>Enviado</option>
                                <option value="Entregado" ${pedido.estado=='Entregado'?'selected':''}>Entregado</option>
                            </select>
                        </div>
                        <div class="text-end">
                            <button type="button" class="btn btn-secondary" onclick="cerrarFormPedido()">Cancelar</button>
                            <button type="button" class="btn btn-primary" onclick="actualizarPedido()">Actualizar</button>
                        </div>
                    </form>
                </div>
            `;
            document.getElementById("formularioPedido").innerHTML = html;
            document.getElementById("formularioPedido").style.display = "block";
        });
}

function actualizarPedido(){
     let params = "controlador=Pedidos&metodo=actualizarPedido";
    params += "&" + new URLSearchParams(new FormData(document.getElementById("formPedidoEdit"))).toString();

    fetch("CFrontal.php?" + params)
        .then(res => res.text())
        .then(data => {
            if(data.indexOf("alert-success") !== -1){
                alert("Pedido actualizado");
                cerrarFormPedido();
                buscarPedidos();
            } else {
                 document.getElementById("msgPedidoEdit").innerHTML = data;
            }
        });
}

function eliminarPedido(id) {
    if(confirm("¿Eliminar pedido " + id + "?")) {
        fetch("CFrontal.php?controlador=Pedidos&metodo=eliminarPedido&idPedido=" + id)
        .then(res => res.text())
        .then(data => {
            buscarPedidos();
        });
    }
}
