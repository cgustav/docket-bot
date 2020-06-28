import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscordModule } from 'nest-discord-module';
import { BotController } from './bot.controller';
import { DiscordiaModule } from './lib/discordia/discordia.module';
import { PingListener } from './bot.listener';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    DiscordiaModule.register({
      clientToken: process.env.BOT_SECRET,
      options: {
        controllers: [BotController],
        listeners: [PingListener],
      },
    }),
    HealthModule,
  ],
  controllers: [AppController, BotController],
  providers: [AppService],
})
export class AppModule {}
