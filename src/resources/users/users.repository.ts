import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  // Contoh menggunakan ORM
  // async findOne(id: number) {
  //   return this.prisma.user.findUnique({ where: { id } });
  // }

  // Contoh Raw Query (sesuai instruksi branch users-sql-pg)
  // async findAllRaw() {
  //   return this.prisma.$queryRaw`SELECT * FROM "User"`;
  // }
  async create(data: any) {
    return this.prisma.user.create({ data });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}