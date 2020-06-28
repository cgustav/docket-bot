import { Controller, Inject, Get } from '@nestjs/common';
import { Client } from 'discord.js';

@Controller('bot')
export class BotController {
  constructor(@Inject('Discordia') private discordBot: Client) {}

  @Get('/')
  async sendMessage() {
    // const botChannel = this.discordBot.guilds
    //   .first()
    //   .channels.find('name', 'bot');
    //   const set =  this.discordBot.guilds.first.me
    // this.discordBot.

    this.discordBot.on('message', msg => {
      console.log('NEW MESSAGE ', msg);
      if (msg.content === 'ping') {
        msg.reply('Pong!');
      }
    });
  }
}
