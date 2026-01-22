<div class="container-fluid">
  <div class="row justify-content-center">
    <div class="col-lg-8">
        <!-- Formulario de búsqueda de pedidos -->
        <form id="formularioBuscarPedido">
            <!-- Campos ocultos para paginación ELIMINADOS para evitar conflictos con JS -->

            <div class="row">
                <div class="col-md-6 col-sm-12">
                    <label for="filtroUsuario" class="form-label">Buscar por Usuario:</label>
                    <input type="text" class="form-control" id="filtroUsuario" name="usuario" placeholder="Nombre de usuario...">
                </div>
                 <div class="col-md-6 col-sm-12">
                    <label for="filtroFecha" class="form-label">Fecha (YYYY-MM-DD):</label>
                    <input type="date" class="form-control" id="filtroFecha" name="fecha">
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-12 text-center">
                    <button type="button" class="btn btn-primary" onclick="buscarPedidos();">
                        Buscar Pedidos
                    </button>
                    <button type="button" class="btn btn-info ms-2" onclick="verTodosPedidos();">
                        Ver Todos
                    </button>
                    <button type="button" class="btn btn-success ms-2" onclick="mostrarFormularioCrearPedido();">
                        Crear Nuevo Pedido
                    </button>
                </div>
            </div>
        </form>
        <div class="row mt-4">
            <div class="col-md-12">
                <!-- Contenedor para el formulario de crear/editar pedido (oculto por defecto) -->
                <div id="formularioPedido" style="display:none;" class="mb-4">
                </div>
                <!-- Contenedor donde se mostrará la tabla de resultados -->
                <div id="capaResultadosPedidos">
                    <p class="text-muted text-center">Utilice los campos de búsqueda para encontrar pedidos</p>
                </div>
            </div>
        </div>
    </div>
  </div>
</div>
