<?php
    echo'
    <script src="js/paginacion.js"></script>
    <div class="container-fluid">
        <!-- Formulario de búsqueda de usuarios -->
        <form id="formularioBuscar">
            <!-- Campos ocultos para paginación -->
            <input type="hidden" id="pagina" name="pagina" value="1">
            <input type="hidden" id="tam_pag" name="tam_pag" value="5">

            <div class="row">
                <div class="col-md-6 col-sm-12">
                    <label for="nombre" class="form-label">Buscar por Nombre:</label>
                    <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Buscar en campo nombre...">
                </div>
                <div class="col-md-6 col-sm-12">
                    <label for="email" class="form-label">Buscar por Mail:</label>
                    <input type="text" class="form-control" id="email" name="email" placeholder="Buscar en campo mail...">
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-12 text-center">
                    <button type="button" class="btn btn-primary" onclick="buscarUsuarios();">
                        Buscar Usuarios
                    </button>
                    <button type="button" class="btn btn-info ms-2" onclick="verTodosUsuarios();">
                        Ver Todos
                    </button>
                    <button type="button" class="btn btn-secondary ms-2" onclick="limpiarBusqueda();">
                        Limpiar
                    </button>
                    <button type="button" class="btn btn-success ms-2" onclick="mostrarFormularioCrear();">
                        Crear Nuevo Usuario
                    </button>
                </div>
            </div>
        </form>
        <div class="row mt-4">
            <div class="col-md-12">
                <!-- Contenedor para el formulario de crear/editar usuario (oculto por defecto) -->
                <div id="formularioUsuario" style="display:none;" class="mb-4">
                    <!-- Aquí aparecerá el formulario de creación/edición -->
                </div>
                <!-- Contenedor donde se mostrará la tabla de resultados -->
                <div id="capaResultadosBusqueda">
                    <p class="text-muted text-center">Utilice los campos de búsqueda para encontrar usuarios</p>
                </div>
            </div>
        </div>
    </div>

    ';

?>