import { BadGatewayException, Injectable } from '@nestjs/common'
import RegisterDto from './dto/register.dto'
import { hash, verify } from 'argon2'
import { PrismaService } from 'src/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import LoginDto from './dto/login.dto'
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  async register(dto: RegisterDto) {
    const password = await hash(dto.password)
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        password,
      },
    })
    console.log(user)
    return this.token(user)
  }
  async login(dto: LoginDto) {
    // findUnique 唯一索引查找
    const user = await this.prisma.user.findUnique({
      where: {
        name: dto.name,
      },
    })
    if (!(await verify(user.password, dto.password))) {
      throw new BadGatewayException('密码输入错误')
    }
    return this.token(user)
  }
  private async token({ name, id }) {
    // console.log(id, name)
    return {
      token: await this.jwt.signAsync({
        name,
        sub: id,
      }),
    }
  }
}
