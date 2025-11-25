import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ItemsService } from './items/items.service';
import { CreateItemDto } from './items/dto/create-item.dto';
import { UsersService } from './users/users.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const itemsService = app.get(ItemsService);
  const usersService = app.get(UsersService);

  console.log('Seeding database...');

  // Create a demo user
  const uniqueEmail = `demo_${Date.now()}@mantenigram.com`;
  const user = await usersService.create({
    name: 'Demo User',
    email: uniqueEmail,
    specialty: 'General',
    bio: 'Usuario de prueba',
    avatarKey: 'avatar.jpg',
  });
  console.log(`Created user: ${user.id}`);

  const categories = ['Electricidad', 'Fontanería', 'Carpintería', 'Pintura', 'Jardinería', 'Limpieza'];
  const titles = [
    'Reparación de enchufe', 'Instalación de lámpara', 'Fuga de agua', 'Grifo goteando',
    'Mesa rota', 'Puerta atascada', 'Pintar habitación', 'Retocar pared',
    'Cortar césped', 'Podar setos', 'Limpieza general', 'Limpieza de ventanas'
  ];

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

    // Pass the user ID to the create method
    await itemsService.create(item, user.id);
    console.log(`Created item: ${title}`);
  }

  console.log('Seeding complete!');
  await app.close();
}
bootstrap();
