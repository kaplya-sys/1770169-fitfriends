import {Injectable, OnModuleDestroy, OnModuleInit} from '@nestjs/common';

import {PrismaClient} from './generated/prisma/client';

@Injectable()
export class PrismaClientService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error']
    });
  }

  async onModuleInit() {
      await this.$connect();
  }

  async onModuleDestroy() {
      await this.$disconnect();
  }
}
