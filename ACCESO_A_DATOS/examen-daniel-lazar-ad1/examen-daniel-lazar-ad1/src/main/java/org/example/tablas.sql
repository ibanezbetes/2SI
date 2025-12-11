
DROP TABLE incidencias CASCADE CONSTRAINTS;
DROP TABLE ordenes_trabajo CASCADE CONSTRAINTS;
DROP TABLE pedidos CASCADE CONSTRAINTS;
DROP TABLE articulos CASCADE CONSTRAINTS;
DROP TABLE empleados CASCADE CONSTRAINTS;

CREATE TABLE EMPLEADOS (
    id_empleado NUMBER,
    nombre VARCHAR2(50),
    cargo VARCHAR2(100),
    CONSTRAINT pk_id_empleado PRIMARY KEY (id_empleado)
);

CREATE TABLE ARTICULOS (
    id_articulo NUMBER,
    nombre VARCHAR2(50),
    descripcion VARCHAR2(100),
    SKU VARCHAR2(50),
    precio NUMBER(10,2),
    CONSTRAINT pk_id_articulo PRIMARY KEY (id_articulo)
);

CREATE TABLE PEDIDOS (
    id_pedido NUMBER,
    fecha_pedido DATE DEFAULT SYSDATE,
    cliente_nombre VARCHAR2(100),
    CONSTRAINT pk_id_pedido PRIMARY KEY (id_pedido)
);

CREATE TABLE ordenes_trabajo (
    id_orden NUMBER,
    codigo_orden VARCHAR2(50),
    fecha_generacion DATE DEFAULT SYSDATE,
    estado VARCHAR2(30),
    prioridad VARCHAR2(30),
    id_pedido NUMBER,
    id_responsable NUMBER,
    transporte_compania VARCHAR2(100),
    transporte_coste NUMBER(10,2),
    transporte_tracking VARCHAR2(100),
    fecha_salida DATE,
    CONSTRAINT pk_id_orden PRIMARY KEY (id_orden),
    CONSTRAINT codigo_orden_nn CHECK (codigo_orden IS NOT NULL),
    CONSTRAINT fecha_generacion_nn CHECK (fecha_generacion IS NOT NULL),
    CONSTRAINT id_responsable_nn CHECK (id_responsable IS NOT NULL),
    CONSTRAINT uq_id_pedido UNIQUE (id_pedido),
    CONSTRAINT fk_id_pedido FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
    CONSTRAINT fk_id_responsable FOREIGN KEY (id_responsable) REFERENCES empleados(id_empleado)
);

CREATE TABLE incidencias (
    id_incidencia NUMBER,
    codigo_incidencia VARCHAR2(50),
    fecha_registro DATE DEFAULT SYSDATE,
    tipo VARCHAR2(30),
    descripcion VARCHAR2(100),
    estado VARCHAR2(30),
    id_orden NUMBER,
    id_articulo_afectado NUMBER,
    id_empleado_reporta NUMBER,
    CONSTRAINT pk_id_incidencia PRIMARY KEY (id_incidencia),
    CONSTRAINT nn_codigo_incidencia CHECK (codigo_incidencia IS NOT NULL),
    CONSTRAINT nn_tipo CHECK (tipo IS NOT NULL),
    CONSTRAINT nn_id_orden CHECK (id_orden IS NOT NULL),
    CONSTRAINT nn_id_empleado_reporta CHECK (id_empleado_reporta IS NOT NULL),
    CONSTRAINT fk_id_orden FOREIGN KEY (id_orden) REFERENCES ordenes_trabajo(id_orden),
    CONSTRAINT fk_id_articulo_afectado FOREIGN KEY (id_articulo_afectado) REFERENCES articulos(id_articulo),
    CONSTRAINT fk_id_empleado_reporta FOREIGN KEY (id_empleado_reporta) REFERENCES empleados(id_empleado)
);

INSERT INTO empleados (id_empleado, nombre, cargo) VALUES (1,'Juan', 'Mozo Almacén');
INSERT INTO empleados (id_empleado, nombre, cargo) VALUES (2,'Maria', 'Jefa Logística');
INSERT INTO empleados (id_empleado, nombre, cargo) VALUES (3,'Carlos', 'Mozo Almacén');

INSERT INTO articulos (id_articulo, nombre, descripcion, sku, precio) VALUES (1,'Monitor 24', 'Pantalla', 'MON-1', 150.00);
INSERT INTO articulos (id_articulo, nombre, descripcion, sku, precio) VALUES (2,'Teclado Mecánico', 'Teclado', 'TEC-2', 80.50);
INSERT INTO articulos (id_articulo, nombre, descripcion, sku, precio) VALUES (3,'Ratón Gaming', 'Raton', 'RAT-3', 45.00);

INSERT INTO pedidos (id_pedido, fecha_pedido, cliente_nombre) VALUES (1, SYSDATE, 'Cliente Online 1');
INSERT INTO pedidos (id_pedido, fecha_pedido, cliente_nombre) VALUES (2, SYSDATE, 'Cliente Tienda Física 1');
INSERT INTO pedidos (id_pedido, fecha_pedido, cliente_nombre) VALUES (3, SYSDATE, 'Cliente Online 2');

INSERT INTO ordenes_trabajo (id_orden, codigo_orden, estado, prioridad, id_pedido, id_responsable) 
VALUES (1,'O1', 'en preparacion', 'normal', 1, 1);

INSERT INTO ordenes_trabajo (id_orden, codigo_orden, estado, prioridad, id_pedido, id_responsable, transporte_compania, transporte_coste, transporte_tracking, fecha_salida)
VALUES (2, 'O2', 'enviada', 'urgente', 2, 3, 'DHL', 15.50, 'DHL-123', SYSDATE);

INSERT INTO ordenes_trabajo (id_orden, codigo_orden, estado, prioridad, id_pedido, id_responsable)
VALUES (3, 'O3', 'pendiente', 'normal', 3, 1);

INSERT INTO incidencias (id_incidencia, codigo_incidencia, tipo, descripcion, id_orden, id_articulo_afectado, id_empleado_reporta, estado)
VALUES (1, 'INC-1', 'producto dañado', 'Golpe caja', 1, 1, 1, 'abierta'); -- Corregido ID 'INC-1' a 1 si es NUMBER, o ajustar tabla. Asumo ID numérico por tu definición INT.

INSERT INTO incidencias (id_incidencia, codigo_incidencia, tipo, descripcion, id_orden, id_articulo_afectado, id_empleado_reporta, estado)
VALUES (2, 'INC-2', 'error albaran', 'Dirección mal', 2, 3, 2, 'resuelta'); -- Corregido NULL en id_orden no permitido por tu constraint nn_id_orden, puse orden 2.

COMMIT;