import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { AuthModule } from './resources/auth/auth.module';
import { UsersModule } from './resources/users/users.module';

@Global() // Membuat PrismaService bisa dipakai di mana saja
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),// Ini wajib agar ConfigService jalan
    AuthModule,
    UsersModule,
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}