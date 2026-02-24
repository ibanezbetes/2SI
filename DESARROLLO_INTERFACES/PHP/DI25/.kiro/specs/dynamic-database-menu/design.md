# Design Document

## Overview

This design document specifies the technical implementation for two main features:

1. **Dynamic Database-Driven Menu System**: Replaces the static HTML menu with a database-driven solution that loads menu items dynamically while maintaining Bootstrap 5.3.8 styling and functionality.

2. **Orders Management Module (Pedidos)**: A complete master-detail CRUD module for managing orders and their line items, following the established MVC pattern used in the Users module.

Both features integrate seamlessly with the existing PHP MVC application structure, using the Front Controller pattern (CFrontal.php), the DAO class for database access, and AJAX for dynamic content loading.

## Architecture

### System Architecture

The application follows a classic MVC (Model-View-Controller) architecture with a Front Controller pattern:

```
Client (Browser)
    ↓ HTTP Request
index.php (Main Entry Point)
    ↓ AJAX Request
CFrontal.php (Front Controller)
    ↓ Routes to
Controller Layer (CMenus, CPedidos, CUsuarios)
    ↓ Uses
Model Layer (DAO)
    ↓ Queries
Database (MySQL: db_di25)
    ↑ Returns Data
Controller Layer
    ↓ Passes Data to
View Layer (Vista::render)
    ↓ HTML Response
Client (Browser)
```

### Request Flow

1. **Initial Page Load**: index.php loads with static menu and empty content area
2. **Menu Click**: JavaScript function calls obtenerVista() with controller and method
3. **AJAX Request**: Sent to CFrontal.php with parameters
4. **Routing**: CFrontal.php instantiates the controller and calls the method
5. **Data Retrieval**: Controller uses Model/DAO to query database
6. **View Rendering**: Controller passes data to Vista::render()
7. **Response**: HTML is returned and injected into the target div


## Components and Interfaces

### PART A: Dynamic Menu System Components

#### 1. Database Table: menus

**Purpose**: Store all menu items (both level 1 and level 2) in a single table with hierarchical relationships.

**Schema**:
```sql
CREATE TABLE menus (
    idOpcion INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    etiqueta VARCHAR(100) NOT NULL,
    idPadre INT UNSIGNED NULL,
    posicion INT NOT NULL DEFAULT 0,
    accion VARCHAR(255) NULL,
    activo CHAR(1) NOT NULL DEFAULT 'S',
    INDEX idx_padre (idPadre),
    INDEX idx_activo_posicion (activo, posicion)
);
```

**Field Descriptions**:
- `idOpcion`: Primary key, auto-increment
- `etiqueta`: Display text for the menu item (e.g., "Home", "Usuarios")
- `idPadre`: Foreign key to parent menu item (NULL for level 1 items)
- `posicion`: Display order (lower numbers appear first)
- `accion`: JavaScript function call or URL (e.g., "obtenerVista('Usuarios','getVistaUsuariosPrincipal','capaContenido')")
- `activo`: 'S' for active, 'N' for inactive

**Sample Data**:
```sql
INSERT INTO menus (etiqueta, idPadre, posicion, accion, activo) VALUES
('Home', NULL, 1, '#', 'S'),
('Features', NULL, 2, '#', 'S'),
('Pricing', NULL, 3, '#', 'S'),
('Mtto.Datos', NULL, 4, NULL, 'S'),
('Usuarios', 4, 1, "obtenerVista('Usuarios','getVistaUsuariosPrincipal','capaContenido')", 'S'),
('Pedidos', 4, 2, "obtenerVista('Pedidos','getVistaPedidosPrincipal','capaContenido')", 'S');
```


#### 2. Model: MMenus (modelos/MMenus.php)

**Purpose**: Handle all database operations for menu data retrieval.

**Class Structure**:
```php
class MMenus {
    private $dao;
    
    public function __construct() {
        $this->dao = new DAO();
    }
    
    public function obtenerMenusActivos() {
        // Returns all active menu items ordered by position
    }
    
    public function obtenerMenusNivel1() {
        // Returns only level 1 items (idPadre IS NULL)
    }
    
    public function obtenerSubmenus($idPadre) {
        // Returns level 2 items for a specific parent
    }
}
```

**Method Details**:

**obtenerMenusActivos()**:
- SQL: `SELECT * FROM menus WHERE activo='S' ORDER BY posicion ASC`
- Returns: Array of all active menu items
- Used by: Controller to get all menu data at once

**obtenerMenusNivel1()**:
- SQL: `SELECT * FROM menus WHERE activo='S' AND idPadre IS NULL ORDER BY posicion ASC`
- Returns: Array of level 1 menu items only
- Used by: Controller to build menu hierarchy

**obtenerSubmenus($idPadre)**:
- SQL: `SELECT * FROM menus WHERE activo='S' AND idPadre=? ORDER BY posicion ASC`
- Parameters: $idPadre (int)
- Returns: Array of submenu items for the given parent
- Used by: Controller to get children for each level 1 item


#### 3. Controller: CMenus (controladores/CMenus.php)

**Purpose**: Handle menu-related requests and prepare data for views.

**Class Structure**:
```php
class CMenus extends Controlador {
    private $modelo;
    
    public function __construct() {
        $this->modelo = new MMenus();
    }
    
    public function obtenerMenuDinamico($datos=array()) {
        // Retrieves menu data and organizes it hierarchically
        // Passes structured data to the view
    }
}
```

**Method Details**:

**obtenerMenuDinamico($datos=array())**:
- Retrieves all level 1 menu items using `$this->modelo->obtenerMenusNivel1()`
- For each level 1 item, retrieves its submenus using `$this->modelo->obtenerSubmenus($idOpcion)`
- Builds a hierarchical array structure:
  ```php
  $menuEstructurado = [
      [
          'item' => ['idOpcion' => 1, 'etiqueta' => 'Home', ...],
          'submenus' => []
      ],
      [
          'item' => ['idOpcion' => 4, 'etiqueta' => 'Mtto.Datos', ...],
          'submenus' => [
              ['idOpcion' => 5, 'etiqueta' => 'Usuarios', ...],
              ['idOpcion' => 6, 'etiqueta' => 'Pedidos', ...]
          ]
      ]
  ]
  ```
- Passes the structured data to Vista::render() with the menu view


#### 4. View: VMenuDinamico (vistas/VMenuDinamico.php)

**Purpose**: Render the dynamic menu HTML using Bootstrap 5.3.8 classes.

**Template Structure**:
```php
<nav class="navbar navbar-expand-lg bg-body-tertiary" style="border: 2px solid #007bff;">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar Dinámico</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
            data-bs-target="#navbarDinamico">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarDinamico">
      <ul class="navbar-nav">
        <?php foreach($menuEstructurado as $menuItem): ?>
          <?php if(empty($menuItem['submenus'])): ?>
            <!-- Simple menu item without dropdown -->
            <li class="nav-item">
              <a class="nav-link" 
                 <?php if($menuItem['item']['accion']): ?>
                   onclick="<?php echo $menuItem['item']['accion']; ?>"
                 <?php else: ?>
                   href="#"
                 <?php endif; ?>>
                <?php echo $menuItem['item']['etiqueta']; ?>
              </a>
            </li>
          <?php else: ?>
            <!-- Dropdown menu item -->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" 
                 data-bs-toggle="dropdown">
                <?php echo $menuItem['item']['etiqueta']; ?>
              </a>
              <ul class="dropdown-menu">
                <?php foreach($menuItem['submenus'] as $submenu): ?>
                  <li>
                    <a class="dropdown-item" 
                       onclick="<?php echo $submenu['accion']; ?>">
                      <?php echo $submenu['etiqueta']; ?>
                    </a>
                  </li>
                <?php endforeach; ?>
              </ul>
            </li>
          <?php endif; ?>
        <?php endforeach; ?>
      </ul>
    </div>
  </div>
</nav>
```

**Key Features**:
- Uses Bootstrap 5.3.8 navbar classes for consistent styling
- Distinguishable from static menu with blue border and "Dinámico" label
- Supports both simple links and dropdown menus
- Renders onclick attributes for JavaScript actions
- Responsive with navbar-toggler for mobile devices


#### 5. Integration in index.php

**Purpose**: Display both static and dynamic menus during development.

**Implementation**:
```php
<!-- Static Menu (Original) -->
<div class="container-fluid">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <!-- Existing static menu code -->
    </nav>
</div>

<!-- Dynamic Menu (New - Below Static) -->
<div class="container-fluid">
    <?php
    require_once 'controladores/CMenus.php';
    require_once 'modelos/MMenus.php';
    require_once 'vistas/Vista.php';
    
    $menuController = new CMenus();
    $menuController->obtenerMenuDinamico();
    ?>
</div>

<!-- Content Area -->
<div class="container-fluid" id="capaContenido">
    Contenido
</div>
```

**Notes**:
- Dynamic menu is rendered immediately after static menu
- Both menus are functional during development
- Dynamic menu has visual distinction (blue border, "Dinámico" label)
- Once validated, static menu can be removed and dynamic menu styling adjusted


### PART B: Orders Management Module Components

#### 1. Database Tables

**Table: pedidos (Order Header)**

```sql
CREATE TABLE pedidos (
    idPedido INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    idUsuario INT UNSIGNED NOT NULL,
    estado VARCHAR(20) NOT NULL DEFAULT 'Pendiente',
    total DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    observaciones TEXT NULL,
    activo CHAR(1) NOT NULL DEFAULT 'S',
    fechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idUsuario) REFERENCES usuarios(idUsuario),
    INDEX idx_fecha (fecha),
    INDEX idx_usuario (idUsuario),
    INDEX idx_activo (activo)
);
```

**Field Descriptions**:
- `idPedido`: Primary key, auto-increment
- `fecha`: Order date
- `idUsuario`: Foreign key to usuarios table (customer)
- `estado`: Order status (Pendiente, Procesando, Completado, Cancelado)
- `total`: Total order amount (calculated from line items)
- `observaciones`: Optional notes/comments
- `activo`: 'S' for active, 'N' for deleted/inactive
- `fechaCreacion`: Timestamp of record creation

**Table: lineas_pedido (Order Lines)**

```sql
CREATE TABLE lineas_pedido (
    idLinea INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    idPedido INT UNSIGNED NOT NULL,
    idProducto INT UNSIGNED NOT NULL,
    cantidad INT NOT NULL,
    precioUnitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (idPedido) REFERENCES pedidos(idPedido) ON DELETE CASCADE,
    FOREIGN KEY (idProducto) REFERENCES productos(idProducto),
    INDEX idx_pedido (idPedido)
);
```

**Field Descriptions**:
- `idLinea`: Primary key, auto-increment
- `idPedido`: Foreign key to pedidos table
- `idProducto`: Foreign key to productos table
- `cantidad`: Quantity ordered
- `precioUnitario`: Unit price at time of order
- `subtotal`: Line total (cantidad * precioUnitario)

**Sample Data**:
```sql
-- Sample orders
INSERT INTO pedidos (fecha, idUsuario, estado, total, observaciones) VALUES
('2025-01-15', 1, 'Completado', 150.00, 'Pedido urgente'),
('2025-01-16', 2, 'Pendiente', 75.50, NULL);

-- Sample order lines
INSERT INTO lineas_pedido (idPedido, idProducto, cantidad, precioUnitario, subtotal) VALUES
(1, 1, 2, 50.00, 100.00),
(1, 2, 1, 50.00, 50.00),
(2, 3, 3, 25.17, 75.50);
```


#### 2. Model: MPedidos (modelos/MPedidos.php)

**Purpose**: Handle all database operations for orders and order lines.

**Class Structure**:
```php
class MPedidos {
    private $dao;
    
    public function __construct() {
        $this->dao = new DAO();
    }
    
    // Order CRUD operations
    public function obtenerPedidos($filtros, $pagina, $tamPag);
    public function contarPedidos($filtros);
    public function obtenerPedidoPorId($idPedido);
    public function insertarPedido($datosPedido);
    public function actualizarPedido($idPedido, $datosPedido);
    public function borrarPedido($idPedido);
    
    // Order lines operations
    public function obtenerLineasPedido($idPedido);
    public function insertarLineaPedido($datosLinea);
    public function actualizarLineaPedido($idLinea, $datosLinea);
    public function borrarLineaPedido($idLinea);
    public function borrarLineasPedido($idPedido);
    
    // Helper methods
    public function calcularTotalPedido($idPedido);
    public function obtenerUsuarios();
    public function obtenerProductos();
}
```

**Method Details**:

**obtenerPedidos($filtros, $pagina, $tamPag)**:
- Parameters: 
  - $filtros: array with 'usuario', 'fecha', 'estado'
  - $pagina: current page number
  - $tamPag: records per page
- SQL: Builds dynamic WHERE clause based on filters, includes JOIN with usuarios table
- Returns: Array of orders with pagination
- Example SQL:
  ```sql
  SELECT p.*, u.nombre, u.apellido1 
  FROM pedidos p 
  INNER JOIN usuarios u ON p.idUsuario = u.idUsuario 
  WHERE p.activo='S' 
  [AND u.nombre LIKE '%?%']
  [AND p.fecha = ?]
  [AND p.estado = ?]
  ORDER BY p.fecha DESC, p.idPedido DESC
  LIMIT offset, tamPag
  ```

**contarPedidos($filtros)**:
- Parameters: $filtros array
- SQL: COUNT query with same WHERE clause as obtenerPedidos
- Returns: Total count of matching orders

**obtenerPedidoPorId($idPedido)**:
- Parameters: $idPedido (int)
- SQL: `SELECT * FROM pedidos WHERE idPedido=? AND activo='S'`
- Returns: Single order record or null

**insertarPedido($datosPedido)**:
- Parameters: $datosPedido array with fecha, idUsuario, estado, observaciones
- SQL: `INSERT INTO pedidos (fecha, idUsuario, estado, total, observaciones) VALUES (?, ?, ?, 0.00, ?)`
- Returns: idPedido of newly created order
- Note: Total is initially 0.00, updated after lines are inserted

**actualizarPedido($idPedido, $datosPedido)**:
- Parameters: $idPedido, $datosPedido array
- SQL: `UPDATE pedidos SET fecha=?, idUsuario=?, estado=?, observaciones=? WHERE idPedido=?`
- Returns: Number of affected rows

**borrarPedido($idPedido)**:
- Parameters: $idPedido (int)
- SQL: `UPDATE pedidos SET activo='N' WHERE idPedido=?`
- Returns: Number of affected rows
- Note: Soft delete, doesn't physically remove record

**obtenerLineasPedido($idPedido)**:
- Parameters: $idPedido (int)
- SQL: 
  ```sql
  SELECT lp.*, pr.nombre as nombreProducto 
  FROM lineas_pedido lp
  INNER JOIN productos pr ON lp.idProducto = pr.idProducto
  WHERE lp.idPedido=?
  ORDER BY lp.idLinea
  ```
- Returns: Array of order lines with product names

**insertarLineaPedido($datosLinea)**:
- Parameters: $datosLinea array with idPedido, idProducto, cantidad, precioUnitario
- Calculates subtotal: cantidad * precioUnitario
- SQL: `INSERT INTO lineas_pedido (idPedido, idProducto, cantidad, precioUnitario, subtotal) VALUES (?, ?, ?, ?, ?)`
- Returns: idLinea of newly created line

**borrarLineasPedido($idPedido)**:
- Parameters: $idPedido (int)
- SQL: `DELETE FROM lineas_pedido WHERE idPedido=?`
- Returns: Number of deleted rows
- Used when updating an order (delete all lines, then re-insert)

**calcularTotalPedido($idPedido)**:
- Parameters: $idPedido (int)
- SQL: `SELECT SUM(subtotal) as total FROM lineas_pedido WHERE idPedido=?`
- Updates pedidos table: `UPDATE pedidos SET total=? WHERE idPedido=?`
- Returns: Calculated total

**obtenerUsuarios()**:
- SQL: `SELECT idUsuario, nombre, apellido1 FROM usuarios WHERE activo='S' ORDER BY nombre`
- Returns: Array of active users for dropdown
- Used in order form

**obtenerProductos()**:
- SQL: `SELECT idProducto, nombre, precio FROM productos WHERE activo='S' ORDER BY nombre`
- Returns: Array of active products for line item selection
- Used in order form


#### 3. Controller: CPedidos (controladores/CPedidos.php)

**Purpose**: Handle order-related requests following the same pattern as CUsuarios.

**Class Structure**:
```php
class CPedidos extends Controlador {
    private $modelo;
    
    public function __construct() {
        $this->modelo = new MPedidos();
    }
    
    public function getVistaPedidosPrincipal($datos=array());
    public function getVistaListadoPedidos($datos=array());
    public function getVistaFormularioPedido($datos=array());
    public function obtenerPedido($datos=array());
    public function crearPedido($datos=array());
    public function actualizarPedido($datos=array());
    public function eliminarPedido($datos=array());
}
```

**Method Details**:

**getVistaPedidosPrincipal($datos=array())**:
- Purpose: Display the main orders search interface
- Implementation: `Vista::render('vistas/Pedidos/VPedidosPrincipal.php');`
- Called by: Menu click or direct navigation

**getVistaListadoPedidos($datos=array())**:
- Purpose: Display paginated list of orders with filters
- Parameters extracted from $datos:
  - usuario: filter by user name
  - fecha: filter by order date
  - estado: filter by order status
  - pagina: current page (default 1)
  - tam_pag: page size (default 15)
- Process:
  1. Extract and sanitize parameters
  2. Build filters array
  3. Get total count: `$total = $this->modelo->contarPedidos($filtros)`
  4. Get paginated orders: `$pedidos = $this->modelo->obtenerPedidos($filtros, $pagina, $tamPag)`
  5. Calculate pagination data
  6. Pass data to view: `Vista::render('vistas/Pedidos/VListadoPedidos.php', ['pedidos' => $pedidos, 'totalRegistros' => $total, ...])`

**getVistaFormularioPedido($datos=array())**:
- Purpose: Display order creation/edit form
- Parameters: idPedido (optional, for editing)
- Process:
  1. Get users list: `$usuarios = $this->modelo->obtenerUsuarios()`
  2. Get products list: `$productos = $this->modelo->obtenerProductos()`
  3. If idPedido provided:
     - Get order: `$pedido = $this->modelo->obtenerPedidoPorId($idPedido)`
     - Get lines: `$lineas = $this->modelo->obtenerLineasPedido($idPedido)`
  4. Pass data to view: `Vista::render('vistas/Pedidos/VFormularioPedido.php', ['usuarios' => $usuarios, 'productos' => $productos, 'pedido' => $pedido, 'lineas' => $lineas])`

**obtenerPedido($datos=array())**:
- Purpose: Return order data as JSON for AJAX requests
- Parameters: idPedido
- Process:
  1. Get order: `$pedido = $this->modelo->obtenerPedidoPorId($datos['idPedido'])`
  2. Get lines: `$lineas = $this->modelo->obtenerLineasPedido($datos['idPedido'])`
  3. Return JSON: `echo json_encode(['pedido' => $pedido, 'lineas' => $lineas])`

**crearPedido($datos=array())**:
- Purpose: Create new order with line items
- Parameters: fecha, idUsuario, estado, observaciones, lineas (JSON array)
- Process:
  1. Validate required fields
  2. Insert order: `$idPedido = $this->modelo->insertarPedido($datosPedido)`
  3. Decode lineas JSON array
  4. For each line:
     - Insert line: `$this->modelo->insertarLineaPedido($datosLinea)`
  5. Calculate and update total: `$this->modelo->calcularTotalPedido($idPedido)`
  6. Return success message: `echo "Pedido creado exitosamente"`

**actualizarPedido($datos=array())**:
- Purpose: Update existing order and its lines
- Parameters: idPedido, fecha, idUsuario, estado, observaciones, lineas (JSON array)
- Process:
  1. Validate required fields
  2. Update order header: `$this->modelo->actualizarPedido($idPedido, $datosPedido)`
  3. Delete existing lines: `$this->modelo->borrarLineasPedido($idPedido)`
  4. Decode lineas JSON array
  5. For each line:
     - Insert line: `$this->modelo->insertarLineaPedido($datosLinea)`
  6. Calculate and update total: `$this->modelo->calcularTotalPedido($idPedido)`
  7. Return success message: `echo "Pedido actualizado exitosamente"`

**eliminarPedido($datos=array())**:
- Purpose: Soft delete an order
- Parameters: idPedido
- Process:
  1. Delete order: `$this->modelo->borrarPedido($datos['idPedido'])`
  2. Return success message: `echo "Pedido eliminado exitosamente"`



#### 4. View: VPedidosPrincipal (vistas/Pedidos/VPedidosPrincipal.php)

**Purpose**: Main orders interface with search filters and container for order listing.

**Template Structure**:
```php
<div class="container-fluid mt-3">
    <h2>Gestión de Pedidos</h2>
    
    <!-- Search Filters -->
    <div class="card mb-3">
        <div class="card-body">
            <form id="formBuscarPedidos">
                <div class="row">
                    <div class="col-md-3">
                        <label for="filtroUsuario" class="form-label">Cliente</label>
                        <input type="text" class="form-control" id="filtroUsuario" 
                               placeholder="Nombre del cliente">
                    </div>
                    <div class="col-md-3">
                        <label for="filtroFecha" class="form-label">Fecha</label>
                        <input type="date" class="form-control" id="filtroFecha">
                    </div>
                    <div class="col-md-3">
                        <label for="filtroEstado" class="form-label">Estado</label>
                        <select class="form-select" id="filtroEstado">
                            <option value="">Todos</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Procesando">Procesando</option>
                            <option value="Completado">Completado</option>
                            <option value="Cancelado">Cancelado</option>
                        </select>
                    </div>
                    <div class="col-md-3 d-flex align-items-end">
                        <button type="button" class="btn btn-primary me-2" 
                                onclick="buscarPedidos()">Buscar</button>
                        <button type="button" class="btn btn-success" 
                                onclick="nuevoPedido()">Nuevo Pedido</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    
    <!-- Orders Listing Container -->
    <div id="contenedorListadoPedidos">
        <!-- VListadoPedidos.php will be loaded here via AJAX -->
    </div>
</div>

<script>
// Load initial listing on page load
document.addEventListener('DOMContentLoaded', function() {
    buscarPedidos();
});
</script>
```

**Key Features**:
- Search filters for usuario, fecha, and estado
- "Nuevo Pedido" button to create new orders
- Container div for AJAX-loaded order listing
- Auto-loads initial listing on page load
- Bootstrap 5.3.8 form styling


#### 5. View: VListadoPedidos (vistas/Pedidos/VListadoPedidos.php)

**Purpose**: Display paginated table of orders with action buttons.

**Template Structure**:
```php
<?php if(empty($pedidos)): ?>
    <div class="alert alert-info">No se encontraron pedidos</div>
<?php else: ?>
    <!-- Orders Table -->
    <table class="table table-striped table-hover">
        <thead class="table-dark">
            <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Estado</th>
                <th>Total</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach($pedidos as $pedido): ?>
            <tr>
                <td><?php echo $pedido['idPedido']; ?></td>
                <td><?php echo date('d/m/Y', strtotime($pedido['fecha'])); ?></td>
                <td><?php echo $pedido['nombre'] . ' ' . $pedido['apellido1']; ?></td>
                <td>
                    <span class="badge bg-<?php echo obtenerColorEstado($pedido['estado']); ?>">
                        <?php echo $pedido['estado']; ?>
                    </span>
                </td>
                <td><?php echo number_format($pedido['total'], 2); ?> €</td>
                <td>
                    <button class="btn btn-sm btn-info" 
                            onclick="verPedido(<?php echo $pedido['idPedido']; ?>)"
                            title="Ver detalles">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-warning" 
                            onclick="editarPedido(<?php echo $pedido['idPedido']; ?>)"
                            title="Editar">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" 
                            onclick="eliminarPedido(<?php echo $pedido['idPedido']; ?>)"
                            title="Eliminar">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    
    <!-- Pagination Controls -->
    <nav aria-label="Paginación de pedidos">
        <ul class="pagination justify-content-center">
            <li class="page-item <?php echo ($paginaActual <= 1) ? 'disabled' : ''; ?>">
                <a class="page-link" href="#" 
                   onclick="cambiarPagina(<?php echo $paginaActual - 1; ?>)">Anterior</a>
            </li>
            
            <?php for($i = 1; $i <= $totalPaginas; $i++): ?>
                <li class="page-item <?php echo ($i == $paginaActual) ? 'active' : ''; ?>">
                    <a class="page-link" href="#" 
                       onclick="cambiarPagina(<?php echo $i; ?>)"><?php echo $i; ?></a>
                </li>
            <?php endfor; ?>
            
            <li class="page-item <?php echo ($paginaActual >= $totalPaginas) ? 'disabled' : ''; ?>">
                <a class="page-link" href="#" 
                   onclick="cambiarPagina(<?php echo $paginaActual + 1; ?>)">Siguiente</a>
            </li>
        </ul>
    </nav>
    
    <!-- Page Size Selector -->
    <div class="text-center mb-3">
        <label>Registros por página:</label>
        <select class="form-select d-inline-block w-auto" 
                onchange="cambiarTamanioPagina(this.value)">
            <option value="15" <?php echo ($tamPag == 15) ? 'selected' : ''; ?>>15</option>
            <option value="30" <?php echo ($tamPag == 30) ? 'selected' : ''; ?>>30</option>
            <option value="50" <?php echo ($tamPag == 50) ? 'selected' : ''; ?>>50</option>
        </select>
    </div>
<?php endif; ?>

<?php
function obtenerColorEstado($estado) {
    switch($estado) {
        case 'Pendiente': return 'warning';
        case 'Procesando': return 'info';
        case 'Completado': return 'success';
        case 'Cancelado': return 'danger';
        default: return 'secondary';
    }
}
?>
```

**Key Features**:
- Responsive table with Bootstrap styling
- Color-coded status badges
- Action buttons (view, edit, delete) with icons
- Pagination controls with previous/next and page numbers
- Configurable page size selector
- Empty state message when no results
- Date formatting (dd/mm/yyyy)
- Currency formatting for totals


#### 6. View: VFormularioPedido (vistas/Pedidos/VFormularioPedido.php)

**Purpose**: Master-detail form for creating/editing orders with dynamic line items.

**Template Structure**:
```php
<div class="container-fluid mt-3">
    <h2><?php echo isset($pedido) ? 'Editar Pedido' : 'Nuevo Pedido'; ?></h2>
    
    <form id="formPedido">
        <input type="hidden" id="idPedido" name="idPedido" 
               value="<?php echo $pedido['idPedido'] ?? ''; ?>">
        
        <!-- Order Header Section -->
        <div class="card mb-3">
            <div class="card-header bg-primary text-white">
                <h5>Datos del Pedido</h5>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-4">
                        <label for="fecha" class="form-label">Fecha *</label>
                        <input type="date" class="form-control" id="fecha" name="fecha" 
                               value="<?php echo $pedido['fecha'] ?? date('Y-m-d'); ?>" required>
                    </div>
                    <div class="col-md-4">
                        <label for="idUsuario" class="form-label">Cliente *</label>
                        <select class="form-select" id="idUsuario" name="idUsuario" required>
                            <option value="">Seleccione un cliente</option>
                            <?php foreach($usuarios as $usuario): ?>
                                <option value="<?php echo $usuario['idUsuario']; ?>"
                                    <?php echo (isset($pedido) && $pedido['idUsuario'] == $usuario['idUsuario']) ? 'selected' : ''; ?>>
                                    <?php echo $usuario['nombre'] . ' ' . $usuario['apellido1']; ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label for="estado" class="form-label">Estado *</label>
                        <select class="form-select" id="estado" name="estado" required>
                            <option value="Pendiente" <?php echo (isset($pedido) && $pedido['estado'] == 'Pendiente') ? 'selected' : ''; ?>>Pendiente</option>
                            <option value="Procesando" <?php echo (isset($pedido) && $pedido['estado'] == 'Procesando') ? 'selected' : ''; ?>>Procesando</option>
                            <option value="Completado" <?php echo (isset($pedido) && $pedido['estado'] == 'Completado') ? 'selected' : ''; ?>>Completado</option>
                            <option value="Cancelado" <?php echo (isset($pedido) && $pedido['estado'] == 'Cancelado') ? 'selected' : ''; ?>>Cancelado</option>
                        </select>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12">
                        <label for="observaciones" class="form-label">Observaciones</label>
                        <textarea class="form-control" id="observaciones" name="observaciones" 
                                  rows="2"><?php echo $pedido['observaciones'] ?? ''; ?></textarea>
                    </div>
                </div>
            </div>
        </div>

        
        <!-- Order Lines Section (Detail) -->
        <div class="card mb-3">
            <div class="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
                <h5>Líneas del Pedido</h5>
                <button type="button" class="btn btn-sm btn-success" onclick="agregarLinea()">
                    <i class="bi bi-plus-circle"></i> Agregar Línea
                </button>
            </div>
            <div class="card-body">
                <table class="table table-bordered" id="tablaLineas">
                    <thead class="table-light">
                        <tr>
                            <th style="width: 40%;">Producto *</th>
                            <th style="width: 15%;">Cantidad *</th>
                            <th style="width: 20%;">Precio Unit. *</th>
                            <th style="width: 20%;">Subtotal</th>
                            <th style="width: 5%;">Acción</th>
                        </tr>
                    </thead>
                    <tbody id="cuerpoLineas">
                        <?php if(isset($lineas) && !empty($lineas)): ?>
                            <?php foreach($lineas as $linea): ?>
                                <tr class="linea-pedido">
                                    <td>
                                        <select class="form-select producto-select" name="lineas[producto][]" required>
                                            <option value="">Seleccione producto</option>
                                            <?php foreach($productos as $producto): ?>
                                                <option value="<?php echo $producto['idProducto']; ?>" 
                                                        data-precio="<?php echo $producto['precio']; ?>"
                                                        <?php echo ($linea['idProducto'] == $producto['idProducto']) ? 'selected' : ''; ?>>
                                                    <?php echo $producto['nombre']; ?>
                                                </option>
                                            <?php endforeach; ?>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="number" class="form-control cantidad-input" 
                                               name="lineas[cantidad][]" min="1" 
                                               value="<?php echo $linea['cantidad']; ?>" 
                                               onchange="calcularSubtotal(this)" required>
                                    </td>
                                    <td>
                                        <input type="number" class="form-control precio-input" 
                                               name="lineas[precio][]" min="0" step="0.01" 
                                               value="<?php echo $linea['precioUnitario']; ?>" 
                                               onchange="calcularSubtotal(this)" required>
                                    </td>
                                    <td>
                                        <input type="text" class="form-control subtotal-input" 
                                               value="<?php echo number_format($linea['subtotal'], 2); ?>" 
                                               readonly>
                                    </td>
                                    <td>
                                        <button type="button" class="btn btn-sm btn-danger" 
                                                onclick="eliminarLinea(this)">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                    <tfoot>
                        <tr class="table-info">
                            <td colspan="3" class="text-end"><strong>TOTAL:</strong></td>
                            <td><input type="text" class="form-control" id="totalPedido" 
                                       value="<?php echo isset($pedido) ? number_format($pedido['total'], 2) : '0.00'; ?>" 
                                       readonly></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
                <div id="mensajeLineas" class="alert alert-warning d-none">
                    Debe agregar al menos una línea al pedido
                </div>
            </div>
        </div>
        
        <!-- Form Actions -->
        <div class="d-flex justify-content-end gap-2 mb-3">
            <button type="button" class="btn btn-secondary" onclick="cancelarFormulario()">
                Cancelar
            </button>
            <button type="submit" class="btn btn-primary">
                <i class="bi bi-save"></i> Guardar Pedido
            </button>
        </div>
    </form>
</div>

<!-- Hidden template for new lines -->
<template id="templateLinea">
    <tr class="linea-pedido">
        <td>
            <select class="form-select producto-select" name="lineas[producto][]" required>
                <option value="">Seleccione producto</option>
                <?php foreach($productos as $producto): ?>
                    <option value="<?php echo $producto['idProducto']; ?>" 
                            data-precio="<?php echo $producto['precio']; ?>">
                        <?php echo $producto['nombre']; ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </td>
        <td>
            <input type="number" class="form-control cantidad-input" 
                   name="lineas[cantidad][]" min="1" value="1" 
                   onchange="calcularSubtotal(this)" required>
        </td>
        <td>
            <input type="number" class="form-control precio-input" 
                   name="lineas[precio][]" min="0" step="0.01" value="0.00" 
                   onchange="calcularSubtotal(this)" required>
        </td>
        <td>
            <input type="text" class="form-control subtotal-input" 
                   value="0.00" readonly>
        </td>
        <td>
            <button type="button" class="btn btn-sm btn-danger" 
                    onclick="eliminarLinea(this)">
                <i class="bi bi-trash"></i>
            </button>
        </td>
    </tr>
</template>

<script>
// Auto-fill price when product is selected
document.addEventListener('change', function(e) {
    if(e.target.classList.contains('producto-select')) {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const precio = selectedOption.getAttribute('data-precio');
        const row = e.target.closest('tr');
        const precioInput = row.querySelector('.precio-input');
        if(precio) {
            precioInput.value = parseFloat(precio).toFixed(2);
            calcularSubtotal(precioInput);
        }
    }
});

// Form submission handler
document.getElementById('formPedido').addEventListener('submit', function(e) {
    e.preventDefault();
    guardarPedido();
});
</script>
```

**Key Features**:
- Master section: order header with fecha, cliente, estado, observaciones
- Detail section: dynamic table of order lines
- "Agregar Línea" button to add new rows
- Each line has: producto dropdown, cantidad, precio unitario, subtotal (calculated), delete button
- Auto-fills precio when producto is selected (from data-precio attribute)
- Calculates subtotal automatically when cantidad or precio changes
- Calculates and displays total pedido in footer
- Template element for cloning new line rows
- Validation: required fields marked with *
- Bootstrap 5.3.8 card layout and form styling
- Readonly subtotal and total fields
- Save and Cancel buttons


#### 7. JavaScript: pedidos.js (js/pedidos.js)

**Purpose**: Client-side functionality for orders module including AJAX operations and DOM manipulation.

**Function Structure**:

```javascript
/**
 * Load orders listing with filters and pagination
 */
function buscarPedidos(pagina = 1) {
    const usuario = document.getElementById('filtroUsuario').value;
    const fecha = document.getElementById('filtroFecha').value;
    const estado = document.getElementById('filtroEstado').value;
    const tamPag = document.querySelector('select[onchange*="cambiarTamanioPagina"]')?.value || 15;
    
    const params = {
        usuario: usuario,
        fecha: fecha,
        estado: estado,
        pagina: pagina,
        tam_pag: tamPag
    };
    
    obtenerVista('Pedidos', 'getVistaListadoPedidos', 'contenedorListadoPedidos', params);
}

/**
 * Change page in pagination
 */
function cambiarPagina(pagina) {
    buscarPedidos(pagina);
}

/**
 * Change page size
 */
function cambiarTamanioPagina(tamPag) {
    buscarPedidos(1); // Reset to page 1 when changing page size
}

/**
 * Load new order form
 */
function nuevoPedido() {
    obtenerVista('Pedidos', 'getVistaFormularioPedido', 'capaContenido');
}

/**
 * Load order details view (read-only)
 */
function verPedido(idPedido) {
    obtenerVista('Pedidos', 'getVistaDetallePedido', 'capaContenido', {idPedido: idPedido});
}

/**
 * Load order edit form
 */
function editarPedido(idPedido) {
    obtenerVista('Pedidos', 'getVistaFormularioPedido', 'capaContenido', {idPedido: idPedido});
}

/**
 * Delete order with confirmation
 */
function eliminarPedido(idPedido) {
    if(confirm('¿Está seguro de que desea eliminar este pedido?')) {
        fetch('CFrontal.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: new URLSearchParams({
                controlador: 'Pedidos',
                metodo: 'eliminarPedido',
                idPedido: idPedido
            })
        })
        .then(response => response.text())
        .then(data => {
            mostrarMensaje('Pedido eliminado exitosamente', 'success');
            buscarPedidos(); // Reload listing
        })
        .catch(error => {
            mostrarMensaje('Error al eliminar el pedido', 'danger');
            console.error('Error:', error);
        });
    }
}

/**
 * Add new line to order form
 */
function agregarLinea() {
    const template = document.getElementById('templateLinea');
    const clone = template.content.cloneNode(true);
    document.getElementById('cuerpoLineas').appendChild(clone);
    document.getElementById('mensajeLineas').classList.add('d-none');
}

/**
 * Remove line from order form
 */
function eliminarLinea(button) {
    const row = button.closest('tr');
    row.remove();
    calcularTotalPedido();
    
    // Show warning if no lines remain
    const lineas = document.querySelectorAll('.linea-pedido');
    if(lineas.length === 0) {
        document.getElementById('mensajeLineas').classList.remove('d-none');
    }
}

/**
 * Calculate subtotal for a line when cantidad or precio changes
 */
function calcularSubtotal(input) {
    const row = input.closest('tr');
    const cantidad = parseFloat(row.querySelector('.cantidad-input').value) || 0;
    const precio = parseFloat(row.querySelector('.precio-input').value) || 0;
    const subtotal = cantidad * precio;
    
    row.querySelector('.subtotal-input').value = subtotal.toFixed(2);
    calcularTotalPedido();
}

/**
 * Calculate total order amount from all lines
 */
function calcularTotalPedido() {
    let total = 0;
    document.querySelectorAll('.linea-pedido').forEach(row => {
        const subtotal = parseFloat(row.querySelector('.subtotal-input').value) || 0;
        total += subtotal;
    });
    
    document.getElementById('totalPedido').value = total.toFixed(2);
}

/**
 * Save order (create or update)
 */
function guardarPedido() {
    const form = document.getElementById('formPedido');
    const idPedido = document.getElementById('idPedido').value;
    const lineas = document.querySelectorAll('.linea-pedido');
    
    // Validate at least one line exists
    if(lineas.length === 0) {
        mostrarMensaje('Debe agregar al menos una línea al pedido', 'warning');
        document.getElementById('mensajeLineas').classList.remove('d-none');
        return;
    }
    
    // Build lines array
    const lineasArray = [];
    lineas.forEach(row => {
        const producto = row.querySelector('.producto-select').value;
        const cantidad = row.querySelector('.cantidad-input').value;
        const precio = row.querySelector('.precio-input').value;
        
        if(producto && cantidad && precio) {
            lineasArray.push({
                idProducto: producto,
                cantidad: cantidad,
                precioUnitario: precio
            });
        }
    });
    
    // Prepare form data
    const formData = new URLSearchParams({
        controlador: 'Pedidos',
        metodo: idPedido ? 'actualizarPedido' : 'crearPedido',
        idPedido: idPedido,
        fecha: document.getElementById('fecha').value,
        idUsuario: document.getElementById('idUsuario').value,
        estado: document.getElementById('estado').value,
        observaciones: document.getElementById('observaciones').value,
        lineas: JSON.stringify(lineasArray)
    });
    
    // Submit via AJAX
    fetch('CFrontal.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        mostrarMensaje(data, 'success');
        // Return to orders listing
        obtenerVista('Pedidos', 'getVistaPedidosPrincipal', 'capaContenido');
    })
    .catch(error => {
        mostrarMensaje('Error al guardar el pedido', 'danger');
        console.error('Error:', error);
    });
}

/**
 * Cancel form and return to listing
 */
function cancelarFormulario() {
    if(confirm('¿Desea cancelar? Los cambios no guardados se perderán.')) {
        obtenerVista('Pedidos', 'getVistaPedidosPrincipal', 'capaContenido');
    }
}

/**
 * Display message in appAlert div
 */
function mostrarMensaje(mensaje, tipo) {
    const alertDiv = document.getElementById('appAlert');
    if(alertDiv) {
        alertDiv.className = `alert alert-${tipo} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        alertDiv.style.display = 'block';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            alertDiv.style.display = 'none';
        }, 5000);
    }
}
```

**Key Functions Summary**:
- **buscarPedidos()**: Load filtered/paginated order listing via AJAX
- **cambiarPagina()**: Navigate pagination
- **cambiarTamanioPagina()**: Change records per page
- **nuevoPedido()**: Load new order form
- **editarPedido()**: Load edit form for existing order
- **eliminarPedido()**: Delete order with confirmation
- **agregarLinea()**: Clone template and add new line row to table
- **eliminarLinea()**: Remove line row from table
- **calcularSubtotal()**: Calculate line subtotal (cantidad × precio)
- **calcularTotalPedido()**: Sum all line subtotals
- **guardarPedido()**: Validate and submit order via AJAX (create or update)
- **cancelarFormulario()**: Cancel and return to listing
- **mostrarMensaje()**: Display success/error messages in alert div

**Integration with existing code**:
- Uses existing `obtenerVista()` function for AJAX view loading
- Uses existing `appAlert` div for messages
- Follows same patterns as usuarios.js
- Uses Fetch API for AJAX requests
- Uses Bootstrap 5.3.8 alert classes



## Data Models

### Menu System Data Model

**Menu Item Structure**:
```php
[
    'idOpcion' => int,        // Primary key
    'etiqueta' => string,     // Display label
    'idPadre' => int|null,    // Parent ID (null for level 1)
    'posicion' => int,        // Display order
    'accion' => string|null,  // JavaScript action or URL
    'activo' => 'S'|'N'       // Active status
]
```

**Hierarchical Menu Structure** (used by controller/view):
```php
[
    [
        'item' => [...],      // Level 1 menu item
        'submenus' => [...]   // Array of level 2 items
    ],
    ...
]
```

### Orders Module Data Model

**Order (Pedido) Structure**:
```php
[
    'idPedido' => int,           // Primary key
    'fecha' => string,           // Date (YYYY-MM-DD)
    'idUsuario' => int,          // Foreign key to usuarios
    'estado' => string,          // Status: Pendiente|Procesando|Completado|Cancelado
    'total' => float,            // Total amount (calculated)
    'observaciones' => string,   // Optional notes
    'activo' => 'S'|'N',        // Active status
    'fechaCreacion' => string,   // Timestamp
    // Joined fields from usuarios:
    'nombre' => string,          // Customer first name
    'apellido1' => string        // Customer last name
]
```

**Order Line (Linea_Pedido) Structure**:
```php
[
    'idLinea' => int,            // Primary key
    'idPedido' => int,           // Foreign key to pedidos
    'idProducto' => int,         // Foreign key to productos
    'cantidad' => int,           // Quantity
    'precioUnitario' => float,   // Unit price at time of order
    'subtotal' => float,         // Calculated: cantidad × precioUnitario
    // Joined fields from productos:
    'nombreProducto' => string   // Product name
]
```

**Client-side Line Item Structure** (JavaScript):
```javascript
{
    idProducto: number,
    cantidad: number,
    precioUnitario: number
}
```

**Pagination Data Structure**:
```php
[
    'pedidos' => array,          // Array of order records
    'totalRegistros' => int,     // Total count of matching records
    'paginaActual' => int,       // Current page number
    'totalPaginas' => int,       // Total number of pages
    'tamPag' => int             // Records per page
]
```

**Validation Rules**:
- Order fecha: required, valid date format
- Order idUsuario: required, must exist in usuarios table
- Order estado: required, must be one of: Pendiente, Procesando, Completado, Cancelado
- Order must have at least one line item
- Line idProducto: required, must exist in productos table
- Line cantidad: required, positive integer
- Line precioUnitario: required, positive decimal
- Line subtotal: calculated automatically (cantidad × precioUnitario)
- Order total: calculated automatically (sum of all line subtotals)



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### PART A: Dynamic Menu System Properties

Property 1: Active menu items are ordered by position
*For any* set of menu items in the database, when retrieving active menu items, they should be returned in ascending order by their position field
**Validates: Requirements 2.2, 7.1**

Property 2: Level 1 items have no parent
*For any* menu item retrieved as a Level_1_Item, its idPadre field should be NULL
**Validates: Requirements 2.3**

Property 3: Level 2 items belong to specified parent
*For any* parent menu item ID, when retrieving Level_2_Item records for that parent, all returned items should have idPadre equal to the specified parent ID
**Validates: Requirements 2.4**

Property 4: Menu items contain required fields
*For any* menu item returned by the model, it should include idOpcion, etiqueta, accion, posicion, idPadre, and activo fields
**Validates: Requirements 2.5**

Property 5: Hierarchical structure groups children under parents
*For any* set of menu items, when organized into hierarchical structure, each Level_2_Item should appear in the submenus array of its parent Level_1_Item
**Validates: Requirements 3.3**

Property 6: Generated HTML contains Bootstrap navbar classes
*For any* menu structure, the generated HTML should contain the classes "navbar", "navbar-expand-lg", and "bg-body-tertiary"
**Validates: Requirements 4.1**

Property 7: Level 1 items render as nav-items
*For any* Level_1_Item in the menu structure, the generated HTML should contain a corresponding element with class "nav-item"
**Validates: Requirements 4.2**

Property 8: Level 1 items with children render as dropdowns
*For any* Level_1_Item that has associated Level_2_Item children, the generated HTML should contain an element with class "dropdown-toggle"
**Validates: Requirements 4.3**

Property 9: Level 2 items render within dropdown-menu
*For any* Level_2_Item, the generated HTML should contain a corresponding element with class "dropdown-item" within a "dropdown-menu" container
**Validates: Requirements 4.4**

Property 10: Menu items render in position order
*For any* set of menu items with different position values, the order of elements in the generated HTML should match the ascending order of position values
**Validates: Requirements 4.6**

Property 11: JavaScript actions render as onclick attributes
*For any* menu item with an action containing a JavaScript function call, the generated HTML should contain an onclick attribute with that function call
**Validates: Requirements 5.1**

Property 12: URL actions render as href attributes
*For any* menu item with an action containing a URL (starting with http:// or https://), the generated HTML should contain an href attribute with that URL
**Validates: Requirements 5.2**

Property 13: Menu items with same position order by ID
*For any* two menu items with the same position value, they should be ordered by their idOpcion in ascending order
**Validates: Requirements 7.3**

Property 14: Inactive menu items are excluded
*For any* menu item marked as inactive (activo='N'), it should not appear in the retrieved menu data or generated HTML
**Validates: Requirements 9.3**

Property 15: Inactive parents hide their children
*For any* Level_1_Item marked as inactive, none of its Level_2_Item children should appear in the generated HTML, regardless of the children's active status
**Validates: Requirements 9.4**

### PART B: Orders Module Properties

Property 16: Retrieve order by ID returns correct order
*For any* valid order ID in the database, retrieving the order by that ID should return an order record with matching idPedido
**Validates: Requirements 12.3**

Property 17: Order lines belong to specified order
*For any* order ID, when retrieving order lines for that order, all returned lines should have idPedido equal to the specified order ID
**Validates: Requirements 12.4**

Property 18: Insert then retrieve preserves order data
*For any* valid order data with line items, after inserting the order and then retrieving it by its ID, the retrieved data should match the inserted data (round-trip property)
**Validates: Requirements 12.5**

Property 19: Update then retrieve reflects changes
*For any* existing order, after updating its data and then retrieving it, the retrieved data should reflect the updated values
**Validates: Requirements 12.6**

Property 20: Deleted orders are excluded from active queries
*For any* order that has been marked as inactive (deleted), it should not appear in queries that retrieve active orders
**Validates: Requirements 12.7**

Property 21: Filtered orders match filter criteria
*For any* filter criteria (date range, customer, or status), all returned orders should match the specified criteria
**Validates: Requirements 12.8**

Property 22: Order count matches filtered results
*For any* filter criteria, the total count returned should equal the number of orders that match the filter
**Validates: Requirements 12.9**

Property 23: Order listing table contains required columns
*For any* set of orders, the generated HTML table should contain columns for ID, date, customer, status, total, and actions
**Validates: Requirements 15.2**

Property 24: Each order row has action buttons
*For any* order in the listing, its table row should contain view, edit, and delete buttons
**Validates: Requirements 15.3**

Property 25: Pagination controls appear for multiple pages
*For any* order listing with more records than the page size, the generated HTML should contain pagination controls
**Validates: Requirements 15.4**

Property 26: Order form contains header fields
*For any* order form (new or edit), the generated HTML should contain form fields for fecha, idUsuario, estado, and observaciones
**Validates: Requirements 16.2**

Property 27: Order line rows contain required fields
*For any* order line in the form, its table row should contain fields for product, quantity, unit price, and subtotal
**Validates: Requirements 16.5**

Property 28: Each line row has delete button
*For any* order line row in the form, it should contain a delete button
**Validates: Requirements 16.6**

Property 29: Editing order loads all existing lines
*For any* existing order with line items, when loading the edit form, the generated HTML should contain a row for each existing line item
**Validates: Requirements 16.9**

Property 30: Adding line increases row count
*For any* order form state, calling the agregarLinea() function should increase the number of line item rows in the DOM by one
**Validates: Requirements 17.3**

Property 31: Removing line decreases row count
*For any* order form with at least one line, calling eliminarLinea() on a row should decrease the number of line item rows by one
**Validates: Requirements 17.4**

Property 32: Line subtotal equals quantity times price
*For any* order line with quantity and unit price values, the calculated subtotal should equal cantidad × precioUnitario
**Validates: Requirements 17.5**

Property 33: Order total equals sum of line subtotals
*For any* order with multiple lines, the calculated order total should equal the sum of all line subtotals
**Validates: Requirements 17.6**

Property 34: Empty required fields trigger validation error
*For any* order submission with empty required fields (fecha, idUsuario, estado), the validation should fail and return an error message
**Validates: Requirements 18.1**

Property 35: Invalid date triggers validation error
*For any* order submission with an invalid date format, the validation should fail and return an error message
**Validates: Requirements 18.2**

Property 36: Missing product in line triggers validation error
*For any* order line with an empty product reference, the validation should fail and return an error message
**Validates: Requirements 18.4**

Property 37: Non-positive quantity triggers validation error
*For any* order line with quantity ≤ 0, the validation should fail and return an error message
**Validates: Requirements 18.5**

Property 38: Non-positive price triggers validation error
*For any* order line with price ≤ 0, the validation should fail and return an error message
**Validates: Requirements 18.6**



## Error Handling

### Database Connection Errors

**Menu System**:
- If database connection fails when loading menu, display static fallback menu
- Log error to server error log
- Display user-friendly message: "Menu temporarily unavailable"

**Orders Module**:
- If database connection fails, display error message in appAlert div
- Prevent form submission until connection is restored
- Log error details to server error log

### Data Validation Errors

**Menu System**:
- If menu data is malformed (missing required fields), skip that menu item and log warning
- If no valid menu items exist, display empty navbar with brand only
- If hierarchical structure cannot be built, fall back to flat menu

**Orders Module**:
- Server-side validation errors return descriptive messages to client
- Client-side validation prevents form submission and highlights invalid fields
- Validation error messages displayed in Bootstrap alert format
- Specific error messages for each validation rule:
  - "La fecha es requerida y debe ser válida"
  - "Debe seleccionar un cliente"
  - "El estado es requerido"
  - "Debe agregar al menos una línea al pedido"
  - "Cada línea debe tener un producto seleccionado"
  - "La cantidad debe ser un número positivo"
  - "El precio debe ser un número positivo"

### AJAX Request Errors

**Menu System**:
- If AJAX request to load menu fails, keep existing menu displayed
- Log error to console
- Retry once after 2-second delay

**Orders Module**:
- If AJAX request fails, display error in appAlert div
- Error message: "Error al comunicarse con el servidor. Por favor, intente nuevamente."
- Keep form data intact so user doesn't lose work
- Provide retry button
- Log error details to console for debugging

### Foreign Key Constraint Errors

**Orders Module**:
- If idUsuario doesn't exist: "El cliente seleccionado no existe"
- If idProducto doesn't exist: "El producto seleccionado no existe"
- If order deletion fails due to constraints: "No se puede eliminar el pedido debido a dependencias"

### Concurrent Modification Errors

**Orders Module**:
- If order is modified by another user between load and save, display warning
- Offer to reload current data or force save
- Message: "Este pedido ha sido modificado por otro usuario. ¿Desea recargar los datos actuales o sobrescribir los cambios?"

### Empty State Handling

**Menu System**:
- If no active menu items exist, display navbar with brand only
- Log warning: "No active menu items found"

**Orders Module**:
- If no orders match search criteria, display: "No se encontraron pedidos que coincidan con los criterios de búsqueda"
- If order has no lines when loading edit form, display empty table with "Agregar Línea" button
- If all lines are deleted from form, show warning: "Debe agregar al menos una línea al pedido"

### Permission Errors

**Orders Module**:
- If user lacks permission to create/edit/delete orders, display: "No tiene permisos para realizar esta acción"
- Disable action buttons for unauthorized operations
- Return HTTP 403 status from controller

### Data Integrity Errors

**Orders Module**:
- If line subtotal calculation fails, set to 0.00 and log error
- If order total calculation fails, set to 0.00 and log error
- If order save succeeds but total calculation fails, log error but don't fail the operation
- Provide manual recalculation button in case of calculation errors



## Testing Strategy

### Dual Testing Approach

This project will use both unit testing and property-based testing to ensure comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, and error conditions
- **Property tests**: Verify universal properties across all inputs through randomization

Both approaches are complementary and necessary. Unit tests catch concrete bugs in specific scenarios, while property tests verify general correctness across a wide range of inputs.

### Property-Based Testing Configuration

**Library Selection**:
- PHP: Use **PHPUnit with QuickCheck** extension or **Eris** library for property-based testing
- JavaScript: Use **fast-check** library for property-based testing

**Test Configuration**:
- Minimum 100 iterations per property test (due to randomization)
- Each property test must reference its design document property
- Tag format: **Feature: dynamic-database-menu, Property {number}: {property_text}**

**Example Property Test Structure** (PHP):
```php
/**
 * Feature: dynamic-database-menu, Property 1: Active menu items are ordered by position
 * @test
 */
public function test_active_menu_items_ordered_by_position() {
    $this->forAll(
        Generator::menuItemsArray(10, 20), // Generate 10-20 random menu items
        function($menuItems) {
            // Insert menu items into test database
            $this->insertMenuItems($menuItems);
            
            // Retrieve active menu items
            $model = new MMenus();
            $result = $model->obtenerMenusActivos();
            
            // Verify ordering
            $positions = array_column($result, 'posicion');
            $this->assertEquals($positions, sorted($positions));
            
            return true;
        }
    )->runs(100);
}
```

**Example Property Test Structure** (JavaScript):
```javascript
/**
 * Feature: dynamic-database-menu, Property 32: Line subtotal equals quantity times price
 */
test('line subtotal calculation property', () => {
    fc.assert(
        fc.property(
            fc.integer({min: 1, max: 1000}), // cantidad
            fc.float({min: 0.01, max: 10000}), // precio
            (cantidad, precio) => {
                const subtotal = calcularSubtotal({cantidad, precio});
                const expected = cantidad * precio;
                return Math.abs(subtotal - expected) < 0.01; // Allow for floating point precision
            }
        ),
        { numRuns: 100 }
    );
});
```

### Unit Testing Strategy

**Menu System Unit Tests**:
- Test menu retrieval with specific known data
- Test hierarchical structure building with edge cases:
  - Empty menu
  - Only level 1 items (no dropdowns)
  - Only level 2 items (orphaned children)
  - Mixed active/inactive items
- Test HTML generation with specific menu structures
- Test position ordering with duplicate positions
- Test inactive parent hiding children

**Orders Module Unit Tests**:
- Test CRUD operations with specific order data
- Test pagination with known record counts
- Test filtering with specific criteria
- Test validation with specific invalid inputs:
  - Empty required fields
  - Invalid date formats
  - Zero/negative quantities
  - Zero/negative prices
  - Orders with no lines
- Test calculation functions with specific values
- Test DOM manipulation functions:
  - Add line to empty form
  - Add line to form with existing lines
  - Remove last line
  - Remove middle line
- Test AJAX success and error scenarios

### Integration Testing

**Menu System Integration**:
- Test full flow: database → model → controller → view → HTML output
- Test menu click triggers correct AJAX call
- Test menu rendering in actual browser (Selenium/Playwright)
- Test responsive behavior (mobile collapse)

**Orders Module Integration**:
- Test full CRUD flow: create order → list → edit → delete
- Test master-detail flow: create order with lines → edit lines → save
- Test pagination navigation
- Test filtering and search
- Test form submission and validation
- Test concurrent user scenarios

### Test Data Management

**Test Database**:
- Use separate test database (db_di25_test)
- Reset database before each test suite
- Use transactions for test isolation where possible
- Seed with known test data for unit tests
- Generate random data for property tests

**Test Data Generators** (for property-based testing):
- Menu item generator: random etiqueta, posicion, accion, activo, idPadre
- Order generator: random fecha, idUsuario, estado, observaciones
- Order line generator: random idProducto, cantidad, precioUnitario
- User generator: random nombre, apellido1
- Product generator: random nombre, precio

### Coverage Goals

**Code Coverage**:
- Minimum 80% line coverage for models
- Minimum 70% line coverage for controllers
- Minimum 60% line coverage for views (HTML generation)
- 100% coverage of validation logic
- 100% coverage of calculation functions

**Property Coverage**:
- All 38 correctness properties must have corresponding property tests
- Each property test must run minimum 100 iterations
- Property tests should cover edge cases through randomization

### Test Execution

**Development Workflow**:
1. Write unit test for specific case
2. Implement feature to pass unit test
3. Write property test for general behavior
4. Run property test to find edge cases
5. Add unit tests for discovered edge cases
6. Refactor and repeat

**Continuous Integration**:
- Run all unit tests on every commit
- Run property tests on every pull request
- Run integration tests nightly
- Fail build if any test fails or coverage drops below threshold

### Manual Testing Checklist

**Menu System**:
- [ ] Static and dynamic menus display side by side
- [ ] Dynamic menu matches static menu appearance
- [ ] Dropdown menus work correctly
- [ ] Mobile responsive menu works
- [ ] Menu items trigger correct actions
- [ ] Inactive items don't appear
- [ ] Menu items appear in correct order

**Orders Module**:
- [ ] Search filters work correctly
- [ ] Pagination works correctly
- [ ] Create new order flow works
- [ ] Edit existing order flow works
- [ ] Delete order works with confirmation
- [ ] Line items can be added/removed
- [ ] Calculations update automatically
- [ ] Validation prevents invalid submissions
- [ ] Error messages display correctly
- [ ] Success messages display correctly
- [ ] Form cancellation works
- [ ] Browser back button doesn't break state
