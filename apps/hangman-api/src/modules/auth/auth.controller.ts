import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginLocalDto } from './dtos/login-local.dto';
import { ResLoginLocal } from './dtos/res-login-local.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: HttpStatus.CREATED, type: ResLoginLocal })
  @HttpCode(HttpStatus.CREATED)
  @Post('login/jwt')
  login(@Body() userCredentials: LoginLocalDto) {
    return this.authService.login(userCredentials);
  }

  // @UseGuards(AuthGuard())
  // @Get('profile')
  // profile() {
  //   return 'You are in your profile'
  // }

  // @UseGuards(AuthGuard('google'))
  // @Get('login/google')
  // loginGoogle() {
  //   return 'Login with google'
  // }

  // @Get('callback/google')
  // googleCallback() {
  //   return 'Callback Google'
  // }

  // @Get('login/facebook')
  // loginFacebook() {
  //   return 'Login with Facebook'
  // }

  // @Get('login/github')
  // loginGithub() {
  //   return 'Login with Github'
  // }
}
