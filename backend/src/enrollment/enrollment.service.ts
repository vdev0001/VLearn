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

async getInstructorEnrollments(instructorId: string) {
  return await this.prisma.enrollment.findMany({
    where: {
      instructorId,
    },
  });
}

async getAllEnrollments() {
  return await this.prisma.enrollment.findMany();
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
  const enrollment = await this.prisma.enrollment.findUnique({
    where: { id: enrollmentId },
  });

  if (!enrollment) {
    throw new BadRequestException("Enrollment not found");
  }

  const course = await this.prisma.course.findUnique({
    where: { id: enrollment.courseId },
  });

  return await this.prisma.enrollment.update({
    where: {
      id: enrollmentId,
    },
    data: {
      completed: true,
      videosWatched: course?.totalVideos || enrollment.videosWatched,
    },
  });
}
}