import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('login/local')
  login(/* @Request() req */) {
    return null
    // return this.authService.login(req.user)
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
