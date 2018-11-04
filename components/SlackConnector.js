require('dotenv').config();
const { WebClient } = require('@slack/client');

const languageStrings = {
  greeting: 'Hallo',
  affirmation: 'Okay',
};

class SlackConnector {
  constructor(token) {
    this.token = token;
  }

  connectToSlack() {
    this.client = new WebClient(this.token);
  }

  getChannels() {
    return this.client.conversations.list({
      exclude_archived: true,
    });
  }

  getChannelByID(channelID) {
    this.getChannels().then(results => (results.ok ? results.channels : []))
      .then(channels => channels.find(channel => channel.id === channelID))
      .then((channel) => {
        console.log(channel);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  postToChannel(channelID) {
    this.client.chat.postMessage({
      channel: channelID,
      text: languageStrings.affirmation,
    })
      .then((response) => {
        const messageSent = response.message.text;

        console.log(`'${messageSent}' has been sent!`);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

module.exports = SlackConnector;