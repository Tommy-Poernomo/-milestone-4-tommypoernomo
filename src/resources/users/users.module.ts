import { Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Module({
  providers: [UsersRepository],
  exports: [UsersRepository], // Agar bisa dipakai di AuthModule nanti
})
export class UsersModule {}