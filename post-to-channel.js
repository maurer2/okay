import dotenv from 'dotenv';
import { WebClient } from '@slack/client';

dotenv.config();

const token = process.env.SLACK_TOKEN;
const testchannelID = process.env.SLACK_TESTCHANNEL;

if (token === undefined || testchannelID === undefined) {
  process.exit(1);
}

const languageStrings = {
  greeting: 'Hallo',
  affirmation: 'Okay',
};

const client = new WebClient(token);
const getTestChannelData = client.conversations.list({
  exclude_archived: true,
  types: 'private_channel',
});

getTestChannelData
  .then(results => (results.ok ? results.channels : []))
  .then(channels => channels.find(channel => channel.id === testchannelID))
  .then((channel) => {
    console.log(channel);
  })
  .catch((error) => {
    console.error(error);
  });

client.chat.postMessage({
  channel: testchannelID,
  text: languageStrings.affirmation,
})
  .then((response) => {
    const messageSent = response.message.text;

    console.log(`'${messageSent}' has been sent!`);
  })
  .catch((error) => {
    console.error(error);
  });
