import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller'; // Ini mengimpor dari file sebelah
import { UsersRepository } from './users.repository';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PrismaService],
  exports: [UsersService], // Export jika modul lain butuh data user
})
export class UsersModule {}