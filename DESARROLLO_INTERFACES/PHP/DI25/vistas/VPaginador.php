<?php
/**
 * Vistas/VPaginador.php
 * Vista reutilizable para la paginación de resultados.
 * 
 * Espera recibir en $datos:
 * - totalRegistros: int
 * - pagActual: int
 * - tamPag: int
 */

// Extraer variables para facilitar su uso
$totalRegistros = isset($datos['totalRegistros']) ? $datos['totalRegistros'] : 0;
$pagActual = isset($datos['pagActual']) ? $datos['pagActual'] : 1;
$tamPag = isset($datos['tamPag']) ? $datos['tamPag'] : 5;

// Calcular número total de páginas
$totalPaginas = ceil($totalRegistros / $tamPag);

// Si no hay registros, no mostrar nada
if ($totalRegistros == 0) return;

// Calcular rango de visualización (opcional, para "Mostrando X-Y de Z")
$inicio = ($pagActual - 1) * $tamPag + 1;
$fin = min($inicio + $tamPag - 1, $totalRegistros);
?>

<div class="row mt-3 align-items-center">
    <!-- Información de resultados y selector de tamaño -->
    <div class="col-md-4 mb-2">
        <div class="d-flex align-items-center">
            <span class="me-2">Mostrando <?php echo $inicio; ?>-<?php echo $fin; ?> de <?php echo $totalRegistros; ?></span>
            <select class="form-select form-select-sm w-auto" onchange="cambiarTamPag(this.value)">
                <option value="5" <?php echo $tamPag==5?'selected':''; ?>>5</option>
                <option value="10" <?php echo $tamPag==10?'selected':''; ?>>10</option>
                <option value="20" <?php echo $tamPag==20?'selected':''; ?>>20</option>
                <option value="50" <?php echo $tamPag==50?'selected':''; ?>>50</option>
            </select>
        </div>
    </div>

    <!-- Navegación de páginas -->
    <div class="col-md-8">
        <nav aria-label="Navegación de páginas">
            <ul class="pagination justify-content-end mb-0">
                
                <!-- Botón Primera Página -->
                <li class="page-item <?php echo ($pagActual <= 1) ? 'disabled' : ''; ?>">
                    <button class="page-link" onclick="cambiarPagina(1)" aria-label="Primera">
                        <span aria-hidden="true">&laquo;&laquo;</span>
                    </button>
                </li>

                <!-- Botón Anterior -->
                <li class="page-item <?php echo ($pagActual <= 1) ? 'disabled' : ''; ?>">
                    <button class="page-link" onclick="cambiarPagina(<?php echo $pagActual - 1; ?>)" aria-label="Anterior">
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>

                <!-- Páginas Numéricas (Mostrar ventana alrededor de la actual) -->
                <?php
                $rango = 2; // Número de páginas a mostrar a cada lado
                $desde = max(1, $pagActual - $rango);
                $hasta = min($totalPaginas, $pagActual + $rango);

                if ($desde > 1) {
                    echo '<li class="page-item disabled"><span class="page-link">...</span></li>';
                }

                for ($i = $desde; $i <= $hasta; $i++) {
                    $active = ($i == $pagActual) ? 'active' : '';
                    echo '<li class="page-item '.$active.'"><button class="page-link" onclick="cambiarPagina('.$i.')">'.$i.'</button></li>';
                }

                if ($hasta < $totalPaginas) {
                    echo '<li class="page-item disabled"><span class="page-link">...</span></li>';
                }
                ?>

                <!-- Botón Siguiente -->
                <li class="page-item <?php echo ($pagActual >= $totalPaginas) ? 'disabled' : ''; ?>">
                    <button class="page-link" onclick="cambiarPagina(<?php echo $pagActual + 1; ?>)" aria-label="Siguiente">
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>

                <!-- Botón Última Página -->
                <li class="page-item <?php echo ($pagActual >= $totalPaginas) ? 'disabled' : ''; ?>">
                    <button class="page-link" onclick="cambiarPagina(<?php echo $totalPaginas; ?>)" aria-label="Última">
                        <span aria-hidden="true">&raquo;&raquo;</span>
                    </button>
                </li>

            </ul>
        </nav>
    </div>
</div>
