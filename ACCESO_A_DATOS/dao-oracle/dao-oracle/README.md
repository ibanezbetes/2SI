# DAO Oracle - Tienda (Parte Ventas)

Requisitos entregables v1.0:
- BD Oracle creada y poblada (scripts incluidos en `sql/tablas.sql`).
- DAO de acceso desde Java con menú de consola:
  1. Ver todas las ventas (tickets)
  2. Ver ventas por periodo
  3. Ver todos los artículos
  4. Insertar un nuevo artículo

## Configuración Oracle

1) Crear usuario (no usar SYS para la app):

En versiones 21c/19c con PDB (XEPDB1):
```
CONNECT sys AS sysdba
ALTER SESSION SET "_ORACLE_SCRIPT"=true; -- si hace falta
CREATE USER LOLO IDENTIFIED BY LOLO;
GRANT CONNECT, RESOURCE TO LOLO;
GRANT DBA TO LOLO; -- solo para clase
```

2) Listener en `listener.ora` (reemplazar host por localhost):
```
(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))
```
Luego en SQL*Plus como SYS:
```
alter system set LOCAL_LISTENER='(ADDRESS=(PROTOCOL=TCP)(HOST=localhost)(PORT=1521))' scope=both;
alter system register;
show parameter local_listener
```

3) Conexión JDBC por defecto usada por la app:
```
jdbc:oracle:thin:@localhost:1521/XEPDB1
usuario: LOLO
clave:   LOLO
```
Puedes sobreescribir con variables de entorno o propiedades de la JVM:
- ORACLE_URL
- ORACLE_USER
- ORACLE_PASS

## Scripts SQL

Ver `sql/tablas.sql` para crear tablas y datos de ejemplo.

## Ejecutar

Con Maven:
```
mvn -q -DskipTests package
mvn -q exec:java -Dexec.mainClass=org.example.App
```

Sin Maven (desde IDE):
- Añade `ojdbc11` (23.x) al classpath.
- Ejecuta `org.example.App`.

## Notas
- Si usas 11g Express, la URL sería `jdbc:oracle:thin:@localhost:1521:XE` (SID) en lugar de SERVICE_NAME.
- Si hay choque de puertos con GlassFish, cambia puertos de GlassFish.
