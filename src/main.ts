import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { TransformInterceptor } from './common/transform/transform.interceptor'
import { HttpExceptionFilter } from './common/error/http-exception.filter'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'

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

  const configService = app.get<ConfigService>(ConfigService)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        ssl: configService.get<boolean>('kafka.ssl'),
        brokers: configService.get<string[]>('kafka.brokers')
      },
      consumer: {
        groupId: configService.get<string>('kafka.consumerGroupId')
      }
    }
  })

  await app.startAllMicroservices()
  await app.listen(3002)
}
bootstrap()
