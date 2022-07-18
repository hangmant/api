import { IsMimeType, IsNotEmpty, IsString } from 'class-validator';

export class ReqPresignedPostDto {
  @IsNotEmpty()
  @IsMimeType()
  @IsString()
  contentType: string;

  @IsNotEmpty()
  @IsString()
  key: string;
}
