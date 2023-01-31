import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
//模块全局 exports server导出
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
