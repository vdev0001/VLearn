import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
 constructor(private prisma: PrismaService) {}


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

  return {
    message: 'Login successful',
    user,
  };
}
}