import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('register/student')
  registerStudent(@Body() registerDto: RegisterDto) {
    return this.authService.registerStudent(registerDto);
  }

  @Post('register/instructor')
  registerInstructor(@Body() registerDto: RegisterDto) {
    return this.authService.registerInstructor(registerDto);
  }

    @Post("register/admin")
registerAdmin(@Body() registerDto: RegisterDto) {
  return this.authService.registerAdmin(registerDto);
}

  @Post('login')
login(@Body() loginDto: LoginDto) {
  return this.authService.login(loginDto);
}

}