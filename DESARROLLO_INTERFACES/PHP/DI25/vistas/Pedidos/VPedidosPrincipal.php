<div id="capaPedidos">
    <div class="card mt-2">
        <div class="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Gestión de Pedidos</h5>
            <button class="btn btn-light btn-sm" onclick="mostrarFormularioCrearPedido()">+ Nuevo Pedido</button>
        </div>
        <div class="card-body">
            <!-- Formulario de búsqueda -->
             <form id="formularioBuscarPedidos" onsubmit="event.preventDefault(); buscarPedidos();" class="row g-2 align-items-center mb-3">
                <div class="col-auto">
                    <label for="fechaPedido" class="col-form-label">Fecha:</label>
                </div>
                <div class="col-auto">
                    <input type="date" id="fechaPedido" name="fecha" class="form-control form-control-sm">
                </div>
                <div class="col-auto">
                    <label for="estadoPedido" class="col-form-label">Estado:</label>
                </div>
                <div class="col-auto">
                    <select id="estadoPedido" name="estado" class="form-select form-select-sm">
                        <option value="">Todos</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Procesado">Procesado</option>
                        <option value="Enviado">Enviado</option>
                        <option value="Entregado">Entregado</option>
                    </select>
                </div>
                <!-- Filtro oculto para ID de usuario si fuera necesario -->
                <input type="hidden" name="idUsuario" id="filtroIdUsuario" value="">

                <div class="col-auto">
                    <button type="button" class="btn btn-primary btn-sm" onclick="buscarPedidos()">Buscar</button>
                    <button type="button" class="btn btn-outline-secondary btn-sm" onclick="limpiarBusquedaPedidos()">Limpiar</button>
                </div>
            </form>

            <div id="capaResultadosPedidos"></div>
            <div id="formularioPedido" style="display:none;"></div>
        </div>
    </div>
</div>

<script src="js/pedidos.js"></script>
<script>
    // Cargar listado inicial al mostrar la vista principal
    buscarPedidos();
</script>
