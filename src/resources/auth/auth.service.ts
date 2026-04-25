import { BadRequestException, Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto'; // Tambah ini
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; // Tambah ini
import { PrismaService } from '../../prisma.service'; // Sesuaikan path-nya
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersRepo: UsersRepository,
    private jwtService: JwtService, 
    private prisma: PrismaService
  ) {}

  async register(dto: RegisterDto) {
    const userExist = await this.usersRepo.findByEmail(dto.email);
    if (userExist) throw new BadRequestException('Email sudah terdaftar');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.usersRepo.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });
  }

  async login(dto: LoginDto) {
    // 1. Cari user berdasarkan email
    const user = await this.usersRepo.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Email atau password salah');

    // 2. Cek password
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Email atau password salah');

    // 3. Buat Payload & Token
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

    async updateProfile(userId: number, updateDto: UpdateUserDto) {
    // return this.prisma.user.update({
    //   where: { id: userId },
    //   data: updateDto,
    //   select: { id: true, email: true, name: true },// Jangan kembalikan password
    // });
    try {
      return await this.prisma.user.update({
        where: { id: userId },
        data: updateDto,
        select: { id: true, email: true, name: true },
      });
    } catch (error) {
      // Jika Prisma gagal update (misal ID tidak ditemukan), beri respons 404
      throw new NotFoundException('User tidak ditemukan');
    }
  }
}