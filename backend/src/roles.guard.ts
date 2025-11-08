// src/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // LẤY TỪ CLASS TRƯỚC, SAU ĐÓ METHOD → ĐÚNG THỨ TỰ NESTJS
    const roles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),   // method
      context.getClass(),     // class
    ]);

    if (!roles?.length) return true;

    const user = context.switchToHttp().getRequest().user;
    console.log('RolesGuard → user:', user); // DEBUG

    return user && roles.includes(user.role);
  }
}