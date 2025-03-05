import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module'

@Module({
  imports: [EnvModule],
  providers: [],
  exports: [],
})
export class StorageModule {}
