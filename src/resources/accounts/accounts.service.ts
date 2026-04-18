import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateAccountDto) {
    return this.prisma.account.create({
      data: {
        accountNumber: dto.accountNumber,
        userId: userId,
        balance: 0, // Saldo awal 0
      },
    });
  }

  async findAll(userId: number) {
    return this.prisma.account.findMany({
      where: { userId },
    });
  }

  async findOne(id: number, userId: number) {
    return this.prisma.account.findFirst({ where: { id, userId } });
  }

  async update(id: number, userId: number, dto: CreateAccountDto) {
    return this.prisma.account.updateMany({
      where: { id, userId },
      data: { accountNumber: dto.accountNumber },
    });
  }

  async remove(id: number, userId: number) {
    return this.prisma.account.deleteMany({ where: { id, userId } });
  }
}