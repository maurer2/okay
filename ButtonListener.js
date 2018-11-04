const dhcpjs = require('dhcpjs');

class ButtonListener {
  constructor(buttonList) {
    this.buttonList = buttonList;
    this.server = dhcpjs.createServer();
  }

  startListening() {
    this.server.bind();

    this.server
      .on('listening', () => {
        console.log('server has started and is listening');
      })
      .on('message', (receivedMessage) => {
        const macAdress = receivedMessage.chaddr.address;
        // const requestType = receivedMessage.op.name;

        const buttonPressed = Object.keys(this.buttonList)
          .find(button => this.buttonList[button] === macAdress);

        if (buttonPressed.length > 0) {
          console.log(`${buttonPressed} has been pressed`);
        }
      });
  }
}

module.exports = ButtonListener;
