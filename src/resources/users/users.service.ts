import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepo: UsersRepository) {}

//   async getProfile(id: number) {
//     return this.usersRepo.findById(id);
//   }
async findOne(id: number) {
    return this.usersRepo.findById(id);
  }
}