import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { DockerWebhookDTO } from './webhook.dto';
import { BotClient } from 'src/lib/discordia/bot.client';
import { DMChannel } from 'discord.js';
@Injectable()
export class WebhooksService {
  constructor(@Inject('Discordia') private discordBot: BotClient) {}
  async notifyDockerWebhook(webhookDTO: DockerWebhookDTO) {
    console.log('Received webhook data', webhookDTO);
    // let chan = this.discordBot.guilds.cache.get('').channels.add;
    // let weaita = await this.discordBot.channels.fetch(
    //   '726715193027199026',
    //   true,
    // );

    // weaita.
    //    this.discordBot.guilds.cache.get('').channels.cache.get('').
  }

  async testDockerWebhook(): Promise<string> {
    console.log('Test docker webhook');
    const guildId = '724963184305242145';
    const channelId = '726715193027199026';

    // let channel = await this.discordBot.channels.get;
    // let channel = this.discordBot.guilds.cache.get('').channels.cache.get('');
    try {
      let dm = new DMChannel(this.discordBot, {
        id: channelId,
      });

      let result = await dm.send('Se ha recibido un nuevo webhook');

      console.log('CHANNEL RESULT! ', result);
    } catch (error) {
      console.error('Webhook test failed: ', error);
      throw new InternalServerErrorException('Something happen');
    }
    return 'success';
  }
}
