const dotenv = require('dotenv');
// const ndb = require('ndb');
const { WebClient } = require('@slack/client');

dotenv.config();
const token = process.env.SLACK_TOKEN;
// const channelID = process.env.SLACK_TESTCHANNEL;

const client = new WebClient(token);
const getTestChannel = client.conversations.list({
  exclude_archived: true,
  types: 'private_channel',
});

getTestChannel
  .then(results => (results.ok ? results.channels : []))
  .then(console.log)
  .catch(console.error);
