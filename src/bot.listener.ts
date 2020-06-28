// export const DiscordListenerExample = {
//   eventName: 'message'
//   handler =  message => {
//     message.reply('Stop spaming here!');
//   },
// };

export const PingListener = {
  eventName: 'message',
  handler: msg => {
    console.log('Un mensaje!', msg.content);
    if (msg.content === 'ping') {
      msg.reply('Pong!');
    }
  },
};
