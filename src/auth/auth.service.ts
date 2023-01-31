import { Injectable } from '@nestjs/common'
import RegisterDto from './dto/register.dto'
import { hash } from 'argon2'
import { PrismaService } from 'src/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
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
