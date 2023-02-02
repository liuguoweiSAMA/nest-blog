import { NestApplication, NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Validate } from './common/validate'
import { TransformInterceptor } from './response.inteceptor'

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule)
  app.useGlobalPipes(new Validate())
  app.useGlobalInterceptors(new TransformInterceptor())
  app.setGlobalPrefix('api')
  app.useStaticAssets('uploads', { prefix: '/uploads' })
  await app.listen(3000)
}
bootstrap()
