<?php
// Vistas/VPaginacion.php
// Parámetros esperados:
// $totalRegistros: Número total de registros de la consulta
// $pagActual: Página actual
// $tamPag: Tamaño de página (registros por página)
// $funcionCallback: Nombre de la función JS a llamar al cambiar de página (ej: 'buscarUsuarios')

// Calcular el número total de páginas
$totalPaginas = ceil($totalRegistros / $tamPag);

// Si no hay registros, no mostramos nada
if ($totalRegistros == 0) return;

// Asegurar límites
if ($pagActual < 1) $pagActual = 1;
if ($pagActual > $totalPaginas) $pagActual = $totalPaginas;

$pagAnterior = $pagActual - 1;
$pagSiguiente = $pagActual + 1;

// Iconos (usando caracteres Unicode o imágenes si se prefiere, aquí texto simple/unicode para portabilidad)
// Requerimientos: Uso de iconos para las direcciones.
?>
<div class="row align-items-center mt-3 border-top pt-2">
    <!-- Información de resultados -->
    <div class="col-md-4 text-start">
        <small class="text-muted">
            Mostrando <?php echo (($pagActual - 1) * $tamPag) + 1; ?> a <?php echo min($pagActual * $tamPag, $totalRegistros); ?> de <?php echo $totalRegistros; ?> resultados
        </small>
    </div>

    <!-- Controles de paginación -->
    <div class="col-md-4 text-center">
        <nav aria-label="Navegación de resultados">
            <ul class="pagination pagination-sm justify-content-center mb-0">
                
                <!-- Primera Página -->
                <li class="page-item <?php echo ($pagActual <= 1) ? 'disabled' : ''; ?>">
                    <button class="page-link" onclick="<?php echo $funcionCallback; ?>(1, <?php echo $tamPag; ?>)" title="Primera página">
                        &laquo;&laquo;
                    </button>
                </li>

                <!-- Página Anterior -->
                <li class="page-item <?php echo ($pagActual <= 1) ? 'disabled' : ''; ?>">
                    <button class="page-link" onclick="<?php echo $funcionCallback; ?>(<?php echo $pagAnterior; ?>, <?php echo $tamPag; ?>)" title="Anterior">
                        &laquo;
                    </button>
                </li>

                <!-- Selector de página actual manual -->
                 <li class="page-item active">
                    <span class="page-link bg-light text-dark border-0">
                        Pág. 
                        <input type="number" 
                               class="form-control d-inline-block px-1 py-0 text-center" 
                               style="width: 50px; height: 20px; font-size: 0.8rem;"
                               value="<?php echo $pagActual; ?>" 
                               min="1" 
                               max="<?php echo $totalPaginas; ?>"
                               onchange="if(this.value>=1 && this.value<=<?php echo $totalPaginas; ?>) <?php echo $funcionCallback; ?>(this.value, <?php echo $tamPag; ?>)">
                        / <?php echo $totalPaginas; ?>
                    </span>
                </li>

                <!-- Página Siguiente -->
                <li class="page-item <?php echo ($pagActual >= $totalPaginas) ? 'disabled' : ''; ?>">
                    <button class="page-link" onclick="<?php echo $funcionCallback; ?>(<?php echo $pagSiguiente; ?>, <?php echo $tamPag; ?>)" title="Siguiente">
                        &raquo;
                    </button>
                </li>

                <!-- Última Página -->
                <li class="page-item <?php echo ($pagActual >= $totalPaginas) ? 'disabled' : ''; ?>">
                    <button class="page-link" onclick="<?php echo $funcionCallback; ?>(<?php echo $totalPaginas; ?>, <?php echo $tamPag; ?>)" title="Última página">
                        &raquo;&raquo;
                    </button>
                </li>
            </ul>
        </nav>
    </div>

    <!-- Selector de registros por página -->
    <div class="col-md-4 text-end">
        <div class="input-group input-group-sm justify-content-end">
            <label class="input-group-text bg-transparent border-0" for="tamPagSelector">Resultados por pág:</label>
            <select class="form-select form-select-sm" 
                    id="tamPagSelector" 
                    style="max-width: 70px;"
                    onchange="<?php echo $funcionCallback; ?>(1, this.value)">
                <?php 
                $opciones = [5, 10, 15, 20, 50, 100];
                foreach($opciones as $op): 
                ?>
                    <option value="<?php echo $op; ?>" <?php echo ($tamPag == $op) ? 'selected' : ''; ?>>
                        <?php echo $op; ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>
    </div>
</div>
