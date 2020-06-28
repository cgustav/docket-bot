import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { DiscordiaModule } from 'src/lib/discordia/discordia.module';
import { HealthMessageListener } from './health.message-listener';

@Module({
  controllers: [HealthController],
  providers: [HealthService],
  imports: [DiscordiaModule.forFeature({ listeners: [HealthMessageListener] })],
})
export class HealthModule {}
