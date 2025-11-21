// src/jwt.strategy.ts
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./user/entity/user.entity";
import { isUUID } from "validator";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    config: ConfigService,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET')!,
    });
  }
  async validate(payload: any) {

    const userId = payload.sub;

     if (!isUUID(userId)) {   // <-- sửa chỗ này
    throw new UnauthorizedException('Token không hợp lệ');
  }
    const user = await this.userRepo.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User không tồn tại!');
    }

    return {
      userId: user.id,           // Dòng này cứu cả thế giới
      id: user.id,               // thêm cho chắc
      sub: user.id,
      email: user.email,
      role: user.role,
      username: user.username,
    };
  }


}
