import { Body, Controller,Get, Post } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
getAllCourses() {
  return this.courseService.getAllCourses();
}

  @Post('create')
  createCourse(@Body() courseDto: any) {
    return this.courseService.createCourse(courseDto);
  }
}