import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import RegisterDto from './dto/register.dto'

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto)
    // console.log(body)
    // return body
  }
  @Post('login')
  login() {
    return 'abc'
  }
}
