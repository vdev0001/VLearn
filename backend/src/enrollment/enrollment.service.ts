import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EnrollmentService {
  constructor(private prisma: PrismaService) {}

  async getStudentEnrollments(studentId: string) {
  return await this.prisma.enrollment.findMany({
    where: {
      studentId,
    },
  });
}

async createEnrollment(enrollmentDto: any) {
  const existingEnrollment = await this.prisma.enrollment.findFirst({
    where: {
      studentId: enrollmentDto.studentId,
      courseId: enrollmentDto.courseId,
    },
  });

  if (existingEnrollment) {
    throw new BadRequestException("Student is already enrolled in this course");
  }

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

async updateProgress(
  enrollmentId: string,
  videosWatched: number,
) {
  return await this.prisma.enrollment.update({
    where: {
      id: enrollmentId,
    },
    data: {
      videosWatched,
    },
  });
}

async markCompleted(enrollmentId: string) {
  return await this.prisma.enrollment.update({
    where: {
      id: enrollmentId,
    },
    data: {
      completed: true,
    },
  });
}

}