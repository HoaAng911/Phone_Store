import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable() // NestJS có thể inject service này ở các module khác
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    // Lấy secret từ file .env thông qua ConfigService
    const secret = config.get<string>('JWT_SECRET')!; // ! ép TypeScript không báo undefined

    super({
      // Cấu hình strategy JWT
      // Lấy token từ header Authorization kiểu "Bearer <token>"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // Secret key để giải mã JWT
      secretOrKey: secret,
    });
  }

  // Hàm validate sẽ được Passport gọi sau khi giải mã JWT thành công
  // payload là dữ liệu bên trong token (thường chứa userId, email, role, ...)
  // Object trả về ở đây sẽ được attach vào request.user
  async validate(payload: any) {
    // Trả về một object user tối giản
    return {
      userId: payload.sub,  // sub là userId theo chuẩn JWT
      email: payload.email,  // email của user
      role: payload.role,    // role của user, ví dụ 'admin' hay 'user'
    };
  }
}
