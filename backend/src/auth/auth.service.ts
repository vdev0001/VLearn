import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
 constructor(private prisma: PrismaService) {}


async registerStudent(registerDto: any) {
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

 async registerInstructor(registerDto: any) {
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
}