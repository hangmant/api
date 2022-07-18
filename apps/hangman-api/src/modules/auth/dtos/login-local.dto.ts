import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginLocalDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'username or email of the user',
    example: 'dante@example.com',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'user password', example: 'secure-pass' })
  password: string;
}
