import { Module, DynamicModule } from '@nestjs/common';
import { Client } from 'discord.js';
import { createDiscordProviders } from './providers';
import {
  RegisterClientOptions,
  DiscordiaRegisterClientParams,
} from './types/client';
import { BotClient } from './bot.client';

class DiscordClient {
  secretToken: string;
  client?: Client;
  optionParams: RegisterClientOptions = {
    controllers: [],
    listeners: [],
    timeoutDurationInSeconds: 10000,
  };
}

abstract class DiscordClientSingleton {
  static instance = new DiscordClient();
}

@Module({})
export class DiscordiaModule {
  private static pseudo = 'Discordia';

  static resolveClient(): any /*Promise<BotClient>*/ /*BotClient*/ {
    let { client, secretToken } = DiscordClientSingleton.instance;

    if (!client && secretToken) {
    }
    // if (!singleton.client)
    //   DiscordClientSingleton.instance.client = new Client();
  }

  private static async signInClient(
    clientToken: string,
    options?: RegisterClientOptions,
  ): Promise<BotClient> {
    return new Promise((resolve, reject) => {
      let client = new BotClient();

      client.login(clientToken).catch(error => {
        throw new Error(error.message + ', Cannot Log-in on Discord API');
      });

      client.on('error', error => {
        throw new Error(error.message + ', Ups. Something happen.');
      });

      client.on('ready', () => {
        console.log('Discord client ready');
        if (options && options.listeners)
          // options.listeners.forEach(listener => singleton.client.on(listener.eventName, liste))
          // clearTimeout(timeout);
          // if (options) {
          //   options.listeners?.concat(listeners).map(listener => {
          //     client.on(listener.eventName, listener.handler);
          //   });
          // }
          // DiscordClientSingleton.instance.client = client;
          return resolve(client);
      });
    });
  }

  static forFeature(
    token?: string,
    options?: RegisterClientOptions,
  ): DynamicModule {
    console.log('Adding listeners from ForFeature');
    console.log('Options: ', options);
    let instance = DiscordClientSingleton.instance;

    // if (!instance.secretToken || instance.secretToken === undefined)
    //   instance.secretToken = token;

    // if (!options || options == undefined) {
    //   console.log('this is null');
    //   return {
    //     module: DiscordiaModule,
    //   };
    // }
    if (!options) options = {};
    console.log('continuing executing');

    // try {
    // DiscordClientSingleton.instance.optionParams = {
    //   controllers:
    //     options.controllers && options.controllers.length
    //       ? Array.from(options.controllers)
    //       : [],
    //   listeners:
    //     options.listeners && options.listeners.length
    //       ? Array.from(options.listeners)
    //       : [],
    // };

    return {
      module: DiscordiaModule,
    };

    //   let providers = createDiscordProviders(
    //     DiscordClientSingleton.instance.client,
    //     this.pseudo,
    //   );
    // } catch (error) {
    //   console.log('Damn bruh!', error);
    // }
  }

  static async register({
    clientToken,
    options,
  }: DiscordiaRegisterClientParams): Promise<DynamicModule> {
    const {
      listeners,
      controllers,
      timeoutDurationInSeconds,
    } = DiscordClientSingleton.instance.optionParams;

    if (!clientToken.length)
      throw new Error(
        'Bad argument for register method, expected token to be a valid string. Is the token good?',
      );

    return new Promise((resolve, reject) => {
      const preferedTimeout = timeoutDurationInSeconds
        ? timeoutDurationInSeconds
        : options.timeoutDurationInSeconds
        ? options.timeoutDurationInSeconds
        : 10000;

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
        console.log('Discord client ready');
        clearTimeout(timeout);

        if (options) {
          options.listeners?.concat(listeners).map(listener => {
            client.on(listener.eventName, listener.handler);
          });
        }

        const providers = createDiscordProviders(client, this.pseudo);

        return resolve({
          controllers: options.controllers?.concat(controllers) || [],
          module: DiscordiaModule,
          providers,
          exports: providers,
        });
      });
    });
  }
}
