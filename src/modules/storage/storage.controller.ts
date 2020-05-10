import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiResponse } from '@nestjs/swagger'
import { ReqPresignedPostDto } from './dto/req-presigned-post.dto'
import { StorageService } from './storage.service'

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @ApiResponse({ status: HttpStatus.CREATED })
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Post('token')
  token(@Body() fileInfo: ReqPresignedPostDto) {
    console.log('Dante: StorageController -> token -> fileInfo', fileInfo)
    return this.storageService.getPresignedPostData(fileInfo)
  }
}
