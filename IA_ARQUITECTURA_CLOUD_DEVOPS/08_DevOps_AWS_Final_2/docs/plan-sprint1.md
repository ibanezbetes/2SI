# Plan Sprint 1 - Mantenigram

Red Social de Profesionales de Mantenimiento

---

## FASE 1 — DISEÑO DRIBBBLE (VALIDATORIA) ✅

**Objetivo**: Documentar el diseño de referencia de Dribbble que vamos a replicar.

### Tareas:
- [x] Obtener link del diseño de Dribbble seleccionado
- [x] Analizar y documentar estructura visual (layout, jerarquía, cards, botones)
- [x] Identificar colores, tipografías y espaciados del diseño
- [x] Crear lista de componentes UI reutilizables
- [x] Documentar todo en `docs/dribbble-reference.md`

**Entregable**: `docs/dribbble-reference.md` completo ✅

**Estado**: COMPLETADA - Análisis completo basado en diseño de referencia (app de café). Paleta naranja #FF8C42 + beige #F5F1E8, tipografía Poppins, botones pill 56-60px, border-radius 24-32px, 20+ componentes identificados.

---

## FASE 2 — GUÍA DE ESTILOS IA-ASISTIDA ✅

**Objetivo**: Definir la guía de estilos completa usando IA de diseño (Gemini, Figma AI, etc.)

### Tareas:
- [x] Generar paleta de colores con IA (HEX + roles: primary, secondary, etc.)
- [x] Definir tipografías y jerarquías (H1, H2, H3, Body, Caption, Button)
- [x] Establecer reglas de espaciado (grid 8px, muy generoso 24-32px márgenes)
- [x] Definir componentes base (botones pill, cards redondeados, inputs, iconografía)
- [x] Documentar guidelines adicionales (radios de borde 24-32px, sombras sutiles)
- [x] Crear `docs/style-guide.md` con toda la información
- [x] Relacionar guía con diseño Dribbble (qué se mantiene, qué se adapta)

**Entregable**: `docs/style-guide.md` completo ✅

**Estado**: COMPLETADA - Guía completa con paleta naranja #FF8C42 + beige #F5F1E8, tipografía Poppins, espaciado generoso, botones pill 56-60px, border-radius 24-32px, sombras sutiles (opacidad máx 0.12).

---

## FASE 3 — PROTOTIPO UX/UI CON GOOGLE STITCH ✅

**Objetivo**: Generar y documentar el prototipo de la app con IA.

### Tareas:
- [x] Generar prototipo con Figma Make AI
- [x] Documentar las 6 pantallas mínimas:
  - [x] HomeScreen (feed de posts de mantenimiento)
  - [x] FiltersScreen (filtrar por categoría, precio, ubicación)
  - [x] DetailScreen (detalle de post con imagen y video)
  - [x] CreateItemScreen (crear post con imagen y video YouTube)
  - [x] FavoritesScreen (posts guardados)
  - [x] ProfileScreen (perfil de profesional)
- [x] Crear `docs/screens.md` con especificación de cada pantalla
- [x] Validar originalidad con IA (Figma Make AI)
- [x] Documentar validación en `docs/validation-ux.md`
- [x] Definir estructura de navegación React Navigation
- [x] Actualizar este plan con ajustes necesarios

**Entregables**: 
- `docs/screens.md` completo ✅
- `docs/validation-ux.md` completo ✅
- Diseño cerrado y validado ✅

**Estado**: COMPLETADA - Prototipo generado con Figma Make AI, 6 pantallas diseñadas y validadas.

---

## FASE 4 — DESARROLLO TÉCNICO (BACKEND + FRONTEND)

### 4.1 BACKEND (NestJS + TypeORM + PostgreSQL + S3)

#### 4.1.1 Setup Inicial
- [ ] Crear proyecto NestJS en `backend/`
- [ ] Configurar estructura modular:
  - [ ] Módulo `items` (posts de trabajos de mantenimiento)
  - [ ] Módulo `users` (profesionales)
  - [ ] Módulo `favorites` (posts guardados)
  - [ ] Módulo `uploads` (presigned URLs S3)
  - [ ] Módulo `config` (env vars, TypeORM, AWS)
- [ ] Crear `backend/.env.example` con todas las variables
- [ ] Crear `backend/README.md` con instrucciones de setup

#### 4.1.2 Base de Datos
- [ ] Configurar TypeORM con DataSource
- [ ] Crear entidad `User`:
  - id, name, email, specialty, bio, avatarKey, createdAt, updatedAt
- [ ] Crear entidad `Item` (post de mantenimiento):
  - id, title, description, category, price, videoUrl, thumbnailKey, userId, createdAt, updatedAt
- [ ] Crear entidad `Favorite`:
  - id, userId, itemId, createdAt (relación ManyToOne)
- [ ] Configurar migraciones
- [ ] Documentar comandos de migración

#### 4.1.3 DTOs y Validación
- [ ] Configurar ValidationPipe global en `main.ts`
- [ ] Crear DTOs para GET /items (QueryItemsDto):
  - page, limit, q, category, minPrice, maxPrice, sort, order
- [ ] Crear DTOs para POST /items (CreateItemDto):
  - title (≥3 chars), description, category, price (≥0), videoUrl (YouTube), thumbnailKey
- [ ] Crear DTOs para favoritos
- [ ] Crear DTOs para presigned URLs

#### 4.1.4 Endpoints REST
- [ ] `GET /items` - Listar posts con filtros y paginación
- [ ] `GET /items/:id` - Detalle de post
- [ ] `POST /items` - Crear post (con thumbnailKey y videoUrl)
- [ ] `POST /uploads/presign` - Generar presigned URL para S3
- [ ] `GET /users/:id/favorites` - Listar favoritos de usuario
- [ ] `POST /favorites/:itemId` - Añadir a favoritos
- [ ] `DELETE /favorites/:itemId` - Quitar de favoritos
- [ ] Documentar todos con Swagger
- [ ] Añadir tests unitarios para servicios
- [ ] Añadir tests E2E para endpoints críticos

#### 4.1.5 Integración AWS S3
- [ ] Instalar `@aws-sdk/client-s3` y `@aws-sdk/s3-request-presigner`
- [ ] Configurar cliente S3 con credenciales
- [ ] Implementar generación de presigned URLs (PUT, 5-10 min expiración)
- [ ] Devolver `url` y `key` en respuesta
- [ ] Documentar flujo completo en `docs/s3-flow.md`
- [ ] Añadir tests para servicio de uploads

#### 4.1.6 Seeds
- [ ] Crear script de seeds con mínimo 30 posts de mantenimiento:
  - Categorías: Electricidad, Fontanería, HVAC, Carpintería, Pintura, etc.
  - Datos realistas: títulos, descripciones, precios, videos YouTube
- [ ] Crear usuario demo
- [ ] Documentar comando para ejecutar seeds
- [ ] Verificar que seeds funcionan correctamente

#### 4.1.7 Configuración AWS
- [ ] Crear instancia RDS PostgreSQL en us-east-1
- [ ] Configurar security groups y acceso
- [ ] Crear bucket S3 en us-east-1
- [ ] Configurar políticas de bucket (CORS, acceso público a objetos)
- [ ] Crear usuario IAM con permisos S3
- [ ] Documentar credenciales en .env.example

### 4.2 FRONTEND (React Native + Expo)

#### 4.2.1 Setup Inicial
- [ ] Crear proyecto Expo en `frontend/`
- [ ] Instalar dependencias:
  - @react-navigation/native
  - @react-navigation/native-stack
  - expo-image-picker
  - react-native-youtube-iframe
  - axios
- [ ] Configurar sistema de config (API_BASE_URL)
- [ ] Crear estructura de carpetas (screens/, components/, services/, utils/)
- [ ] Crear `frontend/README.md`

#### 4.2.2 Navegación
- [ ] Configurar React Navigation
- [ ] Crear NavigationContainer
- [ ] Definir Stack Navigator con pantallas:
  - Home, Filters, Detail, CreateItem, Favorites, Profile
- [ ] Implementar navegación entre pantallas

#### 4.2.3 HomeScreen
- [ ] Crear componente HomeScreen
- [ ] Implementar listado de posts (FlatList)
- [ ] Integrar con GET /items
- [ ] Implementar estados: loading, error, empty
- [ ] Añadir botón para abrir filtros
- [ ] Añadir pull-to-refresh
- [ ] Crear componente ItemCard reutilizable
- [ ] Implementar navegación a Detail

#### 4.2.4 FiltersScreen
- [ ] Crear componente FiltersScreen (modal o pantalla)
- [ ] Implementar inputs para filtros:
  - Búsqueda por texto (q)
  - Categoría (picker)
  - Rango de precio (minPrice, maxPrice)
  - Ordenamiento (sort, order)
- [ ] Implementar botón "Aplicar filtros"
- [ ] Actualizar HomeScreen con filtros aplicados
- [ ] Gestionar estado de filtros (Context o state lifting)

#### 4.2.5 DetailScreen
- [ ] Crear componente DetailScreen
- [ ] Mostrar imagen desde S3 (construir URL con bucket + thumbnailKey)
- [ ] Integrar video YouTube (react-native-youtube-iframe)
- [ ] Mostrar datos del post: título, descripción, categoría, precio
- [ ] Implementar estados: loading, error
- [ ] Añadir botón de favorito
- [ ] Implementar navegación de vuelta

#### 4.2.6 CreateItemScreen
- [ ] Crear componente CreateItemScreen
- [ ] Implementar formulario:
  - Input título (validación ≥3 chars)
  - Input descripción
  - Picker categoría
  - Input precio (validación ≥0)
  - Input URL video YouTube
  - Botón seleccionar imagen (expo-image-picker)
- [ ] Implementar flujo completo S3:
  1. Seleccionar imagen
  2. POST /uploads/presign
  3. PUT a S3 con imagen
  4. POST /items con thumbnailKey + datos
- [ ] Mostrar preview de imagen seleccionada
- [ ] Implementar estados: loading, error, success
- [ ] Navegar a Home o Detail tras éxito
- [ ] Documentar flujo en código y en docs/s3-flow.md

#### 4.2.7 FavoritesScreen
- [ ] Crear componente FavoritesScreen
- [ ] Implementar usuario demo (userId fijo o deviceId)
- [ ] Integrar con GET /users/:id/favorites
- [ ] Mostrar listado de favoritos
- [ ] Implementar estados: loading, error, empty
- [ ] Permitir quitar de favoritos (DELETE)
- [ ] Navegar a Detail al tocar item

#### 4.2.8 ProfileScreen
- [ ] Crear componente ProfileScreen (borrador visual)
- [ ] Mostrar avatar de usuario demo
- [ ] Mostrar datos básicos (nombre, especialidad)
- [ ] Mostrar métricas: nº favoritos, posts creados
- [ ] Aplicar guía de estilos
- [ ] (Lógica compleja pendiente para futuros sprints)

#### 4.2.9 Integración de Favoritos
- [ ] Añadir botón favorito en ItemCard (HomeScreen)
- [ ] Añadir botón favorito en DetailScreen
- [ ] Implementar POST /favorites/:itemId
- [ ] Implementar DELETE /favorites/:itemId
- [ ] Cambiar icono según estado (favorito o no)
- [ ] Gestionar estados loading/error
- [ ] Actualizar UI tras añadir/quitar favorito

#### 4.2.10 Estilos y Diseño
- [ ] Aplicar guía de estilos a todos los componentes
- [ ] Crear componentes reutilizables según Dribbble:
  - PrimaryButton, SecondaryButton
  - ItemCard, FilterChip
  - LoadingSpinner, ErrorMessage, EmptyState
- [ ] Verificar consistencia visual con prototipo Stitch
- [ ] Ajustar espaciados, colores y tipografías

### 4.3 TESTING

#### Backend
- [ ] Tests unitarios para servicios (items, favorites, uploads)
- [ ] Tests E2E para endpoints críticos
- [ ] Documentar comando: `npm run test` y `npm run test:e2e`

#### Frontend
- [ ] Tests básicos para componentes principales
- [ ] Tests de navegación
- [ ] Documentar comando: `npm test`

### 4.4 DOCUMENTACIÓN FINAL

- [ ] Actualizar README raíz con:
  - Instrucciones completas de setup
  - Variables de entorno necesarias
  - Comandos para levantar backend y frontend
  - Flujo de demo para entrevista
- [ ] Completar docs/s3-flow.md con ejemplos frontend
- [ ] Verificar que todos los docs están actualizados
- [ ] Crear guía de demo (Create → Home → Detail → Favorites)

---

## 📊 Estado del Sprint

**Fase Actual**: FASE 3 - Prototipo UX/UI ✅

**Próximo Paso**: FASE 4 - Desarrollo Técnico (Backend + Frontend)

---

## 🔄 Notas de Iteración

- Proyecto: Red Social de Profesionales de Mantenimiento
- Nombre: Mantenigram
- Región AWS: us-east-1
- Estructura: Monorepo (backend + frontend)
- RDS: Pendiente de crear
- S3: Pendiente de crear
