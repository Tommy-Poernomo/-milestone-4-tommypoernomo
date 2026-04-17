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
}