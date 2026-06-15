import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async sendMessage(messageDto: any) {
  return await this.prisma.message.create({
    data: {
      senderId: messageDto.senderId,
      receiverId: messageDto.receiverId,
      message: messageDto.message,
    },
  });
}

async getConversation(senderId: string, receiverId: string) {
  return await this.prisma.message.findMany({
    where: {
      OR: [
        {
          senderId,
          receiverId,
        },
        {
          senderId: receiverId,
          receiverId: senderId,
        },
      ],
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
}

}