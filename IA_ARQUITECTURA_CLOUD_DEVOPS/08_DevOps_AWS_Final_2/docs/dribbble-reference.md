# Referencia de Diseño Dribbble
## Mantenigram - Red Social de Profesionales de Mantenimiento

---

## 📌 Información del Diseño

**URL del Diseño**: https://dribbble.com/services/57652-Mobile-App-UI-Design-From-5-Screens

**Fecha de Análisis**: 20 de Noviembre, 2025

**Tipo de Diseño**: Mobile App UI - Red Social Profesional

---

## 🎨 Análisis Visual

### Layout General

El diseño muestra una app de productos/servicios con un estilo **minimalista y moderno**, con énfasis en fotografía de producto de alta calidad y formas orgánicas.

**Características principales del diseño original:**
- **Fondo beige/crema claro** (#F5F1E8 aprox) que da calidez
- **Formas circulares/orgánicas grandes** como elemento visual principal (círculo verde)
- **Fotografía de producto realista** centrada y destacada
- **Tipografía bold y grande** para títulos
- **Espaciado muy generoso** (mucho breathing room)
- **Iconos circulares** para categorías/opciones
- **Botones redondeados** (pill shape)

**Adaptación para Mantenigram:**
- Mantendremos el estilo minimalista y limpio
- Usaremos formas orgánicas para destacar imágenes de trabajos
- Fotografías reales de trabajos de mantenimiento como protagonistas
- Espaciado generoso para facilitar lectura y navegación
- Paleta de colores adaptada al sector de mantenimiento

### Jerarquía Visual

**Nivel 1 - Contenido Principal:**
- Imágenes de trabajos de mantenimiento (elemento más prominente)
- Títulos de posts en tipografía bold y tamaño grande

**Nivel 2 - Información Secundaria:**
- Nombre del profesional y avatar
- Categoría del trabajo (badge con color)
- Precio del servicio

**Nivel 3 - Acciones y Metadatos:**
- Botones de interacción (favorito, compartir, comentar)
- Fecha de publicación
- Ubicación (si aplica)

### Tipos de Tarjetas (Cards)

#### 1. **Hero Card (Pantalla Principal - estilo del diseño)**
- **Forma orgánica grande** (círculo o forma redondeada) como fondo
- **Color de fondo**: Verde/Naranja según categoría
- **Imagen del producto/trabajo**: Centrada, con sombra realista
- **Título del trabajo**: Texto blanco sobre el fondo de color, centrado abajo
- **Precio**: Debajo del título, también en blanco
- **Indicadores de navegación**: Dots en la parte inferior
- **Border radius**: 24-32px (muy redondeado)
- **Sombra**: Sutil pero presente para dar profundidad

**Adaptación para Mantenigram:**
- Foto del trabajo de mantenimiento en lugar de producto
- Forma circular de fondo con color de categoría
- Nombre del profesional pequeño arriba
- Título del trabajo y precio centrados abajo

#### 2. **Detail Card (Pantalla de Detalle)**
- **Fondo blanco** con border-radius 24px
- **Imagen grande**: Centrada con forma circular de fondo
- **Título**: Bold, negro, tamaño grande (24-28px)
- **Precio**: Verde/Naranja, bold, tamaño grande (28-32px)
- **Opciones en fila**: Iconos circulares con labels debajo
  - Iconos: 48x48px en círculos
  - Activo: Fondo verde/naranja
  - Inactivo: Fondo gris claro
- **Botón principal**: Pill shape, verde/naranja, texto blanco, altura 56px
- **Controles de cantidad**: Botones circulares - y + con número en medio

#### 3. **Category Icon Card**
- **Círculo blanco**: 64-72px de diámetro
- **Icono**: 32px, color naranja/verde
- **Label**: Debajo del círculo, texto pequeño
- **Disposición**: En fila horizontal scrolleable

### Botones y Controles (del diseño original)

#### Botón Principal (Primary Button)
- **Forma**: Pill shape (completamente redondeado)
- **Altura**: 56-60px (muy táctil)
- **Ancho**: Casi full-width con márgenes laterales 24px
- **Color**: Verde #4A9B7F (o naranja #FF8C42 para Mantenigram)
- **Texto**: Blanco, bold, 16-18px, centrado
- **Sombra**: Sutil, elevación 2
- **Ejemplo**: "Add to Order", "Publicar Trabajo"

#### Botones de Cantidad
- **Forma**: Circular, 44x44px
- **Color**: Verde/Naranja con fondo sólido
- **Iconos**: - y + en blanco, 24px
- **Número central**: Entre botones, 20px, bold
- **Uso**: Incrementar/decrementar cantidad

#### Option Buttons (Selección de Opciones)
- **Forma**: Circular, 64-72px de diámetro
- **Estado inactivo**: Fondo gris muy claro (#E8F5F1), icono gris
- **Estado activo**: Fondo verde/naranja, icono blanco
- **Icono**: 32px centrado
- **Label**: Debajo, 12px, gris o verde según estado
- **Sublabel**: Tamaño más pequeño, gris claro
- **Uso**: Seleccionar tamaño, categoría, opciones

#### Icon Buttons (Header)
- **Forma**: Circular o cuadrado muy redondeado, 40x40px
- **Fondo**: Blanco o transparente
- **Icono**: 24px, gris oscuro o verde
- **Posición**: Esquinas del header
- **Uso**: Atrás, perfil, notificaciones, favorito

### Navegación (del diseño original)

#### Top Header (Minimalista)
- **Altura**: 60-70px
- **Fondo**: Transparente o mismo color que background
- **Elementos izquierda**: Logo/nombre de app pequeño con icono
- **Elementos derecha**: Icono de perfil/notificaciones circular
- **Sin borde inferior**: Integrado con el contenido
- **Ejemplo**: "Qahwa Space" con icono de café

#### Header de Detalle
- **Altura**: 56-60px
- **Fondo**: Blanco (cuando está sobre card blanco)
- **Botón atrás**: Izquierda, icono flecha, circular 40x40px
- **Título**: Centro, bold, 18-20px, "Details"
- **Acción**: Derecha, icono (favorito, compartir), circular 40x40px
- **Sin sombra**: Limpio y minimalista

#### Indicadores de Navegación (Carousel)
- **Dots**: Pequeños círculos 8-10px
- **Posición**: Centro inferior del carousel
- **Activo**: Verde/Naranja sólido
- **Inactivo**: Gris claro o outline
- **Espaciado**: 8-12px entre dots

#### Bottom Navigation (Adaptación para Mantenigram)
- **Estilo**: Minimalista, sin fondo sólido o con fondo blanco sutil
- **Iconos**: 28px, outline style
- **Labels**: Opcionales, 11px
- **Activo**: Verde/Naranja
- **Inactivo**: Gris claro
- **Altura**: 64-70px con padding generoso

---

## 🎨 Colores Detectados (del diseño original)

### Colores del Diseño de Referencia

**De la captura proporcionada:**
- **Verde Principal**: #4A9B7F / #52A383 (verde Starbucks-like, cálido y natural)
- **Verde Oscuro**: #2D6B54 (para textos sobre verde)
- **Beige/Crema Background**: #F5F1E8 (fondo cálido y acogedor)
- **Blanco**: #FFFFFF (cards, superficie)
- **Negro/Gris Oscuro**: #2C2C2C (títulos principales)
- **Gris Medio**: #8B8B8B (textos secundarios, labels)
- **Verde Claro**: #E8F5F1 (iconos inactivos, fondos sutiles)

### Paleta Adaptada para Mantenigram

**Colores Principales:**
- **Primary (Verde Profesional)**: #FF8C42 (Naranja cálido - herramientas, energía, trabajo)
- **Primary Dark**: #E67A2E (variante oscura para pressed states)
- **Secondary (Azul Confianza)**: #2C5F7C (Azul grisáceo - profesionalismo, confianza)
- **Background**: #F5F1E8 (Beige/crema - mantiene la calidez del diseño original)
- **Surface**: #FFFFFF (Blanco puro - cards)
- **Text Primary**: #2C2C2C (Gris muy oscuro - títulos)
- **Text Secondary**: #8B8B8B (Gris medio - descripciones)
- **Accent Green**: #4A9B7F (Verde del diseño original - para éxitos, confirmaciones)
- **Error**: #D64545 (Rojo cálido)
- **Warning**: #F4A261 (Naranja suave)

### Colores de Categorías (Mantenimiento)

- **Electricidad**: #F4A261 (Naranja/ámbar - cables, energía)
- **Fontanería**: #4A9B7F (Verde agua - tuberías, agua)
- **HVAC**: #6B9AC4 (Azul cielo - aire, clima)
- **Carpintería**: #8B6F47 (Marrón madera)
- **Pintura**: #E76F51 (Terracota - pintura, color)
- **Mecánica**: #5A6C7D (Gris azulado - metal, herramientas)

**Justificación**: 
- Mantenemos el **fondo beige/crema** del diseño original para calidez
- Usamos **naranja** como primary (más energético que verde para sector mantenimiento)
- El **verde** se mantiene como accent para confirmaciones (herencia del diseño original)
- Paleta cálida y terrosa que evoca trabajo manual, herramientas y profesionalismo

---

## 📝 Tipografía Detectada (del diseño original)

### Familia de Fuentes

**Del diseño original:**
- **Títulos principales**: Sans-serif bold, estilo geométrico/moderno
- **Posible fuente**: Poppins, Montserrat, o similar (redondeada y amigable)
- **Características**: Letras con buen peso, espaciado generoso, muy legible

**Para Mantenigram:**
- **Principal**: **Poppins** (moderna, amigable, profesional)
- **Alternativa**: **Montserrat** o **Inter**
- **Justificación**: Poppins tiene un estilo geométrico similar al diseño original, es muy legible y transmite modernidad y profesionalismo

### Jerarquía Tipográfica (basada en el diseño)

| Elemento | Fuente | Peso | Tamaño | Uso en el diseño |
|----------|--------|------|--------|------------------|
| **Hero Title** | Poppins | Bold (700) | 32-36px | "Smooth Out Your Everyday" |
| **Product Name** | Poppins | Bold (700) | 24-28px | "Caramel Frappuccino" (en card) |
| **Detail Title** | Poppins | Bold (700) | 28-32px | Título en pantalla de detalle |
| **Price Large** | Poppins | Bold (700) | 28-32px | "$30.00" en detalle |
| **Price Medium** | Poppins | SemiBold (600) | 20-24px | Precio en card principal |
| **Section Labels** | Poppins | SemiBold (600) | 14-16px | "Size Options", "Best Sales" |
| **Button Text** | Poppins | SemiBold (600) | 16-18px | "Add to Order" |
| **Option Labels** | Poppins | Medium (500) | 14-16px | "Venti", "Grande", "Tall" |
| **Body Text** | Poppins | Regular (400) | 14-15px | Descripciones |
| **Small Labels** | Poppins | Regular (400) | 12-13px | "24 Fl Oz", metadatos |
| **Category Labels** | Poppins | Medium (500) | 11-12px | Labels de categorías |

### Características Tipográficas Clave

- **Line height**: Generoso (1.4-1.6) para mejor legibilidad
- **Letter spacing**: Normal a ligeramente amplio en títulos
- **Alineación**: Centrado para títulos principales, izquierda para detalles
- **Contraste**: Alto contraste entre títulos bold y texto regular
- **Jerarquía clara**: Diferencia notable entre niveles (32px → 24px → 16px)

---

## 📏 Espaciados y Márgenes (del diseño original)

### Sistema de Espaciado Observado

**El diseño original usa espaciado MUY generoso:**

- **Grid base**: 8px
- **Márgenes laterales**: 24-32px (muy amplios para breathing room)
- **Padding de cards**: 24-32px (generoso)
- **Espaciado entre elementos**: 16-24px (amplio)
- **Espaciado entre secciones**: 32-48px (muy amplio)

### Espaciados Específicos

| Elemento | Espaciado | Observación |
|----------|-----------|-------------|
| Márgenes laterales pantalla | 24-32px | Más amplio que estándar (16px) |
| Padding interno card blanco | 24-32px | Muy generoso |
| Entre título y precio | 8-12px | Compacto |
| Entre precio y opciones | 24px | Amplio |
| Entre filas de opciones | 16-20px | Medio-amplio |
| Entre opciones y botón | 32-40px | Muy amplio |
| Altura de header | 60-70px | Generoso |
| Padding bottom de pantalla | 32-40px | Amplio |

### Border Radius (Muy Redondeado)

- **Cards principales**: 24-32px (muy redondeado)
- **Botones principales**: 28-32px (pill shape completo)
- **Botones circulares**: 50% (círculo perfecto)
- **Option buttons**: 50% (círculos)
- **Badges pequeños**: 12-16px

### Touch Targets (Generosos)

- **Botón principal**: 56-60px altura (muy táctil)
- **Option buttons**: 64-72px (círculos grandes)
- **Icon buttons**: 44-48px (estándar+)
- **Botones de cantidad**: 44x44px

### Sombras (Sutiles pero Presentes)

- **Cards**: 0px 4px 12px rgba(0,0,0,0.08) - muy sutil
- **Botón principal**: 0px 6px 16px rgba(74,155,127,0.25) - sombra de color
- **Imagen de producto**: 0px 8px 24px rgba(0,0,0,0.12) - sombra realista
- **Elementos flotantes**: Sombras suaves, nunca duras

**Justificación del espaciado generoso**: 
- Crea sensación de lujo y calidad
- Facilita la lectura y navegación
- Reduce sensación de saturación
- Perfecto para apps de servicios premium

---

## 🧩 Componentes UI Identificados

### Componentes Reutilizables

#### Botones
- [x] **PrimaryButton**: Pill shape completo (border-radius 28-32px), altura 56-60px, fondo naranja/verde, texto blanco bold 16-18px, sombra sutil con color, casi full-width
- [x] **QuantityButton**: Circular 44x44px, fondo naranja/verde sólido, icono - o + blanco 24px, usado para incrementar/decrementar
- [x] **OptionButton**: Circular 64-72px, estado inactivo (fondo gris claro, icono gris), estado activo (fondo naranja/verde, icono blanco), label debajo
- [x] **IconButton**: Circular 40-44px, fondo blanco o transparente, icono 24px gris/verde, usado en headers
- [x] **FloatingActionButton**: Circular 56-60px, naranja con sombra de color pronunciada, icono "+" blanco, posición fija inferior derecha (adaptación para Mantenigram)

#### Cards
- [x] **HeroCard**: Card con forma orgánica grande (círculo de fondo de color), imagen centrada con sombra realista, título y precio centrados abajo en blanco, border-radius 24-32px, fondo beige/crema
- [x] **DetailCard**: Card blanco con border-radius 24-32px, padding generoso 24-32px, imagen grande arriba con círculo de fondo, título bold grande, precio destacado, opciones en fila, botón principal abajo
- [x] **CategoryCard**: Círculo blanco 64-72px con icono 32px centrado, label debajo, usado en scroll horizontal de categorías
- [x] **CompactCard**: Card horizontal minimalista, thumbnail circular o cuadrado redondeado izquierda, info compacta derecha, usado en listas (adaptación para Mantenigram)
- [x] **StatCard**: Card pequeño con número grande bold arriba, label pequeño abajo, fondo sutil o blanco, border-radius 16px

#### Inputs y Filtros
- [x] **SearchBar**: Altura 44px, forma pill (border-radius 22px), fondo surface, icono lupa izquierda, placeholder gris
- [x] **TextInput**: Altura 48px, border 1px gris, border-radius 8px, padding 12-16px, focus con borde naranja
- [x] **FilterChip**: Pequeño badge clickeable, border-radius 16px, padding 8-12px, activo con fondo naranja
- [x] **PriceRangeSlider**: Slider doble con thumbs naranjas, track gris, labels de min/max
- [x] **CategoryPicker**: Dropdown o modal con lista de categorías, cada una con su color distintivo

#### Navegación
- [x] **BottomTabBar**: Altura 60px, 3 tabs (Home, Favoritos, Perfil), iconos 24px, activo en naranja con indicador
- [x] **TopHeader**: Altura 56px, botón atrás izquierda, título centro, acciones derecha, fondo blanco con sombra
- [x] **BackButton**: Icon button con flecha izquierda, 40x40px

#### Estados
- [x] **LoadingSpinner**: Spinner circular naranja, tamaño 40px, centrado en pantalla o componente
- [x] **SkeletonCard**: Versión gris animada del PostCard para loading states
- [x] **ErrorMessage**: Card con icono de error, mensaje descriptivo, botón "Reintentar"
- [x] **EmptyState**: Ilustración simple, título, descripción, opcional botón de acción

#### Media
- [x] **ImageViewer**: Imagen con aspect ratio 16:9, border-radius superior 12px, loading placeholder gris
- [x] **VideoPlayer**: Reproductor YouTube embebido, controles nativos, fullscreen disponible
- [x] **ThumbnailImage**: Miniatura cuadrada o 16:9, border-radius 8px, loading placeholder

#### Otros
- [x] **FavoriteButton**: Icon button con corazón, outline cuando inactivo, filled naranja cuando activo, animación al tocar
- [x] **ShareButton**: Icon button con icono compartir, abre sheet nativo de compartir
- [x] **CategoryBadge**: Pequeño badge con texto de categoría, fondo con color de categoría, texto blanco, border-radius 4px
- [x] **PriceBadge**: Badge más grande para precio, texto bold, símbolo de moneda
- [x] **Avatar**: Circular, tamaños: 32px (pequeño), 40px (medio), 80px (grande), borde opcional
- [x] **Divider**: Línea horizontal 1px, color gris claro, usado para separar secciones

---

## 📱 Pantallas Identificadas

### 1. **HomeScreen (Feed Principal - estilo Hero)**
- **Header minimalista**: Logo "Mantenigram" izquierda, icono perfil derecha, fondo beige/crema
- **Título grande y bold**: "Encuentra Tu Profesional" o similar (32-36px)
- **Categorías horizontales**: Scroll horizontal de CategoryCards (círculos con iconos)
- **Carousel de trabajos destacados**: HeroCards con swipe horizontal, dots indicadores
  - Forma circular de fondo con color de categoría
  - Imagen del trabajo centrada con sombra
  - Título y precio centrados abajo en blanco
- **Sección "Recientes" o "Populares"**: Lista vertical de trabajos
- **FloatingActionButton**: Crear nuevo post (esquina inferior derecha)
- **BottomTabBar**: Minimalista con Home activo

### 2. **FiltersScreen (Modal de Filtros)**
- Modal desde bottom o pantalla completa
- SearchInput para búsqueda por texto
- CategoryPicker con chips de categorías
- PriceRangeSlider para rango de precio
- SortPicker (dropdown o radio buttons)
- Botones "Aplicar" y "Limpiar" en bottom
- Contador de filtros activos

### 3. **DetailScreen (Detalle de Post - estilo del diseño)**
- **Header**: Botón atrás izquierda, "Details" centro, icono favorito derecha, fondo blanco
- **Card blanco grande**: Border-radius 24-32px, padding generoso
  - **Imagen destacada**: Con círculo de fondo de color de categoría, sombra realista
  - **Título del trabajo**: Bold, 28-32px, negro
  - **Precio**: Verde/Naranja, bold, 28-32px, alineado derecha con "Best Sales" o similar
  - **Sección "Opciones"**: Label "Size Options" o "Detalles del Servicio"
    - Fila de OptionButtons circulares (ej: Urgente, Normal, Programado)
    - Activo con fondo naranja, inactivo gris claro
  - **Descripción**: Texto regular, 14-15px, gris oscuro
  - **Info del profesional**: Avatar, nombre, especialidad, rating
  - **Controles de cantidad**: Botones - y + con número en medio (si aplica)
  - **Botón principal**: "Contactar Profesional" o "Solicitar Servicio", pill shape, full-width, 56-60px altura
- **VideoPlayer YouTube**: Debajo del card o integrado

### 4. **CreateItemScreen (Crear Post - estilo minimalista)**
- **Header**: "Cancelar" izquierda, "Nuevo Trabajo" centro, fondo beige/crema
- **Preview de imagen**: Grande, con círculo de fondo de color, placeholder con icono "+" si no hay imagen
- **Botón "Seleccionar Imagen"**: Pill shape, outline style o secundario
- **Card blanco con formulario**: Border-radius 24px, padding generoso
  - **Título**: TextInput con label "Título del Trabajo", border-radius 12px
  - **Descripción**: TextArea con label "Descripción", border-radius 12px
  - **Categoría**: OptionButtons circulares en fila (Electricidad, Fontanería, etc.)
  - **Precio**: Numeric Input con símbolo de moneda, border-radius 12px
  - **URL Video**: TextInput con label "Video YouTube (opcional)", border-radius 12px
- **Progress indicator**: Durante upload, barra de progreso o spinner con porcentaje
- **Botón "Publicar"**: Pill shape, full-width, 56-60px, naranja, disabled (gris) hasta completar validaciones
- **Validaciones**: Feedback en tiempo real debajo de cada input

### 5. **FavoritesScreen (Posts Guardados)**
- Similar a HomeScreen pero con posts favoritos
- Puede usar CompactCards para más densidad
- EmptyState si no hay favoritos
- Opción de quitar de favoritos con swipe o botón
- BottomTabBar con Favoritos activo

### 6. **ProfileScreen (Perfil de Usuario)**
- Header con avatar grande (80-100px)
- Nombre y especialidad
- Bio breve
- Stats en fila (StatCards): posts, favoritos, miembro desde
- Opcional: botones de editar perfil, configuración
- BottomTabBar con Perfil activo
- Scroll vertical si hay más contenido

---

## 📝 Notas Adicionales

### Patrones de Interacción
- **Swipe**: Posible swipe en cards para acciones rápidas (favorito, compartir)
- **Long press**: Menú contextual con más opciones
- **Pull-to-refresh**: En feeds para recargar contenido
- **Haptic feedback**: En botones importantes y acciones exitosas

### Animaciones
- **Transiciones**: Suaves entre pantallas (300ms)
- **Favorito**: Animación de "pop" al marcar/desmarcar
- **Loading**: Skeleton screens en lugar de spinners cuando sea posible
- **Scroll**: Header puede ocultarse al scroll down, aparecer al scroll up

### Accesibilidad
- Contraste mínimo 4.5:1 en textos
- Touch targets mínimo 44x44px
- Labels descriptivos para screen readers
- Soporte para tamaños de fuente del sistema

### Consideraciones Técnicas
- Diseño responsive para diferentes tamaños de pantalla (iPhone SE a iPhone Pro Max)
- Soporte para modo oscuro (opcional para Sprint 1, pero considerar en estructura)
- Optimización de imágenes (lazy loading, placeholders)
- Caché de imágenes para mejor performance

---

## ✅ Estado

- [x] URL del diseño proporcionada
- [x] Análisis visual completado
- [x] Colores documentados y justificados
- [x] Tipografía documentada
- [x] Espaciados documentados
- [x] Componentes identificados y especificados
- [x] Pantallas identificadas y descritas
- [x] Patrones de interacción documentados
- [x] **FASE 1 COMPLETADA** ✅

---

## 🎯 Conclusión del Análisis

El diseño de referencia (app de café estilo Starbucks) proporciona una base excelente para Mantenigram, adaptándolo al sector de mantenimiento:

### Elementos Clave del Diseño Original:
1. **Minimalismo premium**: Espaciado muy generoso, fondo beige/crema cálido
2. **Formas orgánicas**: Círculos grandes como elemento visual distintivo
3. **Fotografía destacada**: Imágenes realistas con sombras como protagonistas
4. **Tipografía bold**: Títulos grandes y claros (Poppins-style)
5. **Botones pill**: Completamente redondeados, muy táctiles (56-60px)
6. **Border radius generoso**: 24-32px en cards principales
7. **Colores cálidos**: Verde natural + beige acogedor

### Adaptación para Mantenigram:
1. **Color primary**: Naranja #FF8C42 (herramientas, energía) en lugar de verde
2. **Contenido**: Trabajos de mantenimiento en lugar de productos de café
3. **Categorías**: Electricidad, Fontanería, HVAC, etc. con colores distintivos
4. **Funcionalidad social**: Favoritos, perfiles de profesionales, feed de trabajos
5. **Integración técnica**: Upload a S3, videos YouTube, filtros avanzados

### Principios de Diseño a Mantener:
- ✅ Espaciado generoso (24-32px márgenes)
- ✅ Border radius grande (24-32px)
- ✅ Botones pill shape (56-60px altura)
- ✅ Fondo beige/crema (#F5F1E8)
- ✅ Tipografía bold para títulos (Poppins)
- ✅ Sombras sutiles pero presentes
- ✅ Formas circulares para destacar contenido
- ✅ Minimalismo y claridad visual

**Próximo Paso**: FASE 2 - Consolidar guía de estilos completa con estos elementos y preparar para prototipo Stitch.
