import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { ResSignedUrlDto } from './dto/res-signed-url.dto';
import { S3_PROVIDER } from './storage.constants';

@Injectable()
export class StorageService {
  private readonly hangmanBucket;
  constructor(
    readonly configService: ConfigService,
    @Inject(S3_PROVIDER) private readonly s3: AWS.S3,
  ) {
    this.hangmanBucket = configService.get('aws.s3.hangmanBucket');
  }

  async createSignedUrl(key: string, type: string): Promise<ResSignedUrlDto> {
    const params = {
      Bucket: this.hangmanBucket.name,
      Key: key,
      Expires: this.hangmanBucket.expires,
      ContentType: type,
      ACL: 'public-read',
    };

    const signedUrl = await this.s3.getSignedUrlPromise('putObject', params);

    return {
      url: signedUrl,
    };
  }
}
