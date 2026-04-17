import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  // constructor() {
  //   // Di Prisma 7, kita harus memasukkan konfigurasi secara eksplisit di super()
  //   super({
  //     datasources: {
  //       db: {
  //         url: process.env.DATABASE_URL,
  //       },
  //     },
  //   });
  // }

  // constructor() {
  //   super({
  //     // Di Prisma 7, gunakan datasourceUrl (tanpa objek bersarang)
  //     datasourceUrl: process.env.DATABASE_URL,
  //   });
  // }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}