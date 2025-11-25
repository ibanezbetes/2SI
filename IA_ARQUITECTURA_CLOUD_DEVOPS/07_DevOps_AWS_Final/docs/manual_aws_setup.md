# Guía de Configuración Manual AWS - Mantenigram

Sigue estos pasos para crear los recursos necesarios en AWS y conectar tu aplicación.

## 1. Base de Datos (RDS PostgreSQL)

1.  Inicia sesión en la **Consola de AWS** y ve al servicio **RDS**.
2.  Haz clic en **"Create database"** (Crear base de datos).
3.  Selecciona **"Standard create"** (Creación estándar).
4.  **Engine options**: Selecciona **PostgreSQL**.
5.  **Templates**: Selecciona **Free tier** (Capa gratuita) para evitar costes.
6.  **Settings**:
    - **DB instance identifier**: `mantenigram-db`
    - **Master username**: `postgres`
    - **Master password**: Crea una contraseña segura (ej: `Mantenigram2025!`) y guárdala.
7.  **Instance configuration**: Deja la opción por defecto (db.t3.micro o db.t4g.micro).
8.  **Connectivity**:
    - **Public access**: Selecciona **Yes** (Sí) para poder conectarte desde tu ordenador local durante el desarrollo.
    - **VPC security group**: Selecciona "Create new" y llámalo `mantenigram-sg`.
9.  Haz clic en **"Create database"**.
10. Espera unos minutos hasta que el estado sea "Available".
11. Haz clic en la base de datos creada y copia el **Endpoint** (ej: `mantenigram-db.xxxx.us-east-1.rds.amazonaws.com`).

## 2. Almacenamiento (S3 Bucket)

1.  Ve al servicio **S3**.
2.  Haz clic en **"Create bucket"**.
3.  **Bucket name**: Elige un nombre único globalmente (ej: `mantenigram-assets-tu-nombre`).
4.  **Region**: `us-east-1` (o la misma que tu RDS).
5.  **Object Ownership**: Deja "ACLs disabled".
6.  **Block Public Access settings**:
    - **Desmarca** la casilla "Block all public access".
    - Marca la casilla de confirmación de advertencia.
    - _Nota: Esto es necesario para que las imágenes sean visibles públicamente en la app._
7.  Haz clic en **"Create bucket"**.
8.  Entra en tu bucket, ve a la pestaña **Permissions** y baja a **CORS configuration**.
9.  Pega este JSON para permitir subir imágenes desde tu app:
    ```json
   [
      {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["PUT", "GET", "POST", "HEAD"],
        "AllowedOrigins": ["*"],
        "ExposeHeaders": []
      }
    ] 
    ```

## 3. Credenciales de Acceso (IAM)

Necesitas un usuario con permisos para subir archivos a S3.

1.  Ve al servicio **IAM**.
2.  Ve a **Users** -> **Create user**.
3.  Nombre: `mantenigram-dev`.
4.  **Permissions**:
    - Selecciona "Attach policies directly".
    - Busca y selecciona `AmazonS3FullAccess` (para desarrollo es más rápido, en prod sería más restrictivo).
5.  Crea el usuario.
6.  Entra en el usuario creado, ve a la pestaña **Security credentials**.
7.  Baja a **Access keys** y haz clic en **Create access key**.
8.  Selecciona "Local code".
9.  Copia el **Access key** y el **Secret access key**. ¡No los pierdas!

## 4. Actualizar el Proyecto

Abre el archivo `backend/.env` y actualiza los valores con lo que acabas de crear:

```env
DB_HOST=tu-endpoint-rds.amazonaws.com
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=tu-contraseña-rds
DB_DATABASE=postgres  <-- Por defecto RDS crea esta DB, puedes usarla

AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=tu-access-key-iam
AWS_SECRET_ACCESS_KEY=tu-secret-key-iam
AWS_S3_BUCKET_NAME=tu-nombre-de-bucket
```

## 5. Verificar

1.  Reinicia el backend: `npm run start:dev`
2.  Ejecuta los seeds para poblar la base de datos remota: `npm run seed`
