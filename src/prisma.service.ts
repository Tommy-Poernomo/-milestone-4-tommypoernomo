import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    // const pool = new Pool({ 
    //     connectionString: process.env.DATABASE_URL 
    // });
    // GANTI baris connectionString di constructor dengan ini:
const pool = new Pool({ 
  connectionString: "postgresql://postgres.taqydafheznyvaorcily:admintommy-revobank@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true&pgprepare=false"
});
    const adapter = new PrismaPg(pool);
    
    // Inisialisasi dengan adapter
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ RevoBank: Database Connected with Adapter!');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}