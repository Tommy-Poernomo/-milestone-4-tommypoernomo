import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Contoh endpoint untuk cek profil (nanti kita pakai JWT Guard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}