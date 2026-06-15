import { Body, Controller,Get, Post ,UseGuards} from '@nestjs/common';
import { CourseService } from './course.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';


@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
getAllCourses() {
  return this.courseService.getAllCourses();
}

  @Post('create')
  createCourse(@Body() courseDto: any) {
    return this.courseService.createCourse(courseDto);
  }
}