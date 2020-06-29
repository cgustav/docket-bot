export const HealthMessageListener = {
  eventName: 'message',
  handler: msg => {
    console.log('[K] Un mensaje!', msg.content);
    if (msg.content === 'health') {
      console.log('calza');
      msg.reply('Check!');
    }
  },
};
