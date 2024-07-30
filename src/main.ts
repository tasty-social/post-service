import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { TransformInterceptor } from './transform/transform.interceptor'
import { HttpExceptionFilter } from './error/http-exception.filter'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('api/v1')
  const config = new DocumentBuilder()
    .setTitle('User Service API')
    .setDescription('The user service API description')
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document)
  await app.listen(3002)
}
bootstrap()
