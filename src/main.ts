import { ClassSerializerInterceptor } from '@nestjs/common'
import { NestApplication, NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { Validate } from './common/validate'
import { TransformInterceptor } from './response.inteceptor'

async function bootstrap() {
  const app = await NestFactory.create<NestApplication>(AppModule)
  app.useGlobalPipes(new Validate())
  app.useGlobalInterceptors(new TransformInterceptor())
  // 前缀api
  app.setGlobalPrefix('api')
  //存upload的文件
  app.useStaticAssets('uploads', { prefix: '/uploads' })
  //序列化
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  await app.listen(3000)
}
bootstrap()
