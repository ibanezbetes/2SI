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
                    <button type="button" class="page-link" onclick="<?php echo $funcionCallback; ?>(1, <?php echo $tamPag; ?>)" title="Primera página">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                            <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                    </button>
                </li>

                <!-- Página Anterior -->
                <li class="page-item <?php echo ($pagActual <= 1) ? 'disabled' : ''; ?>">
                    <button type="button" class="page-link" onclick="<?php echo $funcionCallback; ?>(<?php echo $pagAnterior; ?>, <?php echo $tamPag; ?>)" title="Anterior">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                        </svg>
                    </button>
                </li>

                <!-- Selector de página actual manual -->
                 <li class="page-item active">
                    <span class="page-link border-0">
                        Pág. 
                        <input type="number" 
                               class="d-inline-block px-1 py-0 text-center" 
                               style="width: 50px; height: 20px; font-size: 0.8rem; border-radius: 3px;"
                               value="<?php echo $pagActual; ?>" 
                               min="1" 
                               max="<?php echo $totalPaginas; ?>"
                               onchange="if(this.value>=1 && this.value<=<?php echo $totalPaginas; ?>) <?php echo $funcionCallback; ?>(this.value, <?php echo $tamPag; ?>)">
                        / <?php echo $totalPaginas; ?>
                    </span>
                </li>

                <!-- Página Siguiente -->
                <li class="page-item <?php echo ($pagActual >= $totalPaginas) ? 'disabled' : ''; ?>">
                    <button type="button" class="page-link" onclick="<?php echo $funcionCallback; ?>(<?php echo $pagSiguiente; ?>, <?php echo $tamPag; ?>)" title="Siguiente">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                </li>

                <!-- Última Página -->
                <li class="page-item <?php echo ($pagActual >= $totalPaginas) ? 'disabled' : ''; ?>">
                    <button type="button" class="page-link" onclick="<?php echo $funcionCallback; ?>(<?php echo $totalPaginas; ?>, <?php echo $tamPag; ?>)" title="Última página">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
                            <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    </div>

    <!-- Selector de registros por página -->
    <div class="col-md-4 text-end">
        <div class="input-group input-group-sm justify-content-end">
            <label class="input-group-text bg-transparent border-0 text-white" for="tamPagSelector">Resultados por pág:</label>
            <select class="form-select form-select-sm bg-dark text-white border-secondary" 
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
