import { Controller, Post, Get, Body, UseGuards, Request, Param, Patch, Delete, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('accounts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  // @Post()
  // create(@Request() req, @Body() dto: CreateAccountDto) {
  //   return this.accountsService.create(req.user.userId, dto);
  // }

  @Post()
  async create(@Request() req, @Body() createAccountDto: CreateAccountDto) {
    // req.user biasanya berisi { userId: ... } hasil dari JWT Strategy
    return this.accountsService.create(req.user.userId, createAccountDto);
  }

//   @Post()
// @HttpCode(HttpStatus.CREATED) // Memberitahu Swagger bahwa ini status 201
// async create(@Body() createAccountDto: CreateAccountDto) {
//   return this.accountsService.create(createAccountDto);
// }


  @Get()
  findAll(@Request() req) {
    return this.accountsService.findAll(req.user.userId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string, @Request() req) {
  //   return this.accountsService.findOne(+id, req.user.userId);
  // }

//   @Get(':id')
// async findOne(@Param('id') id: string) {
//   const account = await this.accountsService.findOne(+id);
//   if (!account) {
//     throw new NotFoundException(`Akun dengan ID ${id} tidak ditemukan`); // Otomatis 404
//   }
//   return account;
// }
@Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    return this.accountsService.findOne(+id, req.user.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CreateAccountDto, @Request() req) {
    return this.accountsService.update(+id, req.user.userId, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.accountsService.remove(+id, req.user.userId);
  }
}