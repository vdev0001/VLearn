import { Body, Controller, Get, Param,Patch, Post } from '@nestjs/common';
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

  @Patch('progress/:id')
updateProgress(
  @Param('id') id: string,
  @Body() body: { videosWatched: number },
) {
  return this.enrollmentService.updateProgress(
    id,
    body.videosWatched,
  );
}

@Patch('complete/:id')
markCompleted(@Param('id') id: string) {
  return this.enrollmentService.markCompleted(id);
}

}