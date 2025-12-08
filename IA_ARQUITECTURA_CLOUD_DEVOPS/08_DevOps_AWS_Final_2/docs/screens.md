# Documentación de Pantallas - Mantenigram
## Red Social de Profesionales de Mantenimiento

---

## 📱 Estructura de Navegación

```
Stack Navigator (Main)
├── HomeScreen (inicial)
├── FiltersScreen (modal)
├── DetailScreen
├── CreateItemScreen
├── FavoritesScreen
└── ProfileScreen
```

---

## 1. HomeScreen (Feed Principal)

### 🎯 Objetivo
Mostrar el feed principal con posts de trabajos de mantenimiento realizados por profesionales, permitiendo búsqueda, filtrado y navegación a detalles.

### 🧩 Componentes Principales
- **Header**: Título "Mantenigram" + botón de perfil
- **SearchBar**: Barra de búsqueda con icono de lupa
- **FilterButton**: Botón para abrir pantalla de filtros
- **ItemList (FlatList)**: Lista scrolleable de ItemCards
- **ItemCard**: Card con:
  - Imagen thumbnail (16:9)
  - Título del trabajo
  - Categoría (badge con color)
  - Precio
  - Botón de favorito
  - Avatar y nombre del profesional
- **FloatingActionButton**: Botón "+" para crear nuevo post
- **TabBar**: Navegación inferior (Home, Favoritos, Perfil)

### 🔄 Estados
- **Loading**: Mostrar skeleton screens o spinner mientras carga
- **Success**: Mostrar lista de posts
- **Error**: Mostrar mensaje de error con botón "Reintentar"
- **Empty**: Mostrar ilustración y mensaje "No hay posts aún"

### 🚀 Navegación
- **Desde**: Ninguna (pantalla inicial)
- **Hacia**:
  - FiltersScreen (al tocar botón de filtros)
  - DetailScreen (al tocar un ItemCard)
  - CreateItemScreen (al tocar FloatingActionButton)
  - FavoritesScreen (al tocar tab Favoritos)
  - ProfileScreen (al tocar tab Perfil o botón de perfil)

### 📡 Integración API
- **Endpoint**: `GET /items?page=1&limit=20&q=&category=&minPrice=&maxPrice=&sort=createdAt&order=DESC`
- **Refresh**: Pull-to-refresh para recargar
- **Paginación**: Infinite scroll o "Cargar más"

### 📝 Notas
- Aplicar filtros desde FiltersScreen actualiza esta pantalla
- Marcar/desmarcar favorito actualiza el icono en tiempo real
- Implementar debounce en búsqueda (300ms)

---

## 2. FiltersScreen (Filtros Avanzados)

### 🎯 Objetivo
Permitir al usuario filtrar posts por categoría, rango de precio, búsqueda por texto y ordenamiento.

### 🧩 Componentes Principales
- **Header**: Título "Filtros" + botón cerrar
- **SearchInput**: Input de búsqueda por texto
- **CategoryPicker**: Selector de categoría (Todas, Electricidad, Fontanería, HVAC, Carpintería, Pintura, Mecánica)
- **PriceRangeSlider**: Slider doble para min/max precio
- **SortPicker**: Selector de ordenamiento (Más reciente, Más antiguo, Precio menor, Precio mayor)
- **ApplyButton**: Botón "Aplicar Filtros" (Primary)
- **ResetButton**: Botón "Limpiar Filtros" (Secondary)

### 🔄 Estados
- **Normal**: Mostrar filtros actuales
- **Modified**: Indicar que hay cambios sin aplicar
- **Applied**: Filtros aplicados exitosamente

### 🚀 Navegación
- **Desde**: HomeScreen
- **Hacia**: HomeScreen (al aplicar o cerrar)

### 📡 Integración API
- No hace llamadas directas
- Pasa parámetros a HomeScreen para que haga la llamada

### 📝 Notas
- Puede ser modal o pantalla completa
- Guardar estado de filtros en Context o state lifting
- Mostrar contador de filtros activos en HomeScreen

---

## 3. DetailScreen (Detalle de Post)

### 🎯 Objetivo
Mostrar información completa de un post de mantenimiento, incluyendo imagen grande, video YouTube, descripción completa y datos del profesional.

### 🧩 Componentes Principales
- **Header**: Botón atrás + botón compartir + botón favorito
- **ImageViewer**: Imagen principal desde S3 (pantalla completa o 16:9)
- **VideoPlayer**: Reproductor de video YouTube embebido
- **TitleSection**: Título del trabajo (H2)
- **CategoryBadge**: Badge con categoría y color
- **PriceTag**: Precio destacado
- **DescriptionSection**: Descripción completa del trabajo
- **UserCard**: Card del profesional:
  - Avatar
  - Nombre
  - Especialidad
  - Botón "Ver perfil"
- **MetadataSection**: Fecha de publicación, ubicación (si aplica)
- **ActionButtons**: Botones de acción (Contactar, Compartir, etc.)

### 🔄 Estados
- **Loading**: Mostrar skeleton mientras carga
- **Success**: Mostrar contenido completo
- **Error**: Mostrar mensaje de error con botón "Reintentar"

### 🚀 Navegación
- **Desde**: HomeScreen, FavoritesScreen
- **Hacia**:
  - ProfileScreen (al tocar "Ver perfil" del profesional)
  - Atrás a pantalla anterior

### 📡 Integración API
- **Endpoint**: `GET /items/:id`
- **S3 Image URL**: Construir con `https://{bucket}.s3.{region}.amazonaws.com/{thumbnailKey}`
- **YouTube Video**: Usar `react-native-youtube-iframe` con `videoUrl`

### 📝 Notas
- Implementar zoom en imagen (opcional)
- Video debe poder reproducirse en fullscreen
- Botón favorito debe sincronizar con backend

---

## 4. CreateItemScreen (Crear Post)

### 🎯 Objetivo
Permitir a profesionales crear un nuevo post de trabajo de mantenimiento, subiendo imagen a S3 y URL de video YouTube.

### 🧩 Componentes Principales
- **Header**: Botón cancelar + título "Nuevo Post" + botón "Publicar"
- **ImagePicker**: Área para seleccionar/mostrar imagen
  - Placeholder con icono "+" si no hay imagen
  - Preview de imagen seleccionada
  - Botón "Cambiar imagen"
- **Form**: Formulario con inputs:
  - **TitleInput**: Input para título (min 3 caracteres)
  - **DescriptionInput**: TextArea para descripción
  - **CategoryPicker**: Selector de categoría
  - **PriceInput**: Input numérico para precio (min 0)
  - **VideoUrlInput**: Input para URL de YouTube
- **PublishButton**: Botón "Publicar" (Primary, disabled hasta validar)

### 🔄 Estados
- **Idle**: Formulario vacío, listo para llenar
- **Selecting Image**: Abriendo image picker
- **Image Selected**: Imagen seleccionada, mostrando preview
- **Uploading**: Subiendo imagen a S3 (mostrar progress)
- **Creating**: Creando post en backend
- **Success**: Post creado exitosamente
- **Error**: Error en algún paso (mostrar mensaje específico)

### 🚀 Navegación
- **Desde**: HomeScreen (FloatingActionButton)
- **Hacia**:
  - HomeScreen (al cancelar)
  - DetailScreen del post creado (al publicar exitosamente)
  - HomeScreen (alternativa tras publicar)

### 📡 Integración API

#### Flujo Completo:
1. Usuario selecciona imagen con `expo-image-picker`
2. App llama `POST /uploads/presign` con `{ fileName, contentType }`
3. Backend responde con `{ url, key }`
4. App hace `PUT` a la `url` con la imagen (fetch con blob)
5. Si PUT exitoso (200), guardar `key`
6. App llama `POST /items` con:
   ```json
   {
     "title": "...",
     "description": "...",
     "category": "...",
     "price": 100,
     "videoUrl": "https://youtube.com/watch?v=...",
     "thumbnailKey": "key-from-step-5"
   }
   ```
7. Si exitoso, navegar a Detail o Home

### 📝 Notas
- Validar URL de YouTube (regex o librería)
- Mostrar progress bar durante upload a S3
- Deshabilitar botón "Publicar" mientras sube
- Permitir cancelar durante upload
- Comprimir imagen antes de subir (opcional, usar `expo-image-manipulator`)

---

## 5. FavoritesScreen (Posts Guardados)

### 🎯 Objetivo
Mostrar lista de posts que el usuario ha marcado como favoritos, permitiendo acceder a detalles y quitar de favoritos.

### 🧩 Componentes Principales
- **Header**: Título "Favoritos"
- **ItemList (FlatList)**: Lista de ItemCards favoritos
- **ItemCard**: Igual que en HomeScreen, con botón favorito activo
- **TabBar**: Navegación inferior

### 🔄 Estados
- **Loading**: Mostrar skeleton mientras carga
- **Success**: Mostrar lista de favoritos
- **Error**: Mostrar mensaje de error con botón "Reintentar"
- **Empty**: Mostrar ilustración y mensaje "No tienes favoritos aún"

### 🚀 Navegación
- **Desde**: HomeScreen (tab), DetailScreen
- **Hacia**:
  - DetailScreen (al tocar un ItemCard)
  - HomeScreen (al tocar tab Home)
  - ProfileScreen (al tocar tab Perfil)

### 📡 Integración API
- **Endpoint**: `GET /users/:userId/favorites`
- **Usuario Demo**: Usar userId fijo (ej: "demo-user-123") o deviceId
- **Quitar favorito**: `DELETE /favorites/:itemId`

### 📝 Notas
- Actualizar lista al quitar favorito (optimistic update)
- Pull-to-refresh para recargar
- Sincronizar con HomeScreen y DetailScreen

---

## 6. ProfileScreen (Perfil de Usuario)

### 🎯 Objetivo
Mostrar perfil del usuario demo con información básica y métricas. En Sprint 1 es principalmente visual.

### 🧩 Componentes Principales
- **Header**: Título "Perfil" + botón configuración (opcional)
- **AvatarSection**: Avatar grande del usuario
- **UserInfo**:
  - Nombre del usuario demo
  - Especialidad (ej: "Electricista Profesional")
  - Bio breve
- **StatsSection**: Métricas en cards:
  - Número de posts creados
  - Número de favoritos
  - Miembro desde (fecha)
- **ActionButtons** (opcional para Sprint 1):
  - Editar perfil
  - Configuración
  - Cerrar sesión
- **TabBar**: Navegación inferior

### 🔄 Estados
- **Loading**: Mostrar skeleton mientras carga
- **Success**: Mostrar perfil
- **Error**: Mostrar mensaje de error

### 🚀 Navegación
- **Desde**: HomeScreen (tab), DetailScreen
- **Hacia**:
  - HomeScreen (al tocar tab Home)
  - FavoritesScreen (al tocar tab Favoritos)

### 📡 Integración API
- **Endpoint**: `GET /users/:userId` (opcional para Sprint 1)
- **Usuario Demo**: Datos hardcodeados o mínimos del backend

### 📝 Notas
- En Sprint 1, puede ser mayormente estático
- Aplicar guía de estilos consistentemente
- Preparar estructura para funcionalidad futura (edición, autenticación)

---

## 🎨 Consideraciones de Diseño

### Consistencia Visual
- Todos los componentes deben seguir la guía de estilos
- Usar componentes reutilizables (ItemCard, Buttons, etc.)
- Mantener espaciados consistentes

### Feedback al Usuario
- Mostrar loading states en todas las operaciones asíncronas
- Mostrar mensajes de error claros y accionables
- Confirmar acciones importantes (ej: "Post publicado")

### Accesibilidad
- Touch targets mínimo 44x44px
- Contraste adecuado en textos
- Labels descriptivos para screen readers

---

## ✅ Estado

- [ ] HomeScreen documentada
- [ ] FiltersScreen documentada
- [ ] DetailScreen documentada
- [ ] CreateItemScreen documentada
- [ ] FavoritesScreen documentada
- [ ] ProfileScreen documentada
- [ ] Estructura de navegación definida
- [ ] Prototipo Stitch generado
- [ ] Listo para FASE 4 (Desarrollo)

---

**Próximo Paso**: Generar prototipo con Google Stitch y validar con IA.
