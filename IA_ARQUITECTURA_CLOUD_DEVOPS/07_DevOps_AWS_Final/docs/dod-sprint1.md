# Definition of Done - Sprint 1
## Mantenigram - Red Social de Profesionales de Mantenimiento

---

## 🎨 DISEÑO

- [x] Diseño Dribbble reproducido (referencia documentada en `docs/dribbble-reference.md`)
- [x] Guía de estilos IA documentada en `docs/style-guide.md`
  - [ ] Paleta de colores definida (HEX + roles)
  - [ ] Tipografías y jerarquías establecidas
  - [ ] Reglas de espaciado documentadas
  - [ ] Componentes base identificados
- [ ] Prototipo Stitch documentado en `docs/screens.md`
- [ ] Validación de originalidad IA anotada en `docs/validation-ux.md`
- [ ] Estructura de navegación definida

---

## 🔧 BACKEND (NestJS)

### Configuración Base
- [ ] Proyecto NestJS creado en `backend/`
- [ ] Estructura modular implementada (items, users, favorites, uploads, config)
- [ ] `backend/.env.example` creado con todas las variables
- [ ] `backend/README.md` con instrucciones de setup

### Base de Datos
- [ ] TypeORM configurado con DataSource
- [ ] Entidad `User` creada y migrada
- [ ] Entidad `Item` creada y migrada
- [ ] Entidad `Favorite` creada y migrada
- [ ] Migraciones funcionando correctamente
- [ ] Conexión real a AWS RDS PostgreSQL funcionando

### DTOs y Validación
- [ ] ValidationPipe configurado globalmente
- [ ] DTOs para GET /items (QueryItemsDto) con validaciones
- [ ] DTOs para POST /items (CreateItemDto) con validaciones
- [ ] DTOs para favoritos
- [ ] DTOs para presigned URLs

### Endpoints REST
- [ ] `GET /items?page&limit&q&category&minPrice&maxPrice&sort&order` implementado
- [ ] `GET /items/:id` implementado
- [ ] `POST /items` implementado (con thumbnailKey y videoUrl)
- [ ] `POST /uploads/presign` implementado
- [ ] `GET /users/:id/favorites` implementado
- [ ] `POST /favorites/:itemId` implementado
- [ ] `DELETE /favorites/:itemId` implementado
- [ ] Swagger /docs funcionando con documentación completa

### AWS S3
- [ ] Bucket S3 creado en us-east-1
- [ ] Políticas de bucket configuradas (CORS, acceso)
- [ ] Usuario IAM con permisos S3 creado
- [ ] Flujo S3 implementado (presign → PUT → key)
- [ ] Flujo documentado en `docs/s3-flow.md`

### Seeds y Datos
- [ ] Script de seeds creado
- [ ] Mínimo 30 posts de mantenimiento con datos realistas
- [ ] Usuario demo creado
- [ ] Comando de seeds documentado y funcionando

### Testing Backend
- [ ] Tests unitarios para servicios principales
- [ ] Tests E2E para endpoints críticos
- [ ] Comando `npm run test` funcionando
- [ ] Comando `npm run test:e2e` funcionando

---

## 📱 FRONTEND (React Native + Expo)

### Configuración Base
- [ ] Proyecto Expo creado en `frontend/`
- [ ] Dependencias instaladas (navigation, image-picker, youtube-iframe, axios)
- [ ] Sistema de configuración implementado (API_BASE_URL)
- [ ] Estructura de carpetas creada
- [ ] `frontend/README.md` con instrucciones

### Navegación
- [ ] React Navigation configurado
- [ ] Stack Navigator con 6 pantallas implementado
- [ ] Navegación entre pantallas funcionando

### Pantallas Implementadas

#### HomeScreen
- [ ] Listado de posts implementado (FlatList)
- [ ] Integración con GET /items funcionando
- [ ] Filtros reales aplicados
- [ ] Estados: loading, error, empty implementados
- [ ] Pull-to-refresh funcionando
- [ ] Navegación a Detail funcionando
- [ ] Botón de favorito en cada card

#### FiltersScreen
- [ ] Modal/pantalla de filtros implementada
- [ ] Inputs para: búsqueda, categoría, precio, ordenamiento
- [ ] Botón "Aplicar filtros" funcionando
- [ ] HomeScreen se actualiza con filtros aplicados
- [ ] Estado de filtros gestionado correctamente

#### DetailScreen
- [ ] Imagen de S3 mostrándose correctamente
- [ ] Video YouTube integrado y funcionando
- [ ] Datos del post mostrados (título, descripción, categoría, precio)
- [ ] Estados: loading, error implementados
- [ ] Botón de favorito funcionando

#### CreateItemScreen
- [ ] Formulario completo implementado
- [ ] Validaciones de campos funcionando
- [ ] Selector de imagen (expo-image-picker) funcionando
- [ ] Flujo completo S3 implementado:
  - [ ] POST /uploads/presign
  - [ ] PUT a S3 con imagen
  - [ ] POST /items con thumbnailKey + datos
- [ ] Preview de imagen seleccionada
- [ ] Estados: loading, error, success implementados
- [ ] Navegación tras éxito funcionando
- [ ] Flujo documentado en código y docs

#### FavoritesScreen
- [ ] Usuario demo implementado (userId fijo o deviceId)
- [ ] Listado de favoritos funcionando (GET /users/:id/favorites)
- [ ] Estados: loading, error, empty implementados
- [ ] Quitar de favoritos funcionando (DELETE)
- [ ] Navegación a Detail funcionando

#### ProfileScreen
- [ ] Estructura visual implementada
- [ ] Avatar de usuario demo
- [ ] Datos básicos mostrados
- [ ] Métricas mostradas (nº favoritos, posts creados)
- [ ] Guía de estilos aplicada

### Integración de Favoritos
- [ ] Botón favorito en HomeScreen (ItemCard)
- [ ] Botón favorito en DetailScreen
- [ ] POST /favorites/:itemId funcionando
- [ ] DELETE /favorites/:itemId funcionando
- [ ] Icono cambia según estado
- [ ] Estados loading/error gestionados
- [ ] UI se actualiza correctamente

### Estilos y Diseño
- [ ] Guía de estilos aplicada a todos los componentes
- [ ] Componentes reutilizables creados:
  - [ ] PrimaryButton, SecondaryButton
  - [ ] ItemCard, FilterChip
  - [ ] LoadingSpinner, ErrorMessage, EmptyState
- [ ] Consistencia visual con prototipo Stitch verificada
- [ ] Espaciados, colores y tipografías correctos

### Testing Frontend
- [ ] Tests básicos para componentes principales
- [ ] Tests de navegación
- [ ] Comando `npm test` funcionando

---

## 📚 DOCUMENTACIÓN

- [ ] README raíz actualizado con:
  - [ ] Instrucciones completas de setup backend
  - [ ] Instrucciones completas de setup frontend
  - [ ] Variables de entorno necesarias
  - [ ] Comandos para levantar backend y frontend
  - [ ] Flujo de demo para entrevista (Create → Home → Detail → Favorites)
- [ ] `docs/dribbble-reference.md` completo
- [ ] `docs/style-guide.md` completo
- [ ] `docs/screens.md` completo
- [ ] `docs/validation-ux.md` completo
- [ ] `docs/s3-flow.md` completo con ejemplos backend y frontend
- [ ] `docs/plan-sprint1.md` actualizado

---

## ✅ CRITERIOS DE ACEPTACIÓN FINAL

- [ ] Backend levanta sin errores con `npm run start:dev`
- [ ] Frontend levanta sin errores con `npm start`
- [ ] Swagger accesible en http://localhost:3000/docs
- [ ] Todos los endpoints responden correctamente
- [ ] Seeds cargan 30+ posts correctamente
- [ ] App móvil navega entre todas las pantallas
- [ ] Flujo completo funciona: Create → Upload S3 → Home → Detail → Favorites
- [ ] Filtros funcionan correctamente
- [ ] Videos YouTube se reproducen
- [ ] Imágenes S3 se muestran
- [ ] Favoritos se añaden/quitan correctamente
- [ ] Estados loading/error/empty se muestran apropiadamente
- [ ] Tests backend pasan (unitarios y E2E)
- [ ] Tests frontend pasan
- [ ] Proyecto listo para demo/entrevista

---

## 📊 Progreso Actual

**Completado**: 2/100+
**En Progreso**: FASE 2 - Guía de Estilos ✅
**Pendiente**: FASE 3 y 4

**Última Actualización**: FASE 1 y 2 completadas - Diseño y guía de estilos documentados basados en referencia real
