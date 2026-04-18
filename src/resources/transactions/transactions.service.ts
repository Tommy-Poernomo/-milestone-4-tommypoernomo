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

  async withdraw(dto: CreateTransactionDto) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Cek saldo dengan pengecekan aman
      const account = await tx.account.findUnique({ where: { id: dto.accountId } });
      
      // Jika akun tidak ditemukan atau saldo kurang
      if (!account || account.balance < dto.amount) {
        throw new BadRequestException('Akun tidak ditemukan atau saldo tidak mencukupi');
      }

      // 2. Kurangi saldo
      await tx.account.update({
        where: { id: dto.accountId },
        data: { balance: { decrement: dto.amount } },
      });

      // 3. Catat transaksi
      return tx.transaction.create({
        data: {
          amount: dto.amount,
          type: 'WITHDRAW',
          accountId: dto.accountId,
        },
      });
    });
  }

  async findOne(id: number, userId: number) {
    return this.prisma.transaction.findFirst({
      where: { id, account: { userId } },
      include: { account: true },
    });
  }

  async transfer(dto: CreateTransactionDto, userId: number) {
    return this.prisma.$transaction(async (tx) => {
      // 1. Cek akun pengirim dan pastikan milik user yang login
      const sender = await tx.account.findFirst({ where: { id: dto.accountId, userId } });
      if (!sender || sender.balance < dto.amount) {
        throw new BadRequestException('Saldo tidak mencukupi atau akun pengirim tidak valid');
      }

      // 2. Cek akun penerima
      const receiver = await tx.account.findUnique({ where: { id: dto.toAccountId } });
      if (!receiver) {
        throw new BadRequestException('Akun penerima tidak ditemukan');
      }

      // 3. Kurangi saldo pengirim
      await tx.account.update({
        where: { id: dto.accountId },
        data: { balance: { decrement: dto.amount } },
      });

      // 4. Tambah saldo penerima
      await tx.account.update({
        where: { id: dto.toAccountId },
        data: { balance: { increment: dto.amount } },
      });

      // 5. Catat riwayat transaksi
      return tx.transaction.create({
        data: {
          amount: dto.amount,
          type: 'TRANSFER',
          accountId: dto.accountId,
          toAccountId: dto.toAccountId,
        },
      });
    });
  }
}