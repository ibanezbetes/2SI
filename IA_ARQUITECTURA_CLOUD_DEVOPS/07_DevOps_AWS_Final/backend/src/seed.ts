import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ItemsService } from './items/items.service';
import { CreateItemDto } from './items/dto/create-item.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const itemsService = app.get(ItemsService);

  const categories = ['Electricidad', 'Fontanería', 'Carpintería', 'Pintura', 'Jardinería', 'Limpieza'];
  const titles = [
    'Reparación de enchufe', 'Instalación de lámpara', 'Fuga de agua', 'Grifo goteando',
    'Mesa rota', 'Puerta atascada', 'Pintar habitación', 'Retocar pared',
    'Cortar césped', 'Podar setos', 'Limpieza general', 'Limpieza de ventanas'
  ];

  console.log('Seeding database...');

  for (let i = 0; i < 30; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const title = titles[Math.floor(Math.random() * titles.length)] + ` #${i + 1}`;
    
    const item: CreateItemDto = {
      title,
      description: `Descripción detallada para el trabajo de ${title}. Necesito un profesional con experiencia.`,
      category,
      price: Math.floor(Math.random() * 100) + 20,
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Rick Roll as placeholder
      thumbnailKey: 'placeholder.jpg', // Placeholder
    };

    await itemsService.create(item);
    console.log(`Created item: ${title}`);
  }

  console.log('Seeding complete!');
  await app.close();
}
bootstrap();
