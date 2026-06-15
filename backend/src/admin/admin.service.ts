import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async approveUser(userId: string) {
  return await this.prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      status: 'APPROVED',
    },
  });
}

}