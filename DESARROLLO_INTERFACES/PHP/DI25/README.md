# Proyecto DI25 - Instrucciones de prueba local

Archivos principales:
- `index.php` - Front page que carga vistas via `CFrontal.php`.
- `CFrontal.php` - Front controller.
- `controladores/CUsuarios.php`, `controladores/CProductos.php` - controladores.
- `vistas/Usuarios/*`, `vistas/Productos/*` - vistas.
- `modelos/DAO.php` - acceso a BD (config: HOST=127.0.0.1, USER=root, PASS=, DB=db_di25).
- `modelos/usuarios y productos 2025 09 29.sql` - script SQL con tablas y datos.

Requisitos previos:
- PHP 7.x/8.x instalado.
- MySQL o MariaDB con un usuario `root` sin contraseña (o editar `modelos/DAO.php` con tus credenciales).

Pasos rápidos para probar en Windows (PowerShell):

1. Importar la base de datos (usar MySQL CLI o phpMyAdmin):

# Usando MySQL CLI (ajusta usuario/contraseña si procede)
```powershell
mysql -u root -p
# dentro de mysql:
CREATE DATABASE IF NOT EXISTS db_di25 CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
exit
# desde PowerShell:
mysql -u root db_di25 < "modelos\usuarios y productos 2025 09 29.sql"
```

2. Iniciar servidor PHP integrado apuntando la carpeta del proyecto:

```powershell
cd "c:\Users\daniz\Documents\GitHub\2SI\DESARROLLO_INTERFACES\PHP\di25"
php -S localhost:8000
```

3. Abrir en el navegador `http://localhost:8000/index.php`.

4. Probar flujo:
- Login: `login.php` (usuario de ejemplo en el código: `javier` / `123`).
- Menú Mtto.Datos → Usuarios: Ver todos, crear, editar, eliminar.
- Menú Mtto.Datos → Productos: Ver todos, crear, editar, eliminar.

Notas y recomendaciones:
- Si la base de datos usa un usuario/clave diferente edita `modelos/DAO.php`.
- El código usa consultas SQL construidas con concatenación (para la práctica está aceptado, pero en producción usa prepared statements para evitar inyección SQL).
- Si ves errores en servidor revisa `php_error.log` o el output del servidor `php -S`.

Si quieres, puedo preparar un zip listo para subir a Classroom o seguir mejorando UI (modales, validaciones).