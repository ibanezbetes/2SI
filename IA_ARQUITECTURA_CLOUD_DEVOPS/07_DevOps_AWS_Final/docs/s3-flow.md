# Flujo de Subida de Imágenes a S3 - Mantenigram
## Documentación del Proceso de Presigned URLs

---

## 🎯 Objetivo

Documentar el flujo completo de subida de imágenes a AWS S3 usando presigned URLs, desde el frontend (React Native) hasta el backend (NestJS) y S3.

---

## 📊 Diagrama de Flujo

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Frontend  │         │   Backend   │         │   AWS S3    │
│ React Native│         │   NestJS    │         │             │
└──────┬──────┘         └──────┬──────┘         └──────┬──────┘
       │                       │                       │
       │ 1. Seleccionar imagen │                       │
       │    (expo-image-picker)│                       │
       │                       │                       │
       │ 2. POST /uploads/presign                     │
       │    { fileName, contentType }                 │
       ├──────────────────────>│                       │
       │                       │                       │
       │                       │ 3. Generar presigned URL
       │                       │    (AWS SDK)          │
       │                       ├──────────────────────>│
       │                       │                       │
       │                       │ 4. Return { url, key }│
       │                       │<──────────────────────┤
       │                       │                       │
       │ 5. { url, key }       │                       │
       │<──────────────────────┤                       │
       │                       │                       │
       │ 6. PUT a presigned URL│                       │
       │    (con imagen blob)  │                       │
       ├───────────────────────────────────────────────>│
       │                       │                       │
       │ 7. 200 OK             │                       │
       │<───────────────────────────────────────────────┤
       │                       │                       │
       │ 8. POST /items        │                       │
       │    { title, ..., thumbnailKey }              │
       ├──────────────────────>│                       │
       │                       │                       │
       │                       │ 9. Guardar en DB      │
       │                       │    (con thumbnailKey) │
       │                       │                       │
       │ 10. { item }          │                       │
       │<──────────────────────┤                       │
       │                       │                       │
       │ 11. Navegar a Detail  │                       │
       │     o Home            │                       │
       │                       │                       │
```

---

## 🔧 Implementación Backend (NestJS)

### 1. Configuración AWS S3

**Archivo**: `backend/src/config/aws.config.ts`

```typescript
import { S3Client } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
```

### 2. Servicio de Uploads

**Archivo**: `backend/src/uploads/uploads.service.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client } from '../config/aws.config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadsService {
  private readonly bucket = process.env.AWS_S3_BUCKET;
  private readonly expiresIn = 600; // 10 minutos

  async generatePresignedUrl(fileName: string, contentType: string) {
    // Generar key única
    const fileExtension = fileName.split('.').pop();
    const key = `uploads/${uuidv4()}.${fileExtension}`;

    // Crear comando PUT
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: contentType,
    });

    // Generar presigned URL
    const url = await getSignedUrl(s3Client, command, {
      expiresIn: this.expiresIn,
    });

    return { url, key };
  }
}
```

### 3. Controlador de Uploads

**Archivo**: `backend/src/uploads/uploads.controller.ts`

```typescript
import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UploadsService } from './uploads.service';
import { PresignRequestDto } from './dto/presign-request.dto';

@ApiTags('uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('presign')
  @ApiOperation({ summary: 'Generate presigned URL for S3 upload' })
  async generatePresignedUrl(@Body() dto: PresignRequestDto) {
    return this.uploadsService.generatePresignedUrl(
      dto.fileName,
      dto.contentType,
    );
  }
}
```

### 4. DTO de Request

**Archivo**: `backend/src/uploads/dto/presign-request.dto.ts`

```typescript
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PresignRequestDto {
  @ApiProperty({ example: 'photo.jpg' })
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @ApiProperty({ example: 'image/jpeg' })
  @IsString()
  @IsNotEmpty()
  contentType: string;
}
```

### 5. Variables de Entorno

**Archivo**: `backend/.env`

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=mantenigram-uploads
```

---

## 📱 Implementación Frontend (React Native)

### 1. Servicio de API

**Archivo**: `frontend/src/services/api.ts`

```typescript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; // Cambiar según entorno

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generar presigned URL
export const generatePresignedUrl = async (fileName: string, contentType: string) => {
  const response = await api.post('/uploads/presign', {
    fileName,
    contentType,
  });
  return response.data; // { url, key }
};

// Subir imagen a S3
export const uploadToS3 = async (presignedUrl: string, imageUri: string, contentType: string) => {
  const response = await fetch(imageUri);
  const blob = await response.blob();

  const uploadResponse = await fetch(presignedUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
    },
    body: blob,
  });

  if (!uploadResponse.ok) {
    throw new Error('Failed to upload to S3');
  }

  return uploadResponse;
};

// Crear item
export const createItem = async (itemData: any) => {
  const response = await api.post('/items', itemData);
  return response.data;
};
```

### 2. Hook de Upload

**Archivo**: `frontend/src/hooks/useImageUpload.ts`

```typescript
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { generatePresignedUrl, uploadToS3 } from '../services/api';

export const useImageUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pickAndUploadImage = async () => {
    try {
      setUploading(true);
      setError(null);

      // 1. Seleccionar imagen
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (result.canceled) {
        setUploading(false);
        return null;
      }

      const asset = result.assets[0];
      const fileName = asset.uri.split('/').pop() || 'image.jpg';
      const contentType = `image/${fileName.split('.').pop()}`;

      // 2. Obtener presigned URL
      const { url, key } = await generatePresignedUrl(fileName, contentType);

      // 3. Subir a S3
      await uploadToS3(url, asset.uri, contentType);

      setUploading(false);

      // 4. Retornar key y URI local para preview
      return { key, uri: asset.uri };
    } catch (err) {
      setError(err.message);
      setUploading(false);
      return null;
    }
  };

  return { pickAndUploadImage, uploading, error };
};
```

### 3. Componente CreateItemScreen

**Archivo**: `frontend/src/screens/CreateItemScreen.tsx`

```typescript
import React, { useState } from 'react';
import { View, TextInput, Button, Image, ActivityIndicator } from 'react-native';
import { useImageUpload } from '../hooks/useImageUpload';
import { createItem } from '../services/api';

export const CreateItemScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailKey, setThumbnailKey] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const { pickAndUploadImage, uploading, error } = useImageUpload();

  const handleSelectImage = async () => {
    const result = await pickAndUploadImage();
    if (result) {
      setThumbnailKey(result.key);
      setImageUri(result.uri);
    }
  };

  const handlePublish = async () => {
    if (!thumbnailKey) {
      alert('Por favor selecciona una imagen');
      return;
    }

    try {
      setCreating(true);

      const itemData = {
        title,
        description,
        category,
        price: parseFloat(price),
        videoUrl,
        thumbnailKey,
      };

      const newItem = await createItem(itemData);

      setCreating(false);
      navigation.navigate('Detail', { itemId: newItem.id });
    } catch (err) {
      setCreating(false);
      alert('Error al crear el post');
    }
  };

  return (
    <View>
      {/* Selector de imagen */}
      <Button title="Seleccionar Imagen" onPress={handleSelectImage} disabled={uploading} />
      {uploading && <ActivityIndicator />}
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 112 }} />}

      {/* Formulario */}
      <TextInput placeholder="Título" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Descripción" value={description} onChangeText={setDescription} />
      <TextInput placeholder="Categoría" value={category} onChangeText={setCategory} />
      <TextInput placeholder="Precio" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput placeholder="URL Video YouTube" value={videoUrl} onChangeText={setVideoUrl} />

      {/* Botón publicar */}
      <Button
        title="Publicar"
        onPress={handlePublish}
        disabled={!thumbnailKey || creating || uploading}
      />
      {creating && <ActivityIndicator />}
    </View>
  );
};
```

### 4. Mostrar Imagen desde S3

**Archivo**: `frontend/src/screens/DetailScreen.tsx`

```typescript
import React, { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';
import { api } from '../services/api';

export const DetailScreen = ({ route }) => {
  const { itemId } = route.params;
  const [item, setItem] = useState(null);

  useEffect(() => {
    loadItem();
  }, []);

  const loadItem = async () => {
    const response = await api.get(`/items/${itemId}`);
    setItem(response.data);
  };

  if (!item) return <Text>Cargando...</Text>;

  // Construir URL de S3
  const imageUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.thumbnailKey}`;

  return (
    <View>
      <Image source={{ uri: imageUrl }} style={{ width: '100%', height: 200 }} />
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
      {/* Video YouTube, etc. */}
    </View>
  );
};
```

---

## 🔐 Configuración de S3 Bucket

### 1. Crear Bucket

```bash
aws s3 mb s3://mantenigram-uploads --region us-east-1
```

### 2. Configurar CORS

**Archivo**: `cors-config.json`

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"]
  }
]
```

```bash
aws s3api put-bucket-cors --bucket mantenigram-uploads --cors-configuration file://cors-config.json
```

### 3. Configurar Política de Bucket (Lectura Pública)

**Archivo**: `bucket-policy.json`

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::mantenigram-uploads/*"
    }
  ]
}
```

```bash
aws s3api put-bucket-policy --bucket mantenigram-uploads --policy file://bucket-policy.json
```

### 4. Crear Usuario IAM

```bash
aws iam create-user --user-name mantenigram-s3-user
aws iam attach-user-policy --user-name mantenigram-s3-user --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess
aws iam create-access-key --user-name mantenigram-s3-user
```

Guardar `AccessKeyId` y `SecretAccessKey` en `.env`.

---

## ✅ Checklist de Implementación

### Backend
- [ ] Instalar dependencias: `@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`, `uuid`
- [ ] Configurar cliente S3
- [ ] Crear servicio de uploads
- [ ] Crear controlador de uploads
- [ ] Crear DTOs
- [ ] Documentar con Swagger
- [ ] Añadir tests unitarios
- [ ] Configurar variables de entorno

### Frontend
- [ ] Instalar dependencias: `expo-image-picker`, `axios`
- [ ] Crear servicio de API
- [ ] Crear hook de upload
- [ ] Implementar CreateItemScreen
- [ ] Implementar preview de imagen
- [ ] Implementar estados loading/error
- [ ] Mostrar imágenes desde S3 en Detail
- [ ] Manejar errores de red

### AWS
- [ ] Crear bucket S3
- [ ] Configurar CORS
- [ ] Configurar política de lectura pública
- [ ] Crear usuario IAM
- [ ] Generar access keys
- [ ] Documentar credenciales

---

## 🐛 Troubleshooting

### Error: "Access Denied" al subir a S3
- Verificar que la presigned URL no haya expirado
- Verificar que el `Content-Type` coincida
- Verificar permisos del usuario IAM

### Error: "CORS policy" en frontend
- Verificar configuración CORS del bucket
- Verificar que `AllowedOrigins` incluya el origen correcto

### Imagen no se muestra en DetailScreen
- Verificar que el bucket tenga lectura pública
- Verificar que la URL se construya correctamente
- Verificar que `thumbnailKey` se haya guardado correctamente

---

## 📚 Referencias

- [AWS SDK for JavaScript v3 - S3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/)
- [Presigned URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html)
- [Expo Image Picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
- [S3 CORS Configuration](https://docs.aws.amazon.com/AmazonS3/latest/userguide/cors.html)

---

**Estado**: Documentación completa - Pendiente de implementación
