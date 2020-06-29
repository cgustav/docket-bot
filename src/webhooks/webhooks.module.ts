import { Module } from '@nestjs/common';
import { WebhooksService } from './webhooks.service';
import { WebhooksController } from './webhooks.controller';
import { DiscordiaModule } from 'src/lib/discordia/discordia.module';

@Module({
  providers: [WebhooksService],
  controllers: [WebhooksController],
  imports: [
    DiscordiaModule,

    // .forFeature({
    // controllers: [WebhooksController],
    // }),
  ],
})
export class WebhooksModule {}
