import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
 constructor(private prisma: PrismaService,private jwtService: JwtService,) {}


async registerStudent(registerDto: RegisterDto) {
  const hashedPassword = await bcrypt.hash(registerDto.password, 10);
  const user = await this.prisma.user.create({
    data: {
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
      role: 'STUDENT',
      status: 'PENDING',
    },
  });

  return user;
}

 async registerInstructor(registerDto: RegisterDto) {
  const hashedPassword = await bcrypt.hash(registerDto.password, 10);

  const user = await this.prisma.user.create({
    data: {
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
      role: 'INSTRUCTOR',
      status: 'PENDING',
    },
  });

  return user;
}

async login(loginDto: any) {
  const user = await this.prisma.user.findUnique({
    where: {
      email: loginDto.email,
    },
  });

  if (!user) {
    return {
      message: 'User not found',
    };
  }

  const isPasswordValid = await bcrypt.compare(
    loginDto.password,
    user.password,
  );

  if (!isPasswordValid) {
    return {
      message: 'Invalid password',
    };
  }

  if (user.status !== 'APPROVED') {
    return {
      message: 'Your account is pending admin approval.',
    };
  }

  const token = this.jwtService.sign({
  userId: user.id,
  email: user.email,
  role: user.role,
});

return {
  message: 'Login successful',
  accessToken: token,
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  },

};
}
}