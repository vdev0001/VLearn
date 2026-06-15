import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EnrollmentService {
  constructor(private prisma: PrismaService) {}

  async createEnrollment(enrollmentDto: any) {
  return await this.prisma.enrollment.create({
    data: {
      studentId: enrollmentDto.studentId,
      courseId: enrollmentDto.courseId,
      instructorId: enrollmentDto.instructorId,
      videosWatched: 0,
      completed: false,
    },
  });
}

}