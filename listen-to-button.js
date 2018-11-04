require('dotenv').config();
const ButtonListener = require('./ButtonListener');

const buttonList = {
  'button-1': process.env.DASH_BUTTON_MAC,
};

const bl = new ButtonListener(buttonList);

bl.startListening();
