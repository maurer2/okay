import dotenv from 'dotenv';
import ButtonListener from './ButtonListener';

dotenv.config();

const buttonList = {
  'button-1': process.env.DASH_BUTTON_MAC,
};

const listenToButtonClick = () => {
  const listener = new ButtonListener(buttonList);

  listener.startListening();

  listener.on('button-pressed', (data) => {
    console.log(`${data} has been pressed!`);
  });
};

if (require.main === module) {
  listenToButtonClick();
}

export default listenToButtonClick;
