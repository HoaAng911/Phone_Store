// src/jwt.guard.ts
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token không tồn tại');
    }

    try {
      const payload = this.jwtService.verify(token);
      
      // GÁN THẲNG VÀO REQ.USER – KHÔNG ĐỂ PASSPORT GHI ĐÈ!!!
      request.user = {
        userId: payload.sub?.toString() || payload.id?.toString(),
        email: payload.email,
        role: payload.role,
      };

      return true; // cho qua
    } catch (error) {
      throw new UnauthorizedException('Token không hợp lệ hoặc hết hạn');
    }
  }
}