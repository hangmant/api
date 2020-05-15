import { Inject, Injectable } from '@nestjs/common'
import * as AWS from 'aws-sdk'
import { config } from '../../config'
import { S3_PROVIDER } from './storage.constants'

const { hangmanBucket } = config.aws.s3

@Injectable()
export class StorageService {
  constructor(@Inject(S3_PROVIDER) private readonly s3: AWS.S3) {}

  async createSignedUrl(key: string, type: string): Promise<ResSignedUrlDto> {
    const params = {
      Bucket: hangmanBucket.name,
      Key: key,
      Expires: hangmanBucket.expires,
      ContentType: type,
      ACL: 'public-read'
    }

    const signedUrl = await this.s3.getSignedUrlPromise('putObject', params)

    return {
      url: signedUrl
    }
  }
}
