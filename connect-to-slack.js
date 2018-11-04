require('dotenv').config();
const SlackConnector = require('./components/SlackConnector');

const token = process.env.SLACK_TOKEN;
const testchannelID = process.env.SLACK_TESTCHANNEL;

const slackClient = new SlackConnector(token);

slackClient.connectToSlack();

slackClient.postToChannel(testchannelID).then((message) => {
  console.log(message);
});
