const dhcpjs = require('dhcpjs');
const EventEmitter = require('events');

class ButtonListener extends EventEmitter {
  constructor(buttonList) {
    super();

    this.buttonList = buttonList;
    this.server = dhcpjs.createServer();
  }

  startListening() {
    this.server.bind();

    this.server
      .on('listening', () => {
        console.log('Server has started listening');
      })
      .on('message', (receivedMessage) => {
        const macAddress = receivedMessage.chaddr.address;

        const buttonPressed = Object.keys(this.buttonList)
          .find(button => this.buttonList[button] === macAddress);

        if (buttonPressed.length > 0) {
          this.emit('button-pressed', buttonPressed);
        }
      });
  }
}

module.exports = ButtonListener;
