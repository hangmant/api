import { ApiProperty } from '@nestjs/swagger'

export class ResLoginLocal {
  @ApiProperty({
    description: 'JWT for authentication',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZWFhNWM1ZjM2ZTVhMDViZjQwNTRiMTYiLCJmdWxsTmFtZSI6IkRhbnRlIENhbGRlcm9uIiwiZW1haWwiOiJjYWxkZXJvbkBnbWFpbC5jb20iLCJpYXQiOjE1ODgyOTE0NTAsImV4cCI6MTU4ODM3Nzg1MH0.Is0Vqg7taho8a0bObkRDclFUKQVREO1UR9P52DT94a8'
  })
  token: string
}
