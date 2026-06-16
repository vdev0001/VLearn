import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllCourses() {
    return this.courseService.getAllCourses();
  }

  @UseGuards(JwtAuthGuard)
  @Get('instructor/:instructorId')
  getInstructorCourses(
    @Param('instructorId') instructorId: string,
  ) {
    return this.courseService.getInstructorCourses(instructorId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createCourse(@Body() courseDto: CreateCourseDto) {
    return this.courseService.createCourse(courseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteCourse(@Param('id') id: string) {
    return this.courseService.deleteCourse(id);
  }

  @UseGuards(JwtAuthGuard)
@Patch(':id')
updateCourse(
  @Param('id') id: string,
  @Body() courseDto: CreateCourseDto,
) {
  return this.courseService.updateCourse(id, courseDto);
}

}