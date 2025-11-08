// src/jwt.guard.ts
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // TRẢ VỀ TRỰC TIẾP KẾT QUẢ
    return (await super.canActivate(context)) as boolean;
  }
}