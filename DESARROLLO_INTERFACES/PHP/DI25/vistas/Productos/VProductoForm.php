<?php
    // Vista formulario producto. Usa $datos['producto'] si existe para editar
    // Verificar si estamos editando un producto existente
    $p = array();
    if(isset($datos) && isset($datos['producto']) && is_array($datos['producto'])){
        $p = $datos['producto'];
    }

    // Asignar valores a variables para rellenar el formulario
    $id = isset($p['idProducto']) ? $p['idProducto'] : '';
    $producto = isset($p['producto']) ? $p['producto'] : '';
    $descripcion = isset($p['descripcion']) ? $p['descripcion'] : '';
    $stock = isset($p['stock']) ? $p['stock'] : 0;
    $precio = isset($p['precioVenta']) ? $p['precioVenta'] : '';

    echo '<form id="formProducto">';
    if($id != '') echo '<input type="hidden" name="idProducto" id="idProducto" value="'.$id.'">';
    echo '    <div class="mb-3">
                <label for="productoNombre" class="form-label">Producto</label>
                <input type="text" class="form-control" id="productoNombre" name="producto" value="'.htmlspecialchars($producto).'" required>
            </div>
            <div class="mb-3">
                <label for="productoDescripcion" class="form-label">Descripción</label>
                <textarea class="form-control" id="productoDescripcion" name="descripcion">'.htmlspecialchars($descripcion).'</textarea>
            </div>
            <div class="mb-3">
                <label for="productoStock" class="form-label">Stock</label>
                <input type="number" class="form-control" id="productoStock" name="stock" value="'.$stock.'">
            </div>
            <div class="mb-3">
                <label for="productoPrecio" class="form-label">Precio Venta</label>
                <input type="number" step="0.01" class="form-control" id="productoPrecio" name="precioVenta" value="'.$precio.'" required>
            </div>';

    if($id==''){
        echo '    <div class="d-grid gap-2">
                    <button type="button" class="btn btn-primary" onclick="guardarProducto();">💾 Guardar Producto</button>
                    <button type="button" class="btn btn-secondary" onclick="cancelarFormularioProducto();">❌ Cancelar</button>
                </div>';
    }else{
        echo '    <div class="d-grid gap-2">
                    <button type="button" class="btn btn-primary" onclick="actualizarProducto();">✏️ Actualizar Producto</button>
                    <button type="button" class="btn btn-secondary" onclick="cancelarFormularioProducto();">❌ Cancelar</button>
                </div>';
    }

    echo '</form>';
?>