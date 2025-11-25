# Mantenigram Backend

Backend en NestJS para la aplicación Mantenigram.

## Configuración

1.  Copiar `.env.example` a `.env` y configurar las variables de entorno.
    ```bash
    cp .env.example .env
    ```
2.  Instalar dependencias:
    ```bash
    npm install
    ```

## Ejecución

### Desarrollo

```bash
npm run start:dev
```

### Producción

```bash
npm run build
npm run start:prod
```

## Seeds

Para poblar la base de datos con datos de prueba (30+ ítems):

```bash
npm run seed
```

## Documentación

La documentación de la API (Swagger) está disponible en `/docs` cuando el servidor está corriendo (ej: `http://localhost:3000/docs`).
