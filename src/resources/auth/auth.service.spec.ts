import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../../prisma.service';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;

  // Mocking PrismaService agar tidak perlu koneksi DB sungguhan saat testing
  const mockPrisma = {
    user: {
      update: jest.fn().mockResolvedValue({ id: 1, name: 'Tommy Test', email: 'tommy@test.com' }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        // Mock dependensi lain yang diminta NestJS
        { provide: 'UsersRepository', useValue: {} }, 
        { provide: 'JwtService', useValue: {} },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should update user profile', async () => {
    const dto = { name: 'Tommy Test', email: 'tommy@test.com' };
    const result = await service.updateProfile(1, dto);
    
    expect(result.name).toBe('Tommy Test');
    expect(mockPrisma.user.update).toHaveBeenCalled();
  });
});