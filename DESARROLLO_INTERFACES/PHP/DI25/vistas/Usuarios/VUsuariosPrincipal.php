<?php
    echo'
    <div class="container-fluid">
        <form id="formularioBuscar">
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
                        🔍 Buscar Usuarios
                    </button>
                    <button type="button" class="btn btn-success ms-2" onclick="verTodosUsuarios();">
                        👥 Ver Todos
                    </button>
                    <button type="button" class="btn btn-secondary ms-2" onclick="limpiarBusqueda();">
                        ❌ Limpiar
                    </button>
                </div>
            </div>
        </form>
        <div class="row mt-4">
            <div class="col-md-8">
                <div id="capaResultadosBusqueda">
                    <p class="text-muted text-center">Utilice los campos de búsqueda para encontrar usuarios</p>
                </div>
            </div>
            <div class="col-md-4">
                <div id="capaEditarCrear">
                    <div class="card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">Gestión de Usuario</h5>
                        </div>
                        <div class="card-body">
                            <button type="button" class="btn btn-success w-100 mb-2" onclick="mostrarFormularioCrear();">
                                ➕ Crear Nuevo Usuario
                            </button>
                            <div id="formularioUsuario" style="display:none;">
                                <!-- Aquí aparecerá el formulario -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    ';

?>