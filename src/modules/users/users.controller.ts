import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiResponse } from '@nestjs/swagger'
import { CurrentUserRest } from '../../decorators/currentUserRest.decorator'
import { User } from './models/user.model'
import { UsersService } from './users.service'
import { JwtAuthUser } from '../auth/interfaces/jwt-auth-user.interface'
import { Observable, from } from 'rxjs'

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Get('me')
  me(@CurrentUserRest() user: JwtAuthUser): Observable<User> {
    return this.usersService.findById(user._id, '-password')
  }
}
