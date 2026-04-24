import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { AuthModule } from './resources/auth/auth.module';
import { UsersModule } from './resources/users/users.module';
import { AccountsModule } from './resources/accounts/accounts.module';
import { TransactionsModule } from './resources/transactions/transactions.module';

@Global() // Membuat PrismaService bisa dipakai di mana saja
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),// Ini wajib agar ConfigService jalan Sangat penting: membuat env bisa diakses di seluruh app
    AuthModule,
    UsersModule,
    AccountsModule,
    TransactionsModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}