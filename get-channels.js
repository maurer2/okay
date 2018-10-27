const dotenv = require('dotenv');
const { WebClient } = require('@slack/client');

dotenv.config();

const token = process.env.SLACK_TOKEN;
const client = new WebClient(token);
const getChannels = client.conversations.list({
  exclude_archived: true,
  types: 'public_channel',
});

getChannels
  .then(results => (results.ok ? results.channels : []))
  .then((channels) => {
    const channelsMapped = channels.map(channel => ({ name: channel.name, id: channel.id }));
    console.log(channelsMapped);
  })
  .catch((error) => {
    console.error(error);
  });
