import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async deposit(dto: CreateTransactionDto) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Tambah saldo di akun
      await tx.account.update({
        where: { id: dto.accountId },
        data: { balance: { increment: dto.amount } },
      });

      // 2. Catat riwayat transaksi
      return tx.transaction.create({
        data: {
          amount: dto.amount,
          type: 'DEPOSIT',
          accountId: dto.accountId,
        },
      });
    });
  }

  async findAll(userId: number) {
    return this.prisma.transaction.findMany({
      where: { account: { userId } },
      include: { account: true },
    });
  }
}