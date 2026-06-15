import { Body, Controller, Post } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';

@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @Post('create')
  createEnrollment(@Body() enrollmentDto: any) {
    return this.enrollmentService.createEnrollment(enrollmentDto);
  }
}