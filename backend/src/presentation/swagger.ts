import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Tienda Virtual API')
  .setDescription('Documentación de la API')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
