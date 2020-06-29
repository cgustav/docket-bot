import { Provider } from '@nestjs/common';
import { BotClient } from './bot.client';

export const createDiscordProviders = (
  client: BotClient,
  providerName: string,
): Provider<any>[] => [
  {
    provide: providerName,
    useFactory: () => client,
  },
];
