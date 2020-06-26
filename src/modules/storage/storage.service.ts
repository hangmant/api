import { Inject, Injectable } from '@nestjs/common'
import * as AWS from 'aws-sdk'
import { config } from '../../config'
import { S3_PROVIDER } from './storage.constants'
import { ResSignedUrlDto } from './dto/res-signed-url.dto'
import { ObjectList } from 'aws-sdk/clients/s3'

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

  async getAllKeys() {
    let res: AWS.S3.ListObjectsV2Output
    const allObjects: ObjectList = []

    do {
      res = await this.s3
        .listObjectsV2({
          Bucket: hangmanBucket.name,
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
      Bucket: hangmanBucket.name,
      Delete: {
        Objects: keys.map(key => ({ Key: key }))
      }
    })
  }
}
