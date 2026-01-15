function buscarPedidos(pagina = 1, tamPag = 5) {
  const params = `pagina=${pagina}&tam_pag=${tamPag}`;
  buscar("Pedidos", "getVistaListadoPedidos", "formularioBuscarPedido", "capaResultadosPedidos", params);
}

function verTodosPedidos() {
  document.getElementById("formularioBuscarPedido").reset();
  buscar("Pedidos", "getVistaListadoPedidos", "formularioBuscarPedido", "capaResultadosPedidos");
}

let listaProductos = [];
let listaUsuarios = [];
let lineasPedido = [];

function cargarDatosAuxiliares() {
    return Promise.all([
        fetch('CFrontal.php?controlador=Pedidos&metodo=getUsuariosJSON').then(r => r.json()),
        fetch('CFrontal.php?controlador=Pedidos&metodo=getProductosJSON').then(r => r.json())
    ]).then(([usuarios, productos]) => {
        listaUsuarios = usuarios;
        listaProductos = productos;
    });
}

function mostrarFormularioCrearPedido() {
    cargarDatosAuxiliares().then(() => {
        lineasPedido = []; // Reset lines
        renderFormularioPedido();
    });
}

function renderFormularioPedido(datos = null) {
    // Generate Select Options
    let optsUsuarios = '<option value="">Seleccionar Usuario...</option>';
    listaUsuarios.forEach(u => {
        const sel = (datos && datos.idUsuario == u.idUsuario) ? 'selected' : '';
        optsUsuarios += `<option value="${u.idUsuario}" ${sel}>${u.nombre} ${u.apellido1}</option>`;
    });

    let optsProductos = '<option value="">Seleccionar Producto...</option>';
    listaProductos.forEach(p => {
        optsProductos += `<option value="${p.idProducto}" data-precio="${p.precioVenta}">${p.producto} (${p.precioVenta}€)</option>`;
    });

    // Date
    const today = new Date().toISOString().split('T')[0];
    const fechaVal = datos ? datos.fecha : today;
    
    // Status
    const estP = (!datos || datos.estado == 'P') ? 'selected' : '';
    const estC = (datos && datos.estado == 'C') ? 'selected' : '';

    const html = `
    <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1040;"></div>
    <div class="p-4 rounded shadow" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 60%; min-width: 600px; max-height: 90vh; overflow-y: auto; z-index: 1050; background-color: var(--surface-color, #fff); color: var(--bs-body-color, #000); border: 1px solid #ccc;">
        <h4>${datos ? 'Editar' : 'Nuevo'} Pedido</h4>
        <div id="msjPedido"></div>
        <form id="formPedido">
            <input type="hidden" id="idPedido" value="${datos ? datos.idPedido : ''}">
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label>Usuario</label>
                    <select class="form-control" id="pedIdUsuario">${optsUsuarios}</select>
                </div>
                <div class="col-md-3 mb-3">
                    <label>Fecha</label>
                    <input type="date" class="form-control" id="pedFecha" value="${fechaVal}">
                </div>
                <div class="col-md-3 mb-3">
                    <label>Estado</label>
                    <select class="form-control" id="pedEstado">
                        <option value="P" ${estP}>Pendiente</option>
                        <option value="C" ${estC}>Completado</option>
                    </select>
                </div>
            </div>
            
            <hr>
            <h5>Detalles</h5>
            <div class="row mb-2">
                <div class="col-6">
                    <select class="form-control" id="neuProd">${optsProductos}</select>
                </div>
                <div class="col-2">
                    <input type="number" class="form-control" id="neuCant" placeholder="Cant" value="1" min="1">
                </div>
                <div class="col-2">
                     <button type="button" class="btn btn-secondary w-100" onclick="addLinea()">Añadir</button>
                </div>
            </div>
            
            <table class="table table-sm table-bordered">
                <thead><tr><th>Producto</th><th>Cant</th><th>Precio</th><th>Subtotal</th><th>X</th></tr></thead>
                <tbody id="tablaDetalles"></tbody>
                <tfoot><tr><th colspan="3" class="text-end">Total:</th><th id="totalPedido">0.00</th><th></th></tr></tfoot>
            </table>

            <div class="text-end mt-3">
                <button type="button" class="btn btn-primary" onclick="guardarPedido()">Guardar</button>
                <button type="button" class="btn btn-secondary" onclick="cerrarFormPedido()">Cancelar</button>
            </div>
        </form>
    </div>
    `;
    
    document.getElementById("formularioPedido").innerHTML = html;
    document.getElementById("formularioPedido").style.display = 'block';
    
    renderLineas();
}

function addLinea(){
    const sel = document.getElementById("neuProd");
    const idProd = sel.value;
    const cant = parseInt(document.getElementById("neuCant").value);
    
    if(!idProd || cant < 1) return;
    
    const opt = sel.options[sel.selectedIndex];
    const precio = parseFloat(opt.getAttribute('data-precio'));
    const nombre = opt.text;
    
    lineasPedido.push({
        idProducto: idProd,
        producto: nombre,
        cantidad: cant,
        precioUnitario: precio
    });
    
    renderLineas();
}

function removeLinea(idx){
    lineasPedido.splice(idx, 1);
    renderLineas();
}

function renderLineas(){
    const tbody = document.getElementById("tablaDetalles");
    let html = '';
    let total = 0;
    
    lineasPedido.forEach((l, idx) => {
        const sub = l.cantidad * l.precioUnitario;
        total += sub;
        html += `<tr>
            <td>${l.producto}</td>
            <td>${l.cantidad}</td>
            <td>${l.precioUnitario.toFixed(2)}</td>
            <td>${sub.toFixed(2)}</td>
            <td><button type="button" class="btn btn-sm btn-danger py-0" onclick="removeLinea(${idx})">x</button></td>
        </tr>`;
    });
    
    tbody.innerHTML = html;
    document.getElementById("totalPedido").innerText = total.toFixed(2) + ' €';
}

function cerrarFormPedido(){
    document.getElementById("formularioPedido").style.display = 'none';
    document.getElementById("formularioPedido").innerHTML = '';
}

function guardarPedido(){
    const idUsuario = document.getElementById("pedIdUsuario").value;
    const fecha = document.getElementById("pedFecha").value;
    const estado = document.getElementById("pedEstado").value;
    const idPedido = document.getElementById("idPedido").value; // Empty if new

    if(!idUsuario || !fecha){
        alert("Usuario y Fecha obligatorios"); return;
    }
    
    if(lineasPedido.length === 0 && !idPedido){
        if(!confirm("¿Guardar pedido sin lineas?")) return;
    }

    const detallesJson = JSON.stringify(lineasPedido);
    
    // Si ID existe, Metodo actualizar (simplificado: solo cabecera), sino crear
    const metodo = idPedido ? 'actualizarPedido' : 'crearPedido';
    
    const datos = {
        controlador: 'Pedidos',
        metodo: metodo,
        idUsuario: idUsuario,
        fecha: fecha,
        estado: estado,
        detalles: detallesJson
    };
    if(idPedido) datos.idPedido = idPedido;

    fetch("CFrontal.php", {
        method: "POST",
        body: new URLSearchParams(datos)
    })
    .then(r => r.text())
    .then(res => {
         // Show success msg or logic
         if(res.includes('exitosamente') || res.includes('actualizado')){
             alert("Guardado");
             cerrarFormPedido();
             verTodosPedidos();
         }else{
             alert("Error: " + res); // Debug
         }
    });
}

function editarPedido(idPedido) {
    cargarDatosAuxiliares().then(() => {
        fetch(`CFrontal.php?controlador=Pedidos&metodo=obtenerPedido&idPedido=${idPedido}`)
        .then(r => r.json())
        .then(pedido => {
            if(pedido.error){
                alert(pedido.error);
            }else{
                lineasPedido = pedido.detalles.map(d => ({
                    idProducto: d.idProducto,
                    producto: d.producto, // Needs to come from join
                    cantidad: parseInt(d.cantidad),
                    precioUnitario: parseFloat(d.precioUnitario)
                }));
                renderFormularioPedido(pedido);
            }
        });
    });
}
