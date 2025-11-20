# Aplicación Web de Gestión - Proyecto DI

Aplicación web para gestionar usuarios y productos usando PHP, JavaScript y MySQL.

## ¿Qué hace esta aplicación?

Es un CRUD (Crear, Leer, Actualizar, Borrar) completo para:
- **Usuarios**: nombre, apellidos, email, móvil, login, contraseña
- **Productos**: nombre, descripción, stock, precio

## Tecnologías usadas

- **PHP 7+**: Backend y lógica del servidor
- **MySQL**: Base de datos
- **JavaScript**: Interactividad sin recargar la página (AJAX)
- **Bootstrap 5**: Diseño responsive
- **HTML/CSS**: Estructura y estilos

## Cómo funciona (Arquitectura MVC)

El proyecto usa el patrón **Modelo-Vista-Controlador**:

### 1. Modelo (modelos/)
Gestiona la conexión con la base de datos.
- `DAO.php`: Clase que conecta con MySQL y ejecuta consultas

### 2. Vista (vistas/)
Las páginas HTML que ve el usuario.
- `VUsuariosPrincipal.php`: Formulario de búsqueda de usuarios
- `VProductosPrincipal.php`: Formulario de búsqueda de productos

### 3. Controlador (controladores/)
Procesa las peticiones y coordina Modelo y Vista.
- `CUsuarios.php`: Lógica de usuarios (crear, editar, eliminar)
- `CProductos.php`: Lógica de productos

### 4. Controlador Frontal
- `CFrontal.php`: Recibe TODAS las peticiones y las dirige al controlador correcto

### 5. JavaScript Modular (js/)
- `utils.js`: Funciones comunes (validaciones, mensajes, AJAX)
- `usuarios.js`: Funciones específicas de usuarios
- `productos.js`: Funciones específicas de productos

## Flujo de una petición

```
Usuario hace clic → JavaScript (AJAX) → CFrontal.php → Controlador → Modelo (BD) → Vista → Usuario
```

**Ejemplo**: Crear un usuario
1. Usuario rellena formulario y hace clic en "Guardar"
2. `usuarios.js` valida los datos
3. `usuarios.js` envía petición AJAX a `CFrontal.php?controlador=Usuarios&metodo=crearUsuario`
4. `CFrontal.php` carga `CUsuarios.php` y llama al método `crearUsuario()`
5. `CUsuarios.php` usa `DAO.php` para insertar en la base de datos
6. Devuelve mensaje de éxito o error
7. JavaScript muestra el mensaje al usuario

## Instalación

### Requisitos
- XAMPP o WAMP (incluye Apache + MySQL + PHP)
- Navegador web moderno

### Pasos
1. Instala XAMPP desde https://www.apachefriends.org/
2. Copia esta carpeta en `C:\xampp\htdocs\`
3. Abre XAMPP Control Panel y arranca Apache y MySQL
4. Abre phpMyAdmin: http://localhost/phpmyadmin
5. Crea una base de datos llamada `db_di25`
6. Importa el archivo `modelos/usuarios y productos 2025 09 29.sql`
7. Abre en el navegador: http://localhost/nombre-carpeta/login.php

## Login

Para entrar a la aplicación:
- **Usuario**: javier
- **Contraseña**: 123

## Estructura del proyecto

```
proyecto/
├── controladores/          # Lógica de negocio
│   ├── Controlador.php     # Clase base
│   ├── CUsuarios.php       # Controlador de usuarios
│   └── CProductos.php      # Controlador de productos
│
├── modelos/                # Acceso a datos
│   ├── DAO.php             # Conexión y consultas a MySQL
│   └── *.sql               # Script de la base de datos
│
├── vistas/                 # Páginas HTML
│   ├── Vista.php           # Clase para renderizar vistas
│   ├── Usuarios/           # Vistas de usuarios
│   └── Productos/          # Vistas de productos
│
├── js/                     # JavaScript modular
│   ├── utils.js            # Funciones comunes
│   ├── usuarios.js         # Gestión de usuarios
│   └── productos.js        # Gestión de productos
│
├── css/                    # Estilos
│   └── estilos.css         # Tema oscuro personalizado
│
├── iconos/                 # Imágenes
│   ├── logo.png
│   ├── login.png
│   └── logout.png
│
├── librerias/              # Librerías externas
│   └── bootstrap-5.3.8/    # Framework CSS
│
├── CFrontal.php            # Controlador frontal (enrutador)
├── index.php               # Página principal
├── login.php               # Página de login
├── logout.php              # Cerrar sesión
└── README.md               # Este archivo
```

## Características principales

### Usuarios
- ✅ Buscar por nombre o email
- ✅ Ver todos los usuarios
- ✅ Crear nuevo usuario con validación
- ✅ Editar usuario existente
- ✅ Eliminar usuario (borrado lógico)
- ✅ Validación de email y móvil

### Productos
- ✅ Buscar por nombre
- ✅ Ver todos los productos
- ✅ Crear nuevo producto
- ✅ Editar producto existente
- ✅ Eliminar producto (borrado lógico)

### Diseño
- ✅ Tema oscuro para no cansar la vista
- ✅ Responsive (funciona en móvil)
- ✅ Mensajes de éxito y error
- ✅ Sin recargar la página (AJAX)

## Conceptos que aprendí

### PHP
- Clases y objetos (POO)
- Conexión a MySQL con mysqli
- Patrón MVC
- Sesiones para el login
- Consultas SQL (SELECT, INSERT, UPDATE)

### JavaScript
- Fetch API para AJAX
- Validación de formularios
- Manipulación del DOM
- Modularización del código

### Base de datos
- Diseño de tablas
- Relaciones entre tablas
- Consultas con filtros
- Borrado lógico (campo 'activo')

## Problemas que resolví

1. **AJAX con PHP**: Al principio no entendía cómo enviar datos sin recargar la página. Aprendí a usar `fetch()` y a procesar las respuestas.

2. **Modularización**: Cuando el JavaScript llegó a 500 líneas, lo dividí en 3 archivos (utils, usuarios, productos) para que fuera más fácil de mantener.

3. **Validaciones**: Tuve que aprender expresiones regulares para validar emails y móviles.

4. **Tema oscuro**: Quería que la aplicación no cansara la vista, así que implementé un tema oscuro con variables CSS.

## Posibles mejoras

Si tuviera más tiempo, me gustaría:
- [ ] Añadir paginación a las tablas
- [ ] Subir fotos de productos
- [ ] Sistema de roles (admin, usuario)
- [ ] Recuperar contraseña por email
- [ ] Exportar datos a Excel
- [ ] Gráficos de estadísticas

## Notas técnicas

### Seguridad
⚠️ **Importante**: Este es un proyecto educativo. En producción habría que:
- Usar prepared statements para evitar SQL injection
- Hashear contraseñas con password_hash() en lugar de md5()
- Validar datos en el servidor, no solo en JavaScript
- Usar HTTPS

### Base de datos
La aplicación usa "borrado lógico": cuando eliminas un usuario o producto, no se borra de la base de datos, solo se marca como inactivo (activo='N'). Así se puede recuperar si fue un error.

## Créditos

Proyecto realizado para la asignatura de Desarrollo de Interfaces.
