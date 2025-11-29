-- ============================================================
-- SCRIPT MAESTRO GESTIÓN LOGÍSTICA - EXAMEN RECUPERACIÓN
-- FORMATO: CONSTRAINTS EXPLICITOS (NAMED CONSTRAINTS)
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
   EXECUTE IMMEDIATE 'DROP TABLE intervencion CASCADE CONSTRAINTS PURGE';
EXCEPTION WHEN OTHERS THEN NULL; END;
/
BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE expedicion CASCADE CONSTRAINTS PURGE';
EXCEPTION WHEN OTHERS THEN NULL; END;
/
BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE auditoria_borrado_operario CASCADE CONSTRAINTS PURGE';
EXCEPTION WHEN OTHERS THEN NULL; END;
/
BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE operario CASCADE CONSTRAINTS PURGE';
EXCEPTION WHEN OTHERS THEN NULL; END;
/

-- ------------------------------------------------------------
-- PASO 3: CREACIÓN DE TABLAS (ESTILO FORMAL EXPLICITO)
-- ------------------------------------------------------------

-- 1. Tabla OPERARIO
CREATE TABLE operario (
    id CHAR(5),
    dni VARCHAR2(9),
    nombre VARCHAR2(100),
    apellidos VARCHAR2(100),
    latitud NUMBER(10, 6),
    longitud NUMBER(10, 6),
    activo NUMBER(1) DEFAULT 1,
    -- Restricciones Explicitas
    CONSTRAINT PK_operario PRIMARY KEY (id),
    CONSTRAINT UQ_operario_dni UNIQUE (dni),
    CONSTRAINT NN_dni_operario CHECK (dni IS NOT NULL),
    CONSTRAINT NN_nombre_operario CHECK (nombre IS NOT NULL),
    CONSTRAINT CK_activo_operario CHECK (activo IN (0, 1))
);

-- 2. Tabla EXPEDICION (Industrial/Particular)
CREATE TABLE expedicion (
    id CHAR(5),
    tipo_origen VARCHAR2(20),
    cliente VARCHAR2(100),
    direccion_recogida VARCHAR2(200),
    estado VARCHAR2(20) DEFAULT 'PENDIENTE',
    fecha_creacion DATE DEFAULT SYSDATE,
    -- Restricciones Explicitas
    CONSTRAINT PK_expedicion PRIMARY KEY (id),
    CONSTRAINT CK_tipo_origen CHECK (tipo_origen IN ('INDUSTRIAL', 'PARTICULAR')),
    CONSTRAINT NN_tipo_origen CHECK (tipo_origen IS NOT NULL),
    CONSTRAINT NN_cliente_exp CHECK (cliente IS NOT NULL),
    CONSTRAINT NN_estado_exp CHECK (estado IS NOT NULL)
);

-- 3. Tabla INTERVENCION (Trazabilidad)
CREATE TABLE intervencion (
    id CHAR(5),
    id_expedicion CHAR(5),
    id_operario CHAR(5),
    accion VARCHAR2(50),
    observaciones VARCHAR2(200),
    fecha_hora DATE DEFAULT SYSDATE,
    -- Restricciones Explicitas
    CONSTRAINT PK_intervencion PRIMARY KEY (id),
    CONSTRAINT FK_interv_expedicion FOREIGN KEY (id_expedicion) REFERENCES expedicion(id),
    CONSTRAINT FK_interv_operario FOREIGN KEY (id_operario) REFERENCES operario(id),
    CONSTRAINT CK_accion_interv CHECK (accion IN ('RECEPCION', 'VERIFICACION', 'RECOGIDA', 'APROBACION', 'RECHAZO')),
    CONSTRAINT NN_accion_interv CHECK (accion IS NOT NULL)
);

-- 4. Tabla AUDITORIA (Sin constraints complejas, solo estructura)
CREATE TABLE auditoria_borrado_operario (
    id CHAR(5),
    dni VARCHAR2(9),
    nombre VARCHAR2(100),
    fecha_borrado DATE DEFAULT SYSDATE
    -- No se suelen poner PK en tablas de auditoría pura, pero se podría si se requiere
);

-- ------------------------------------------------------------
-- PASO 4: DATOS DE PRUEBA (NECESARIOS PARA EL EXAMEN)
-- ------------------------------------------------------------

-- Insertar Operarios
INSERT INTO operario (id, dni, nombre, apellidos, latitud, longitud)
VALUES ('OP001', '11111111A', 'Juan', 'Almacen', 40.416775, -3.703790);

INSERT INTO operario (id, dni, nombre, apellidos, latitud, longitud)
VALUES ('OP002', '22222222B', 'Ana', 'Transportista', 40.420000, -3.710000);

-- Insertar Expediciones
INSERT INTO expedicion (id, tipo_origen, cliente, estado)
VALUES ('EX001', 'INDUSTRIAL', 'Juguetes S.A.', 'PENDIENTE');

INSERT INTO expedicion (id, tipo_origen, cliente, direccion_recogida, estado)
VALUES ('EX002', 'PARTICULAR', 'Luis Garcia', 'Calle Pez 4', 'PENDIENTE');

-- Insertar Intervención
INSERT INTO intervencion (id, id_expedicion, id_operario, accion, observaciones)
VALUES ('IN001', 'EX001', 'OP001', 'RECEPCION', 'Cajas en buen estado');

-- Guardar cambios
COMMIT;

-- Mensaje final
PROMPT ==============================================
PROMPT  TABLAS LOLO CREADAS (FORMATO EXPLICITO)
PROMPT ==============================================