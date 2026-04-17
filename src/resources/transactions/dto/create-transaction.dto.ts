import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  accountId: number;

  @IsString()
  @IsOptional()
  toAccountNumber?: string; // Khusus untuk transfer
}