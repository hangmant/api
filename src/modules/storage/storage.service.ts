import { Injectable, InternalServerErrorException } from '@nestjs/common'
import * as AWS from 'aws-sdk'
import { from, Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { config } from '../../config'
import { PresignedFields } from './types/presigned-fields.type'

const s3 = new AWS.S3()

AWS.config.update({
  accessKeyId: config.aws.s3.accessKeyId,
  secretAccessKey: config.aws.s3.secretAcessKey
})

@Injectable()
export class StorageService {
  constructor() {}

  // TODO: Solve error catching error here
  private async createPresignedPost({ key, contentType }: PresignedFields): Promise<AWS.S3.PresignedPost> {
    const params: AWS.S3.PresignedPost.Params = {
      Expires: config.aws.s3.hangmanBucket.expires,
      Bucket: config.aws.s3.hangmanBucket.name,
      Conditions: [['content-length-range', 100, 10000000]], // 100Byte - 10MB
      Fields: {
        'Content-Type': contentType,
        key
      }
    }

    return new Promise((resolve, reject) => {
      s3.createPresignedPost(params, (err, data) => {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    })
  }

  getPresignedPostData(presignedReq: PresignedFields): Observable<AWS.S3.PresignedPost> {
    return from(this.createPresignedPost(presignedReq)).pipe(
      catchError(error => {
        return throwError(new InternalServerErrorException(error.message))
      })
    )
  }
}
