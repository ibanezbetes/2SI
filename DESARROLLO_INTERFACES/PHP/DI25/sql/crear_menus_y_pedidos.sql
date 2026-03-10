-- ============================================================
-- crear_menus_y_pedidos.sql
-- Base de datos: db_di25
-- 
-- Script completo para crear las tablas del menú dinámico y
-- el módulo de pedidos (maestro-detalle).
-- 
-- REQUISITO: Las tablas 'usuarios' y 'productos' deben existir
-- antes de ejecutar este script (tienen claves foráneas).
-- 
-- Contenido:
--   PARTE A: Sistema de menú dinámico (tabla 'menus')
--   PARTE B: Módulo de pedidos (tablas 'pedidos' y 'lineas_pedido')
--   PARTE C: Datos de prueba para ambos módulos
--   PARTE D: Consultas de verificación
-- ============================================================

USE `db_di25`;

-- ============================================================
-- PARTE A: SISTEMA DE MENÚ DINÁMICO
-- ============================================================
-- La tabla 'menus' almacena la estructura jerárquica de navegación.
-- Los menús de nivel 1 (barra principal) tienen idPadre = NULL.
-- Los submenús (desplegables) tienen idPadre = ID de su padre.
-- El campo 'accion' contiene la llamada JavaScript que se ejecuta
-- al hacer clic (NULL para menús padre que solo abren desplegable).

-- Borrar tabla si existe (para recrear limpia)
DROP TABLE IF EXISTS `menus`;

-- Crear tabla de menús
CREATE TABLE `menus` (
  `idOpcion` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `etiqueta` VARCHAR(100) COLLATE latin1_spanish_ci NOT NULL,
  `idPadre` INT(11) UNSIGNED NULL DEFAULT NULL,
  `posicion` INT NOT NULL DEFAULT 0,
  `accion` VARCHAR(255) COLLATE latin1_spanish_ci NULL DEFAULT NULL,
  `activo` CHAR(1) COLLATE latin1_spanish_ci NOT NULL DEFAULT 'S',
  PRIMARY KEY (`idOpcion`),
  INDEX `idx_padre` (`idPadre`),
  INDEX `idx_activo_posicion` (`activo`, `posicion`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- Insertar las opciones del menú (replicando el menú estático)
INSERT INTO `menus` (`etiqueta`, `idPadre`, `posicion`, `accion`, `activo`) VALUES
-- Nivel 1: opciones principales de la barra horizontal
('Home', NULL, 1, '#', 'S'),
('Features', NULL, 2, '#', 'S'),
('Pricing', NULL, 3, '#', 'S'),
('Mtto.Datos', NULL, 4, NULL, 'S'),      -- Padre del desplegable (sin acción propia)

-- Nivel 2: submenús del desplegable "Mtto.Datos" (idPadre = 4)
('Usuarios', 4, 1, "obtenerVista('Usuarios','getVistaUsuariosPrincipal','capaContenido')", 'S'),
('Pedidos', 4, 2, "obtenerVista('Pedidos','getVistaPedidosPrincipal','capaContenido')", 'S'),
('Productos', 4, 3, "obtenerVista('Productos','getVistaProductosPrincipal','capaContenido')", 'S');


-- ============================================================
-- PARTE B: MÓDULO DE PEDIDOS (Maestro-Detalle)
-- ============================================================
-- Tabla 'pedidos' = Cabecera del pedido (Maestro)
-- Tabla 'lineas_pedido' = Líneas de detalle (Detalle)
-- Las líneas tienen ON DELETE CASCADE para que al borrar un pedido
-- se borren automáticamente sus líneas.

-- Borrar tablas si existen (primero las hijas, luego las padres)
DROP TABLE IF EXISTS `lineas_pedido`;
DROP TABLE IF EXISTS `pedidos`;

-- Crear tabla de pedidos (cabecera)
CREATE TABLE `pedidos` (
  `idPedido` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `fecha` DATE NOT NULL,
  `idUsuario` INT(11) UNSIGNED NOT NULL,
  `estado` VARCHAR(20) COLLATE latin1_spanish_ci NOT NULL DEFAULT 'Pendiente',
  `total` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  `observaciones` TEXT COLLATE latin1_spanish_ci NULL DEFAULT NULL,
  `activo` CHAR(1) COLLATE latin1_spanish_ci NOT NULL DEFAULT 'S',
  `fechaCreacion` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idPedido`),
  INDEX `idx_fecha` (`fecha`),
  INDEX `idx_usuario` (`idUsuario`),
  INDEX `idx_activo` (`activo`),
  CONSTRAINT `fk_pedidos_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- Crear tabla de líneas de pedido (detalle)
CREATE TABLE `lineas_pedido` (
  `idLinea` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `idPedido` INT(11) UNSIGNED NOT NULL,
  `idProducto` INT(11) NOT NULL,
  `cantidad` INT NOT NULL,
  `precioUnitario` DECIMAL(10,2) NOT NULL,
  `subtotal` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`idLinea`),
  INDEX `idx_pedido` (`idPedido`),
  CONSTRAINT `fk_lineas_pedido` FOREIGN KEY (`idPedido`) REFERENCES `pedidos` (`idPedido`) ON DELETE CASCADE,
  CONSTRAINT `fk_lineas_producto` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`idProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;


-- ============================================================
-- PARTE C: DATOS DE PRUEBA
-- ============================================================

-- (Las inserciones de pedidos de prueba se han movido al script de productos de informática)


-- ============================================================
-- PARTE D: CONSULTAS DE VERIFICACIÓN
-- (Ejecutar tras importar para comprobar que todo se creó bien)
-- ============================================================

-- Verificar que las tablas se crearon
SELECT 'Tablas de menus creadas correctamente' AS Estado;
SELECT COUNT(*) AS TotalOpcionesMenu FROM menus;

SELECT 'Tablas de pedidos creadas correctamente' AS Estado;
SELECT COUNT(*) AS TotalPedidos FROM pedidos;
SELECT COUNT(*) AS TotalLineas FROM lineas_pedido;

-- Mostrar estructura del menú (padres e hijos)
SELECT 
    m1.idOpcion,
    m1.etiqueta AS 'Opción',
    m1.posicion AS 'Posición',
    CASE WHEN m1.idPadre IS NULL THEN 'Nivel 1' ELSE 'Nivel 2' END AS 'Nivel',
    m2.etiqueta AS 'Padre',
    m1.activo AS 'Activo'
FROM menus m1
LEFT JOIN menus m2 ON m1.idPadre = m2.idOpcion
ORDER BY COALESCE(m1.idPadre, m1.idOpcion), m1.posicion;

-- Mostrar pedidos con sus totales y número de líneas
SELECT 
    p.idPedido,
    p.fecha,
    u.nombre AS Cliente,
    p.estado,
    p.total,
    COUNT(lp.idLinea) AS NumLineas
FROM pedidos p
INNER JOIN usuarios u ON p.idUsuario = u.idUsuario
LEFT JOIN lineas_pedido lp ON p.idPedido = lp.idPedido
WHERE p.activo = 'S'
GROUP BY p.idPedido
ORDER BY p.fecha DESC;
