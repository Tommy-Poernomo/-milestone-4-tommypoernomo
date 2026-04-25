import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
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
    // return this.prisma.account.findFirst({ where: { id, userId } });
    const account = await this.prisma.account.findFirst({ where: { id, userId } });
    
    // Tambahkan Exception agar klien dapat respons 404
    if (!account) {
      throw new NotFoundException(`Akun dengan ID ${id} tidak ditemukan`);
    }
    return account;
  }

  

  async update(id: number, userId: number, dto: CreateAccountDto) {
    // return this.prisma.account.updateMany({
    //   where: { id, userId },
    //   data: { accountNumber: dto.accountNumber },
    // });
    // Cek dulu apakah akun ada & milik user
    const account = await this.findOne(id, userId); // Panggil findOne yang baru saja kita perbaiki
    
    return this.prisma.account.update({
      where: { id: account.id },
      data: { accountNumber: dto.accountNumber },
    });
  }

  async remove(id: number, userId: number) {
    // return this.prisma.account.deleteMany({ where: { id, userId } });
    // Cek dulu apakah ada
    await this.findOne(id, userId);
    
    return this.prisma.account.delete({ 
      where: { id } 
    });
  }
}