/**
 * js/paginacion.js
 * Funcionalidad para gestionar la paginación en las vistas de listados.
 */

// Función para cambiar de página
// page: número de página al que se quiere ir
function cambiarPagina(page) {
    // Actualizar el campo oculto 'pagina' del formulario actual
    document.getElementById('pagina').value = page;
    // Volver a lanzar la búsqueda para refrescar el listado
    // Se asume que existe la función buscarUsuarios() o similar en el contexto
    // Para hacerlo genérico, buscamos el botón de submit o llamamos a la función de búsqueda
    
    // Una forma genérica es disparar el evento click del botón de buscar principal
    // O llamar a la función específica si sabemos cual es.
    // Dado que 'buscarUsuarios' es específica, intentaremos ser lo más genéricos posible.
    // En este proyecto, cada módulo tiene su función de búsqueda principal.
    // Comprobamos si existe buscarUsuarios (para el módulo Usuarios)
    if (typeof buscarUsuarios === 'function') {
        buscarUsuarios();
    }
    // Aquí se podrían añadir más condiciones para otros módulos (ej: buscarProductos)
}

// Función para cambiar el tamaño de página (número de resultados por página)
// size: nuevo tamaño de página
function cambiarTamPag(size) {
    // Actualizar el campo 'tam_pag'
    document.getElementById('tam_pag').value = size;
    // Resetear a la primera página para evitar offsets inválidos
    document.getElementById('pagina').value = 1;
    // Recargar listado
    if (typeof buscarUsuarios === 'function') {
        buscarUsuarios();
    }
}
