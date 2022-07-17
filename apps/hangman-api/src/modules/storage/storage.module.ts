import { Module } from '@nestjs/common'
import { StorageService } from './storage.service'
import { StorageController } from './storage.controller'
import { S3Provider } from './providers/s3.provider'

@Module({
  controllers: [StorageController],
  providers: [S3Provider, StorageService]
})
export class StorageModule {}
