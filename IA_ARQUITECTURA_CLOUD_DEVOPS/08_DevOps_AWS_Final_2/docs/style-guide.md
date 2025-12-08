# Guía de Estilos - Mantenigram
## Red Social de Profesionales de Mantenimiento

---

## 🎨 Paleta de Colores

### Colores Principales (Basados en el diseño de referencia)

| Color | HEX | Rol | Uso |
|-------|-----|-----|-----|
| **Primary** | #FF8C42 | Naranja cálido | Botones primarios, CTAs, elementos interactivos activos |
| **Primary Dark** | #E67A2E | Naranja oscuro | Estados pressed, hover |
| **Secondary** | #2C5F7C | Azul grisáceo | Acentos secundarios, links, badges |
| **Background** | #F5F1E8 | Beige/crema | Fondo principal de pantallas |
| **Surface** | #FFFFFF | Blanco puro | Cards, modales, elementos elevados |
| **Accent Green** | #4A9B7F | Verde natural | Confirmaciones, éxitos, badges de estado |
| **Text Primary** | #2C2C2C | Gris muy oscuro | Títulos, texto principal |
| **Text Secondary** | #8B8B8B | Gris medio | Descripciones, labels, metadatos |
| **Text on Color** | #FFFFFF | Blanco | Texto sobre fondos de color |
| **Border** | #E8E8E8 | Gris muy claro | Bordes de inputs, divisores |
| **Disabled** | #D1D1D1 | Gris claro | Elementos deshabilitados |
| **Error** | #D64545 | Rojo cálido | Errores, validaciones fallidas |
| **Success** | #4A9B7F | Verde (igual que accent) | Confirmaciones, operaciones exitosas |
| **Warning** | #F4A261 | Naranja suave | Advertencias, alertas |

### Colores de Categorías (Mantenimiento)

| Categoría | Color | HEX | Uso |
|-----------|-------|-----|-----|
| **Electricidad** | Naranja/Ámbar | #F4A261 | Fondo de círculo, badges |
| **Fontanería** | Verde agua | #4A9B7F | Fondo de círculo, badges |
| **HVAC** | Azul cielo | #6B9AC4 | Fondo de círculo, badges |
| **Carpintería** | Marrón madera | #8B6F47 | Fondo de círculo, badges |
| **Pintura** | Terracota | #E76F51 | Fondo de círculo, badges |
| **Mecánica** | Gris azulado | #5A6C7D | Fondo de círculo, badges |

### Gradientes (Opcional)

- **Hero Gradient**: `linear-gradient(135deg, #FF8C42 0%, #F4A261 100%)`
- **Success Gradient**: `linear-gradient(135deg, #4A9B7F 0%, #6BB89F 100%)`

---

## 📝 Tipografía

### Familia de Fuentes

- **Principal**: **Poppins** (sans-serif geométrica, moderna y amigable)
- **Alternativa**: Montserrat o Inter (si Poppins no está disponible)
- **Monospace**: Roboto Mono (para datos técnicos, si es necesario)

**Justificación**: Poppins tiene un estilo geométrico similar al diseño de referencia, es muy legible en móvil, transmite modernidad y profesionalismo, y tiene excelente soporte de pesos.

### Jerarquía Tipográfica (Basada en el diseño de referencia)

| Elemento | Fuente | Peso | Tamaño | Line Height | Uso |
|----------|--------|------|--------|-------------|-----|
| **Hero Title** | Poppins | Bold (700) | 32-36px | 42-48px | "Encuentra Tu Profesional" |
| **H1** | Poppins | Bold (700) | 28-32px | 38-42px | Títulos principales de detalle |
| **H2** | Poppins | Bold (700) | 24-28px | 32-36px | Títulos de productos/trabajos |
| **H3** | Poppins | SemiBold (600) | 20-22px | 28-30px | Subtítulos, secciones |
| **Price Large** | Poppins | Bold (700) | 28-32px | 36-40px | Precio en detalle |
| **Price Medium** | Poppins | SemiBold (600) | 20-24px | 28-30px | Precio en cards |
| **Body Large** | Poppins | Regular (400) | 16px | 24px | Descripciones importantes |
| **Body** | Poppins | Regular (400) | 14-15px | 22-24px | Texto principal |
| **Body Small** | Poppins | Regular (400) | 12-13px | 18-20px | Metadatos, info secundaria |
| **Button** | Poppins | SemiBold (600) | 16-18px | 22-24px | Texto de botones |
| **Label** | Poppins | Medium (500) | 14-16px | 20-22px | Labels de secciones |
| **Caption** | Poppins | Regular (400) | 11-12px | 16-18px | Etiquetas pequeñas |
| **Option Label** | Poppins | Medium (500) | 14-16px | 20px | Labels de opciones circulares |
| **Option Sublabel** | Poppins | Regular (400) | 11-12px | 16px | Sublabels (ej: "24 Fl Oz") |

### Características Tipográficas

- **Letter Spacing**: 
  - Títulos grandes: -0.5px a 0px (más compacto)
  - Texto normal: 0px (normal)
  - Botones: 0.5px (ligeramente amplio)
  - Labels pequeños: 0.3px (ligeramente amplio)

- **Text Transform**:
  - Títulos: Normal (sentence case)
  - Botones: Normal o Capitalize
  - Labels de sección: Capitalize o Normal

- **Alineación**:
  - Títulos hero: Centrado o Izquierda
  - Títulos en cards: Centrado (en hero cards) o Izquierda (en detail)
  - Precios: Derecha (con label) o Centrado
  - Descripciones: Izquierda
  - Botones: Centrado

---

## 📏 Sistema de Espaciado

### Grid Base: 8px

**El diseño de referencia usa espaciado MUY GENEROSO**. Todos los espaciados son múltiplos de 8px.

| Token | Valor | Uso |
|-------|-------|-----|
| **xxs** | 4px | Espaciado mínimo (entre elementos muy relacionados) |
| **xs** | 8px | Espaciado pequeño |
| **sm** | 12px | Espaciado pequeño-medio |
| **md** | 16px | Espaciado medio |
| **lg** | 24px | Espaciado grande |
| **xl** | 32px | Espaciado extra grande |
| **2xl** | 40px | Espaciado muy grande |
| **3xl** | 48px | Espaciado enorme |

### Aplicaciones Específicas (del diseño de referencia)

- **Márgenes laterales de pantalla**: 24-32px (lg-xl) - MUY GENEROSO
- **Padding interno de cards blancas**: 24-32px (lg-xl) - MUY GENEROSO
- **Espaciado entre título y precio**: 8-12px (xs-sm) - Compacto
- **Espaciado entre precio y sección de opciones**: 24px (lg) - Amplio
- **Espaciado entre filas de opciones**: 16-20px (md-lg) - Medio-amplio
- **Espaciado entre opciones y botón principal**: 32-40px (xl-2xl) - MUY AMPLIO
- **Espaciado entre elementos de formulario**: 16-20px (md-lg)
- **Espaciado entre secciones**: 32-48px (xl-3xl) - MUY AMPLIO
- **Padding top/bottom de pantallas**: 24-32px (lg-xl)
- **Espaciado entre cards en lista**: 16-24px (md-lg)

---

## 🔲 Componentes Base

### Botones (Basados en el diseño de referencia)

#### Primary Button (Pill Shape)
- **Forma**: Pill shape completo (border-radius 28-32px)
- **Altura**: 56-60px (MUY TÁCTIL)
- **Ancho**: Casi full-width (márgenes laterales 24-32px)
- **Fondo**: #FF8C42 (naranja primary)
- **Texto**: Blanco, Poppins SemiBold, 16-18px, centrado
- **Sombra**: 0px 6px 16px rgba(255,140,66,0.25) - sombra de color
- **Padding horizontal**: 32-40px
- **Estados**:
  - Normal: Fondo naranja sólido
  - Pressed: Fondo #E67A2E (más oscuro)
  - Disabled: Fondo #D1D1D1 (gris), texto #8B8B8B

#### Secondary Button (Outline Pill)
- **Forma**: Pill shape (border-radius 28-32px)
- **Altura**: 52-56px
- **Borde**: 2px sólido, #FF8C42
- **Fondo**: Transparente o blanco
- **Texto**: #FF8C42, Poppins SemiBold, 16px
- **Sin sombra** o sombra muy sutil

#### Quantity Buttons (Circular)
- **Tamaño**: 44x44px (círculo perfecto)
- **Fondo**: #FF8C42 (naranja sólido)
- **Icono**: - o +, blanco, 24px, centrado
- **Sombra**: Sutil, 0px 2px 8px rgba(0,0,0,0.1)

#### Option Buttons (Circular con Label)
- **Tamaño**: 64-72px (círculo grande)
- **Estado inactivo**:
  - Fondo: #E8F5F1 (gris muy claro)
  - Icono: #8B8B8B (gris), 32px
  - Label: #8B8B8B, Poppins Medium, 14-16px
  - Sublabel: #B8B8B8, Poppins Regular, 11-12px
- **Estado activo**:
  - Fondo: #FF8C42 (naranja)
  - Icono: Blanco, 32px
  - Label: #2C2C2C (negro), Poppins SemiBold, 14-16px
  - Sublabel: #8B8B8B, Poppins Regular, 11-12px

#### Icon Button (Header)
- **Tamaño**: 40-44px (circular o cuadrado redondeado)
- **Fondo**: Blanco, transparente, o #F5F1E8
- **Icono**: 24px, #2C2C2C o #FF8C42
- **Border radius**: 50% (circular) o 12px (cuadrado)
- **Sombra**: Opcional, muy sutil

### Cards (Basados en el diseño de referencia)

#### Hero Card (Carousel Principal)
- **Fondo exterior**: #F5F1E8 (beige/crema)
- **Border Radius**: 24-32px (muy redondeado)
- **Padding**: 24-32px
- **Forma orgánica interior**: Círculo grande con color de categoría
- **Estructura**:
  - Círculo de fondo: Color de categoría (ej: #FF8C42, #4A9B7F)
  - Imagen del trabajo: Centrada, con sombra realista (0px 8px 24px rgba(0,0,0,0.12))
  - Título: Blanco, Poppins Bold, 24-28px, centrado, sobre el círculo
  - Precio: Blanco, Poppins SemiBold, 20-24px, centrado, debajo del título
  - Dots indicadores: Abajo, 8-10px, activo en naranja/verde
- **Sombra del card**: 0px 4px 12px rgba(0,0,0,0.08) - muy sutil

#### Detail Card (Pantalla de Detalle)
- **Fondo**: Blanco (#FFFFFF)
- **Border Radius**: 24-32px
- **Padding**: 24-32px (muy generoso)
- **Sombra**: 0px 4px 16px rgba(0,0,0,0.08)
- **Estructura**:
  - Círculo de fondo de color arriba
  - Imagen grande centrada con sombra
  - Título: Poppins Bold, 28-32px, negro
  - Precio: Poppins Bold, 28-32px, naranja/verde, alineado derecha
  - Label de sección: "Opciones" o similar, Poppins Medium, 14-16px
  - Fila de OptionButtons
  - Descripción: Poppins Regular, 14-15px, gris oscuro
  - Info del profesional: Avatar + nombre + especialidad
  - Botón principal: Pill shape, full-width

#### Category Card (Scroll Horizontal)
- **Círculo blanco**: 64-72px de diámetro
- **Fondo**: Blanco (#FFFFFF)
- **Sombra**: 0px 2px 8px rgba(0,0,0,0.06) - muy sutil
- **Icono**: 32px, color de categoría, centrado
- **Label**: Debajo del círculo, Poppins Medium, 12-13px, centrado
- **Espaciado entre cards**: 12-16px

### Inputs (Estilo Minimalista)

#### Text Input
- **Altura**: 52-56px (generoso)
- **Border**: 1px sólido, #E8E8E8 (gris muy claro)
- **Border Radius**: 12-16px (redondeado)
- **Padding**: 16px 20px (generoso)
- **Fondo**: Blanco (#FFFFFF)
- **Texto**: Poppins Regular, 14-15px, #2C2C2C
- **Placeholder**: Poppins Regular, 14-15px, #8B8B8B
- **Label**: Arriba del input, Poppins Medium, 13-14px, #2C2C2C
- **Focus**: 
  - Border: 2px sólido, #FF8C42
  - Sombra: 0px 0px 0px 4px rgba(255,140,66,0.1)

#### Text Area
- **Altura mínima**: 120px
- **Border**: 1px sólido, #E8E8E8
- **Border Radius**: 12-16px
- **Padding**: 16px 20px
- **Resto**: Igual que Text Input

#### Search Bar (Pill Shape)
- **Altura**: 48-52px
- **Border Radius**: 24-26px (pill completo)
- **Fondo**: Blanco (#FFFFFF) o #F5F1E8
- **Border**: 1px sólido, #E8E8E8 (opcional)
- **Icono lupa**: 20-22px, #8B8B8B, izquierda con padding 16px
- **Placeholder**: Poppins Regular, 14px, #8B8B8B
- **Padding**: 12px 20px 12px 48px (espacio para icono)

### Iconografía

- **Tamaño en botones circulares**: 32px (iconos grandes en OptionButtons)
- **Tamaño estándar**: 24px (iconos en headers, icon buttons)
- **Tamaño pequeño**: 20px (iconos en inputs, search)
- **Tamaño en badges**: 16px
- **Estilo**: **Outline** (line icons) para consistencia con el diseño minimalista
- **Peso de línea**: 2px (medium weight)
- **Librería sugerida**: **Feather Icons** o **Ionicons** (outline variant)
- **Colores**:
  - Activo: #FF8C42 (naranja) o color de categoría
  - Inactivo: #8B8B8B (gris)
  - Sobre fondo de color: #FFFFFF (blanco)

---

## 🎭 Sombras y Elevaciones (Sutiles pero Presentes)

**El diseño de referencia usa sombras MUY SUTILES y suaves, nunca duras.**

| Nivel | Uso | Sombra |
|-------|-----|--------|
| **0** | Sin elevación | none |
| **1** | Category cards, inputs | 0px 2px 8px rgba(0,0,0,0.06) - muy sutil |
| **2** | Cards principales, hero cards | 0px 4px 12px rgba(0,0,0,0.08) - sutil |
| **3** | Detail cards, modales | 0px 4px 16px rgba(0,0,0,0.08) - sutil |
| **4** | Imágenes de producto/trabajo | 0px 8px 24px rgba(0,0,0,0.12) - sombra realista |
| **Color** | Botón principal | 0px 6px 16px rgba(255,140,66,0.25) - sombra de color naranja |
| **Focus** | Inputs en focus | 0px 0px 0px 4px rgba(255,140,66,0.1) - glow sutil |

### Características de las Sombras

- **Opacidad baja**: Máximo 0.12 (12%) para sombras negras
- **Blur radius grande**: 12-24px para suavidad
- **Offset Y pequeño**: 2-8px, nunca muy pronunciado
- **Sin offset X**: Siempre 0px para sombras centradas
- **Sombras de color**: Para botones primarios, usar color del botón con opacidad 0.25

---

## 🔄 Estados Interactivos

### Botones
- **Normal**: Colores base
- **Hover**: Opacidad 90%
- **Pressed**: Opacidad 80%, elevación reducida
- **Disabled**: Opacidad 40%, sin interacción

### Cards
- **Normal**: Elevación 1
- **Hover**: Elevación 2
- **Pressed**: Elevación 0

---

## 📱 Responsive y Adaptabilidad

### Breakpoints (si aplica para web)
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Consideraciones Mobile-First
- Diseño optimizado para pantallas de 375px - 428px de ancho
- Touch targets mínimo 44x44px
- Espaciado generoso para facilitar interacción táctil

---

## 🎨 Relación con Diseño Dribbble

### Elementos Mantenidos del Diseño Original

✅ **Fondo beige/crema** (#F5F1E8) - Mantiene la calidez y elegancia  
✅ **Formas circulares grandes** - Como elemento visual distintivo para destacar contenido  
✅ **Border radius generoso** (24-32px) - Para look moderno y suave  
✅ **Botones pill shape** (56-60px altura) - Muy táctiles y modernos  
✅ **Espaciado muy generoso** (24-32px márgenes) - Sensación premium y respirable  
✅ **Tipografía bold para títulos** - Poppins Bold para jerarquía clara  
✅ **Sombras sutiles** - Nunca duras, siempre suaves (opacidad máx 0.12)  
✅ **Minimalismo** - Diseño limpio sin elementos innecesarios  
✅ **Fotografía destacada** - Imágenes como protagonistas con sombras realistas  
✅ **Option buttons circulares** - Para selección de opciones/tamaños  

### Elementos Adaptados para Mantenigram

🔄 **Color primary**: Verde → **Naranja #FF8C42**  
   - Razón: El naranja evoca herramientas, energía y trabajo manual, más apropiado para mantenimiento

🔄 **Contenido**: Productos de café → **Trabajos de mantenimiento**  
   - Razón: Adaptación al sector objetivo

🔄 **Categorías**: Bebidas → **Servicios de mantenimiento**  
   - Electricidad, Fontanería, HVAC, Carpintería, Pintura, Mecánica
   - Cada una con su color distintivo

🔄 **Funcionalidad**: E-commerce → **Red social profesional**  
   - Añadido: Perfiles de profesionales, favoritos, feed social

🔄 **Navegación**: Carousel de productos → **Feed + Carousel + Filtros**  
   - Más complejo para soportar búsqueda y filtrado avanzado

### Elementos Añadidos (No en Dribbble Original)

➕ **Sistema de favoritos** - Guardar trabajos/profesionales  
➕ **Perfiles de profesionales** - Con avatar, especialidad, bio, stats  
➕ **Filtros avanzados** - Por categoría, precio, ubicación, fecha  
➕ **Upload de imágenes a S3** - Flujo completo con presigned URLs  
➕ **Integración de video YouTube** - Para mostrar trabajos en video  
➕ **Sistema de categorías con colores** - 6 categorías con paleta distintiva  
➕ **Bottom tab navigation** - Para navegación rápida (Home, Favoritos, Perfil)  
➕ **Estados de carga/error/vacío** - Para mejor UX  
➕ **Búsqueda por texto** - Con debounce y resultados en tiempo real  

### Filosofía de Diseño Mantenida

- **Premium pero accesible**: Espaciado generoso sin ser excesivo
- **Cálido y acogedor**: Fondo beige en lugar de blanco frío
- **Visual primero**: Fotografías grandes y destacadas
- **Táctil y amigable**: Botones grandes, fáciles de tocar
- **Minimalista**: Solo lo esencial, sin ruido visual

---

## 📝 Notas de Implementación

### React Native / Expo
- Usar StyleSheet para definir estilos
- Crear archivo `theme.ts` con tokens de diseño
- Considerar usar `react-native-paper` o crear sistema de diseño propio
- Fuentes: Usar `expo-font` para cargar fuentes personalizadas

### Accesibilidad
- Contraste mínimo 4.5:1 para texto normal
- Contraste mínimo 3:1 para texto grande
- Touch targets mínimo 44x44px
- Soporte para modo oscuro (opcional para Sprint 1)

---

## ✅ Estado

- [x] Paleta de colores definida (basada en diseño de referencia)
- [x] Tipografías seleccionadas (Poppins)
- [x] Sistema de espaciado establecido (8px grid, muy generoso)
- [x] Componentes base documentados (botones, cards, inputs)
- [x] Sombras y elevaciones definidas (sutiles, opacidad máx 0.12)
- [x] Relación con Dribbble documentada (elementos mantenidos/adaptados/añadidos)
- [x] **FASE 2 COMPLETADA** ✅

---

**Próximo Paso**: FASE 3 - Generar prototipo con Google Stitch y validar con IA.
