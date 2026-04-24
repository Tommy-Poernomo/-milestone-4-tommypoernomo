import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  accountNumber!: string; // Tambahkan ! di sini
  balance!: number;       // Tambahkan ! di sini
}