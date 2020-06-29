export interface DiscordiaRegisterClientParams {
  clientToken: string;
  options: RegisterClientOptions;
}

export interface RegisterClientOptions {
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

export interface ClientListener {
  eventName: any;
  handler: (any) => void;
}
