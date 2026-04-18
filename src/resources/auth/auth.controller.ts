import { Controller, Post, Get, Body, UseGuards, Request, Patch } from '@nestjs/common'; // Tambahkan Patch
import { AuthService } from './auth.service';
import { RegisterDto } from '../accounts/dto/register.dto';
import { LoginDto } from '../accounts/dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard'; 
import { UpdateUserDto } from './dto/update-user.dto'; // Tambahkan impor DTO

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto);
    
    // Destructuring agar password tidak ikut dikirim ke client
    const { password, ...result } = user;
    
    return {
      message: 'Registrasi Berhasil',
      data: result,
    };
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  updateProfile(@Request() req, @Body() updateDto: UpdateUserDto) {
    return this.authService.updateProfile(req.user.userId, updateDto);
  }
}