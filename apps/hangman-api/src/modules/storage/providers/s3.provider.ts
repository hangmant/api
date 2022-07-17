import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as AWS from 'aws-sdk'
import { S3_PROVIDER } from '../storage.constants'

export const S3Provider: Provider = {
  provide: S3_PROVIDER,
  useFactory(configService: ConfigService) {
    const s3Config = configService.get('aws.s3')
    return new AWS.S3({
      accessKeyId: s3Config.accessKeyId,
      secretAccessKey: s3Config.secretAcessKey,
      signatureVersion: 'v4',
      region: 'us-east-1'
    })
  },
  inject: [ConfigService]
}
