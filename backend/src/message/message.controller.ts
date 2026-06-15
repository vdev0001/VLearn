import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('conversation/:senderId/:receiverId')
getConversation(
  @Param('senderId') senderId: string,
  @Param('receiverId') receiverId: string,
) {
  return this.messageService.getConversation(senderId, receiverId);
}

  @Post('send')
  sendMessage(@Body() messageDto: any) {
    return this.messageService.sendMessage(messageDto);
  }
}