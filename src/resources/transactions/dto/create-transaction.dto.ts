import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  amount!: number;

  @IsNumber()
  @IsNotEmpty()
  accountId!: number; // Akun pengirim

  @IsString()
  @IsOptional()
  toAccountNumber?: string; // Khusus untuk transfer
  toAccountId?: number; // Akun penerima
}