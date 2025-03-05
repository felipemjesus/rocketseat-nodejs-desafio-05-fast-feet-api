import { Controller, Get } from '@nestjs/common'
import { Public } from '@/infra/auth/public'

@Controller('/')
@Public()
export class IndexController {
  @Get()
  async handle() {
    return {
      message: 'Hello World',
    }
  }
}
