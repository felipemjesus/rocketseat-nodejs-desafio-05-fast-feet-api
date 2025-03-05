import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { StorageModule } from '../storage/storage.module'
import { IndexController } from './controllers/index.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [IndexController],
  providers: [],
})
export class HttpModule {}
