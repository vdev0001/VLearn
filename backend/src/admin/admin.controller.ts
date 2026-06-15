import { Controller, Param, Patch } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Patch('approve/:id')
  approveUser(@Param('id') id: string) {
    return this.adminService.approveUser(id);
  }
}