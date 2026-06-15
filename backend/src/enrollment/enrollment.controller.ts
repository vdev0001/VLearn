import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Get('student/:studentId')
getStudentEnrollments(@Param('studentId') studentId: string) {
  return this.enrollmentService.getStudentEnrollments(studentId);
}

  @Post('create')
  createEnrollment(@Body() enrollmentDto: any) {
    return this.enrollmentService.createEnrollment(enrollmentDto);
  }
}