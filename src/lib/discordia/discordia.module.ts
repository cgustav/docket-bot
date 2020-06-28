import { Module, DynamicModule, Inject } from '@nestjs/common';
import { Client } from 'discord.js';
import { createDiscordProviders } from './providers';
import { DiscordClientEvent } from './types/events';
// import { ConfigModule, registerAs } from '@nestjs/config';
// import { config } from 'dotenv/types';
// // import { createDiscordProviders } from './discord.providers';
// // import { DiscordModuleRegisterOptions } from './interaces/discord-module-register-options';
// // import { getPreferedTimeoutDuration } from './discord.utils';
// // import {
// //   safeGetControllersFromOptions,
// //   getPreferedProviderName,
// // } from './discord.utils';r

interface DiscordiaRegisterClientParams {
  clientToken: string;
  options: RegisterClientOptions;
}

interface RegisterClientOptions {
  /**
   * @optional
   * Change the duration (in seconds) within the module say stop
   * (prevent app to be blocked when discord API is down)
   * default 30 seconds
   */
  timeoutDurationInSeconds?: number;
  /**
   * @optional
   * A list of event to bind
   */
  listeners?: ClientListener[];
  /**
   * @optional
   * A list of controller to be instanciated
   */
  controllers?: any[];
}

interface ClientListener {
  eventName: any;
  handler: (any) => void;
}

// const dbs = registerAs('discordia', () => ({
// //   host: process.env.DATABASE_HOST,
// //   port: process.env.DATABASE_PORT || 5432,
// client:

// }));

class DiscordClient {
  client: Client = new Client();
}

abstract class DiscordClientSingleton {
  static instance = new DiscordClient();
}

@Module({
  //   imports: [ConfigModule.forFeature(dbs)],
})
export class DiscordiaModule {
  static forFeature(options: RegisterClientOptions): DynamicModule {
    try {
      let client: Client = DiscordClientSingleton.instance.client;

      if (options && options.listeners.length)
        options.listeners.map(listener => {
          console.log('Adding listeners from ForFeature');
          const { eventName, handler } = listener;
          client.on(eventName, handler);
        });

      //   return new Promise((resolve, reject) => {
      //     if (reject) reject('Some error');
      //     return resolve({
      //       controllers: options.controllers || [],
      //       module: DiscordiaModule,
      //       // providers,
      //       // exports: providers,
      //     });
      //   });

      const pseudo = 'Discordia';
      const providers = createDiscordProviders(client, pseudo);

      return {
        // controllers: options.controllers || [],
        module: DiscordiaModule,
        providers,
        exports: providers,
      };
    } catch (error) {
      console.log('Damn bruh!', error);
    }
  }

  static async register({
    clientToken,
    options,
  }: DiscordiaRegisterClientParams): Promise<DynamicModule> {
    const { listeners } = options;

    if (!clientToken.length)
      throw new Error(
        'Bad argument for register method, expected token to be a valid string. Is the token good?',
      );

    return new Promise((resolve, reject) => {
      const preferedTimeout = getPreferedTimeoutDuration(options);
      const timeout = setTimeout(
        () => reject('Cannot stablish connection with the Discord API'),
        preferedTimeout,
      );

      const client = (DiscordClientSingleton.instance.client = new Client());

      client.login(clientToken).catch(error => {
        throw new Error(error.message + ', Cannot Log-in on Discord API');
      });

      client.on('error', error => {
        throw new Error(error.message + ', Ups. Something happen.');
      });

      client.on('ready', () => {
        clearTimeout(timeout);

        if (options && listeners.length) {
          console.log('Adding listeners from Registry');
          listeners.map(listener => {
            const { eventName, handler } = listener;
            client.on(eventName, handler);
          });
        }

        const pseudo = 'Discordia';
        const providers = createDiscordProviders(client, pseudo);

        return resolve({
          controllers: options.controllers || [],
          module: DiscordiaModule,
          providers,
          exports: providers,
        });
      });
    });
  }
}

export const getPreferedTimeoutDuration = (options?: RegisterClientOptions) =>
  options && options.timeoutDurationInSeconds
    ? options.timeoutDurationInSeconds * 1000
    : 10000;
