# Aplicación Web de Gestión

Este es mi proyecto de Desarrollo de Interfaces para gestionar usuarios y productos.

## ¿Qué hace?

Es una aplicación web donde puedes:
- Ver, crear, editar y borrar usuarios
- Ver, crear, editar y borrar productos
- Buscar usuarios por nombre o email
- Buscar productos por nombre

## Tecnologías que uso

- **PHP** - Para el backend y la base de datos
- **JavaScript** - Para hacer la página más dinámica
- **Bootstrap** - Para que se vea bien
- **MySQL** - Base de datos donde guardo todo

## Cómo funciona

La aplicación usa el patrón MVC (Modelo-Vista-Controlador):

- **Modelos** - Están en la carpeta `modelos/`, aquí está la conexión con la base de datos
- **Vistas** - En `vistas/`, son las páginas que se ven
- **Controladores** - En `controladores/`, procesan las peticiones

El archivo `CFrontal.php` es como el "director de orquesta", recibe todas las peticiones y las manda al controlador correcto.

## Instalación

1. Necesitas tener XAMPP o WAMP instalado
2. Copia la carpeta del proyecto en `htdocs` (si usas XAMPP)
3. Importa la base de datos desde `modelos/usuarios y productos 2025 09 29.sql` en phpMyAdmin
4. Abre el navegador y ve a `http://localhost/nombre-carpeta/login.php`

## Login

Para entrar usa:
- Usuario: `javier`
- Contraseña: `123`

## Estructura de archivos

```
proyecto/
├── controladores/       # Lógica de negocio
├── modelos/            # Conexión BD y consultas
├── vistas/             # Páginas HTML
├── css/                # Estilos
├── js/                 # JavaScript modular
│   ├── utils.js        # Funciones comunes
│   ├── usuarios.js     # Gestión de usuarios
│   └── productos.js    # Gestión de productos
├── iconos/             # Imágenes
├── librerias/          # Bootstrap
├── index.php           # Página principal
├── login.php           # Página de login
└── CFrontal.php        # Controlador frontal
```

## Características

### Usuarios
- Formulario simple con nombre, apellidos, email, login y contraseña
- Validación de email
- Búsqueda por nombre o email
- Editar y eliminar usuarios

### Productos
- Crear productos con nombre, descripción, stock y precio
- Buscar productos
- Editar y eliminar productos

### Diseño
- Tema oscuro para que no canse la vista
- Responsive (se adapta al móvil)
- Mensajes de éxito y error

## Problemas que tuve

Al principio me costó hacer que funcionara el AJAX con PHP, pero al final lo conseguí usando `fetch()`. También tuve que aprender a usar Bootstrap para que quedara bien.

Cuando el código JavaScript empezó a crecer mucho, decidí modularizarlo en varios archivos para que fuera más fácil de mantener. Ahora tengo un archivo para funciones comunes (utils.js), otro para usuarios y otro para productos.

## Mejoras futuras

Si tuviera más tiempo me gustaría:
- Añadir más validaciones
- Hacer que se puedan subir fotos de productos
- Añadir un sistema de roles (admin, usuario normal)
- Mejorar el sistema de login con sesiones más seguras

## Notas

Este proyecto lo hice para la asignatura de Desarrollo de Interfaces. He intentado que el código sea limpio y fácil de entender.
