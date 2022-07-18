import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JWTOptions implements JwtOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    const jwtOptions = this.configService.get('jwt');
    return {
      secret: jwtOptions.secret,
      signOptions: {
        expiresIn: jwtOptions.expiresIn,
      },
    };
  }
}
