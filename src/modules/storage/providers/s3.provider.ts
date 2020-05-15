import { Injectable, Provider } from '@nestjs/common'
import * as AWS from 'aws-sdk'
import { S3_PROVIDER } from '../storage.constants'
import { config } from '../../../config'

export const S3Provider: Provider = {
  provide: S3_PROVIDER,
  useFactory() {
    return new AWS.S3({
      accessKeyId: config.aws.s3.accessKeyId,
      secretAccessKey: config.aws.s3.secretAcessKey,
      signatureVersion: 'v4',
      region: 'us-east-1'
    })
  }
}
