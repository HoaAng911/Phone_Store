import { Body, Controller, Get, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/jwt.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
@Controller('auth')
export class AuthController {
constructor(private authService:AuthService){}
@Post('register')
register(@Body()dto:RegisterDto){
  return this.authService.register(dto)
}
@Post('login')
Login(@Body()dto:LoginDto){
  return this.authService.login(dto.email,dto.password)
}
// Xem profile phai login
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@Request()req){
    //  res.user duoc jwtstrategy validate
    return this.authService.getProfile(req.user.userId)
}
@UseGuards(JwtAuthGuard)
@Put('profile')
updateProfile(@Request()req,@Body()dto:UpdateProfileDto){
  return this.authService.updateProfile(req.user.userId,dto)
}
}