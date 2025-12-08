# Mantenigram

Red Social de Profesionales de Mantenimiento - Plataforma full stack para conectar profesionales del sector de mantenimiento, compartir trabajos, experiencias y conocimientos.

## 📱 Stack Tecnológico

- **Backend**: NestJS + TypeORM + AWS RDS (PostgreSQL)
- **Frontend**: React Native (Expo)
- **Almacenamiento**: AWS S3 (presigned URLs)
- **Región AWS**: us-east-1

## 🏗️ Estructura del Proyecto

```
mantenigram/
├── backend/          # API NestJS
├── frontend/         # App React Native (Expo)
├── docs/            # Documentación del proyecto
├── scripts/         # Scripts de utilidad
└── README.md        # Este archivo
```

## 🚀 Inicio Rápido

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Configurar variables de entorno
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## 📚 Documentación

- [Plan Sprint 1](docs/plan-sprint1.md) - Planning completo del sprint
- [Definition of Done](docs/dod-sprint1.md) - Checklist de tareas completadas
- [Referencia Dribbble](docs/dribbble-reference.md) - Diseño de referencia
- [Guía de Estilos](docs/style-guide.md) - Paleta de colores y tipografías
- [Pantallas](docs/screens.md) - Documentación de pantallas de la app
- [Flujo S3](docs/s3-flow.md) - Documentación del flujo de subida de imágenes

## 🔧 Configuración AWS

### RDS PostgreSQL
- Región: us-east-1
- Engine: PostgreSQL
- (Pendiente de crear)

### S3 Bucket
- Región: us-east-1
- (Pendiente de crear)

## 👥 Equipo

Proyecto desarrollado como parte del Sprint 1 - Diseño Creativo y Desarrollo Base Full Stack.
