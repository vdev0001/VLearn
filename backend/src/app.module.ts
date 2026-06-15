import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { CourseModule } from './course/course.module';
import { EnrollmentModule } from './enrollment/enrollment.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [PrismaModule, AuthModule, AdminModule, CourseModule, EnrollmentModule, MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
