import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common'
import * as AWS from 'aws-sdk'
import { from, Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { config } from '../../config'
import { S3_PROVIDER } from './storage.constants'
import { PresignedFields } from './types/presigned-fields.type'

@Injectable()
export class StorageService {
  constructor(@Inject(S3_PROVIDER) private readonly s3: AWS.S3) {}

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
      this.s3.createPresignedPost(params, (err, data) => {
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
