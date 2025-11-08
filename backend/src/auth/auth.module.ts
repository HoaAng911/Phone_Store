import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule,JwtModuleOptions } from '@nestjs/jwt';
import { config } from 'dotenv';
import { JWTStrategy } from 'src/jwt.strategy';
import { JwtAuthGuard } from 'src/jwt.guard';
import { RolesGuard } from 'src/roles.guard';

@Module({
  imports:[
    forwardRef(() => UserModule),
    PassportModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: (config:ConfigService)=>({
      secret:config.get<string>('JWT_SECRET'),
      signOptions:{expiresIn:config.get<string>('JWT_EXPIRES') as any}
      })
    }),
  ],
  providers: [AuthService,JWTStrategy,JwtAuthGuard,RolesGuard  ],
  controllers: [AuthController],
  exports: [JwtAuthGuard, RolesGuard,JWTStrategy],
})
export class AuthModule {}
