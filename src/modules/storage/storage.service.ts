import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as AWS from 'aws-sdk'
import { ObjectList } from 'aws-sdk/clients/s3'
import { ResSignedUrlDto } from './dto/res-signed-url.dto'
import { S3_PROVIDER } from './storage.constants'

@Injectable()
export class StorageService {
  private readonly hangmanBucket
  constructor(readonly configService: ConfigService, @Inject(S3_PROVIDER) private readonly s3: AWS.S3) {
    this.hangmanBucket = configService.get('aws.s3.hangmanBucket')
  }

  async createSignedUrl(key: string, type: string): Promise<ResSignedUrlDto> {
    const params = {
      Bucket: this.hangmanBucket.name,
      Key: key,
      Expires: this.hangmanBucket.expires,
      ContentType: type,
      ACL: 'public-read'
    }

    const signedUrl = await this.s3.getSignedUrlPromise('putObject', params)

    return {
      url: signedUrl
    }
  }

  async getAllKeys() {
    let res: AWS.S3.ListObjectsV2Output
    const allObjects: ObjectList = []

    do {
      res = await this.s3
        .listObjectsV2({
          Bucket: this.hangmanBucket.name,
          MaxKeys: 1,
          ...(res && res.NextContinuationToken ? { ContinuationToken: res.NextContinuationToken } : {})
        })
        .promise()

      allObjects.push.apply(allObjects, res.Contents)
    } while (res && res.IsTruncated)

    return allObjects
  }

  async deleteObjectsByKey(keys: string[]) {
    return await this.s3.deleteObjects({
      Bucket: this.hangmanBucket.name,
      Delete: {
        Objects: keys.map(key => ({ Key: key }))
      }
    })
  }
}
