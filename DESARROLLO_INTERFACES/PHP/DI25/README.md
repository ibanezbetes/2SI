# 🚀 Proyecto DI25 - Aplicación de Gestión con Validaciones Completas

> **Aplicación de Daniel Ibáñez - Desarrollo de Interfaces 2025**

## ✨ Características Implementadas

### 🎯 Funcionalidades Principales
- ✅ **Gestión Completa de Usuarios** con validaciones JavaScript y PHP
- ✅ **Gestión Completa de Productos** con validaciones JavaScript y PHP
- ✅ **Sistema de Login** funcional con sesiones
- ✅ **Validación de Login Repetido** (cliente y servidor)
- ✅ **Mensajes Visuales** sin alerts (Bootstrap)
- ✅ **Sin Recargas de Página** (AJAX puro)
- ✅ **Patrón MVC + Front Controller** mantenido
- ✅ **Interfaz Responsive** con Bootstrap 5.3.8
- ✅ **Tema Oscuro** personalizado

### 📚 Documentación Adicional
- 📄 [`CAMBIOS_IMPLEMENTADOS.md`](CAMBIOS_IMPLEMENTADOS.md) - Documentación completa de cambios
- 🧪 [`INSTRUCCIONES_PRUEBA.md`](INSTRUCCIONES_PRUEBA.md) - Guía de pruebas detallada

---

## 🏗️ Arquitectura del Proyecto

### Archivos Principales
- `index.php` - Página principal que carga vistas via `CFrontal.php`
- `index.js` - **Funciones JavaScript con validaciones completas**
- `CFrontal.php` - Front controller (patrón MVC)
- `controladores/CUsuarios.php`, `controladores/CProductos.php` - Controladores con validaciones
- `vistas/Usuarios/*`, `vistas/Productos/*` - Vistas con Bootstrap
- `modelos/DAO.php` - Acceso a BD
- `modelos/usuarios y productos 2025 09 29.sql` - Script SQL

### Configuración Base de Datos
- **HOST**: 127.0.0.1
- **USER**: root
- **PASS**: (vacío)
- **DB**: db_di25

---

## ⚙️ Instalación y Configuración

### Requisitos Previos
- PHP 7.x/8.x instalado
- MySQL o MariaDB
- Usuario `root` sin contraseña (o editar `modelos/DAO.php` con tus credenciales)

### Pasos de Instalación

#### 1. Importar la Base de Datos

**Usando MySQL CLI:**
```powershell
mysql -u root -p
# dentro de mysql:
CREATE DATABASE IF NOT EXISTS db_di25 CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
exit

# desde PowerShell:
mysql -u root db_di25 < "modelos\usuarios y productos 2025 09 29.sql"
```

**Usando phpMyAdmin:**
- Crear base de datos `db_di25`
- Importar el archivo `modelos/usuarios y productos 2025 09 29.sql`

#### 2. Iniciar Servidor PHP

```powershell
cd "c:\Users\daniz\Documents\GitHub\2SI\DESARROLLO_INTERFACES\PHP\di25"
php -S localhost:8000
```

#### 3. Abrir en el Navegador

```
http://localhost:8000/index.php
```

#### 4. Credenciales de Prueba

**Login predefinido:**
- Usuario: `javier`
- Contraseña: `123`

---

## 🎮 Cómo Usar la Aplicación

### Login
1. Acceder a `login.php`
2. Ingresar credenciales (javier / 123)
3. Click en "Acceder"

### Gestión de Usuarios
1. **Menú** → Mtto.Datos → Usuarios
2. **Buscar**: Filtrar por nombre o email
3. **Ver Todos**: Mostrar todos los usuarios
4. **Crear**: Click en "Crear Nuevo Usuario"
   - Completa el formulario
   - Las validaciones se ejecutan automáticamente
   - Los errores se muestran en pantalla
5. **Editar**: Click en botón ✏️
   - Modifica los campos necesarios
   - Guarda los cambios
6. **Eliminar**: Click en botón ❌
   - Confirma la eliminación

### Gestión de Productos
- **Menú** → Mtto.Datos → Productos
- Mismas funcionalidades que Usuarios

---

## 🔒 Validaciones Implementadas

### Del Lado del Cliente (JavaScript)
- ✅ Campos obligatorios no vacíos
- ✅ Formato de email válido
- ✅ Formato de móvil español (9 dígitos, 6/7/8/9)
- ✅ Precio y stock como números positivos
- ✅ **Login no repetido** (verificación AJAX en tiempo real)

### Del Lado del Servidor (PHP)
- ✅ Validación de campos obligatorios
- ✅ **Verificación de login duplicado** antes de INSERT/UPDATE
- ✅ Sanitización de datos
- ✅ Mensajes descriptivos de error

---

## 📊 Estructura de Base de Datos

### Tabla: `usuarios`
```sql
- idUsuario (PK)
- nombre
- apellido1
- apellido2
- mail
- movil
- login (UNIQUE)
- pass (MD5)
- sexo
- fechaAlta
- activo (S/N)
```

### Tabla: `productos`
```sql
- idProducto (PK)
- producto
- descripcion
- idCategoria
- stock
- precioCompra
- precioVenta
- stockMinimo
- activo (S/N)
```

---

## ⚠️ Notas Importantes

### Seguridad
- El código usa concatenación SQL (aceptable para práctica)
- **Para producción**: Usar prepared statements para prevenir SQL injection
- Las contraseñas se guardan con MD5 (mejor usar bcrypt/argon2 en producción)

### Troubleshooting

**Error de conexión a BD:**
- Verifica que MySQL esté corriendo
- Comprueba credenciales en `modelos/DAO.php`

**Errores JavaScript:**
- Abre consola del navegador (F12)
- Revisa la pestaña "Console"

**Errores PHP:**
- Revisa output del servidor `php -S`
- Verifica `php_error.log`

**Caché del navegador:**
- Recarga forzada: `Ctrl + Shift + R`

---

## 📝 Créditos

**Autor**: Daniel Ibáñez  
**Asignatura**: Desarrollo de Interfaces  
**Curso**: 2SI/2SID - 2025/2026  
**Profesores**: Alfredo Corrales - Javier Lasheras

---

## 🚀 Próximos Pasos (Opcional)

- [ ] Agregar paginación a las tablas
- [ ] Implementar filtros avanzados
- [ ] Agregar modales para formularios
- [ ] Implementar confirmación de contraseña
- [ ] Agregar validación de contraseña fuerte
- [ ] Usar prepared statements (seguridad)
- [ ] Implementar sistema de roles

---

**¿Listo para entregar?** ✅ Revisa el checklist en [`INSTRUCCIONES_PRUEBA.md`](INSTRUCCIONES_PRUEBA.md)
