-- ============================================================
-- SCRIPT MAESTRO GESTIÓN LOGÍSTICA (FORMATO CONSTRAINTS EXPLICITOS)
-- ============================================================

-- ------------------------------------------------------------
-- PASO 1: CONEXIÓN
-- ------------------------------------------------------------
CONNECT LOLO/LOLO;
SHOW USER;

-- ------------------------------------------------------------
-- PASO 2: LIMPIEZA (Borrado seguro con CASCADE)
-- ------------------------------------------------------------
BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE historial_ubicacion CASCADE CONSTRAINTS PURGE';
EXCEPTION WHEN OTHERS THEN NULL; END;
/
BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE trazabilidad CASCADE CONSTRAINTS PURGE';
EXCEPTION WHEN OTHERS THEN NULL; END;
/
BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE envio CASCADE CONSTRAINTS PURGE';
EXCEPTION WHEN OTHERS THEN NULL; END;
/
BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE operario CASCADE CONSTRAINTS PURGE';
EXCEPTION WHEN OTHERS THEN NULL; END;
/

-- ------------------------------------------------------------
-- PASO 3: CREACIÓN DE TABLAS (ESTILO FORMAL)
-- ------------------------------------------------------------

-- 1. Tabla OPERARIO
CREATE TABLE operario (
    id CHAR(5),
    dni VARCHAR2(9),
    nombre VARCHAR2(100),
    especialidad VARCHAR2(20),
    activo NUMBER(1) DEFAULT 1,
    -- Restricciones
    CONSTRAINT PK_operario PRIMARY KEY (id),
    CONSTRAINT NN_dni_operario CHECK (dni IS NOT NULL),
    CONSTRAINT NN_nombre_operario CHECK (nombre IS NOT NULL),
    CONSTRAINT CK_activo_bool CHECK (activo IN (0, 1))
);

-- 2. Tabla ENVIO
CREATE TABLE envio (
    id CHAR(5),
    id_pedido_ref CHAR(5),
    id_repartidor CHAR(5),
    estado VARCHAR2(20),
    fecha_creacion DATE DEFAULT SYSDATE,
    latitud NUMBER(10, 8),
    longitud NUMBER(11, 8),
    -- Restricciones
    CONSTRAINT PK_envio PRIMARY KEY (id),
    CONSTRAINT FK_envio_operario FOREIGN KEY (id_repartidor) REFERENCES operario(id),
    CONSTRAINT NN_id_pedido_ref CHECK (id_pedido_ref IS NOT NULL),
    CONSTRAINT NN_estado_envio CHECK (estado IS NOT NULL)
);

-- 3. Tabla TRAZABILIDAD
CREATE TABLE trazabilidad (
    id CHAR(5),
    id_envio CHAR(5),
    id_operario CHAR(5),
    fase VARCHAR2(50),
    fecha_hora DATE DEFAULT SYSDATE,
    -- Restricciones
    CONSTRAINT PK_trazabilidad PRIMARY KEY (id),
    CONSTRAINT FK_trazabilidad_envio FOREIGN KEY (id_envio) REFERENCES envio(id),
    CONSTRAINT FK_trazabilidad_operario FOREIGN KEY (id_operario) REFERENCES operario(id),
    CONSTRAINT NN_fase_trazabilidad CHECK (fase IS NOT NULL)
);

-- 4. Tabla HISTORIAL_UBICACION
CREATE TABLE historial_ubicacion (
    id CHAR(5),
    id_envio CHAR(5),
    latitud NUMBER(10, 8),
    longitud NUMBER(11, 8),
    fecha_registro DATE DEFAULT SYSDATE,
    -- Restricciones
    CONSTRAINT PK_historial_ubicacion PRIMARY KEY (id),
    CONSTRAINT FK_historial_envio FOREIGN KEY (id_envio) REFERENCES envio(id),
    CONSTRAINT NN_hist_latitud CHECK (latitud IS NOT NULL),
    CONSTRAINT NN_hist_longitud CHECK (longitud IS NOT NULL)
);

-- ------------------------------------------------------------
-- PASO 4: DATOS DE PRUEBA
-- ------------------------------------------------------------

-- Operarios
INSERT INTO operario (id, dni, nombre, especialidad) VALUES ('OP001', '1111A', 'Juan Test', 'PREPARADOR');
INSERT INTO operario (id, dni, nombre, especialidad) VALUES ('OP002', '2222B', 'Ana Test', 'CALIDAD');

-- Envio
INSERT INTO envio (id, id_pedido_ref, estado) VALUES ('EN001', 'PE001', 'PENDIENTE');

-- Trazabilidad (Ejemplo opcional)
INSERT INTO trazabilidad (id, id_envio, id_operario, fase) VALUES ('TR001', 'EN001', 'OP001', 'RECEPCION');

-- Guardar cambios
COMMIT;

-- Mensaje final
PROMPT ==========================================
PROMPT  TABLAS CREADAS CON FORMATO EXPLICITO
PROMPT ==========================================