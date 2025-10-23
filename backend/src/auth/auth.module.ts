import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule,JwtModuleOptions } from '@nestjs/jwt';
import { config } from 'dotenv';

@Module({
  imports:[UserModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: (config:ConfigService)=>({
      secret:config.get<string>('JWT_SECRET'),
      signOptions:{expiresIn:config.get<string>('JWT_EXPIRES') as any}
      })
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
