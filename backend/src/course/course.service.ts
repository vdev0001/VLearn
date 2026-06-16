import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async createCourse(courseDto: any) {
  return await this.prisma.course.create({
    data: {
      title: courseDto.title,
      description: courseDto.description,
      youtubePlaylistUrl: courseDto.youtubePlaylistUrl,
      totalVideos: courseDto.totalVideos,
      instructorId: courseDto.instructorId
    },
  });
}

async getInstructorCourses(instructorId: string) {
  return await this.prisma.course.findMany({
    where: {
      instructorId,
    },
  });
}

async getAllCourses() {
  return await this.prisma.course.findMany();
}

}