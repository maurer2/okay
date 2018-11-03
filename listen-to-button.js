const dotenv = require('dotenv');
const dhcpjs = require('dhcpjs');

const server = dhcpjs.createServer();

dotenv.config();

const macAdressButton = process.env.DASH_BUTTON_MAC;

server
  .on('listening', () => {
    console.log('server started and listening');
  })
  .on('message', (receivedMessage) => {
    const macAdress = receivedMessage.chaddr.address;
    const requestType = receivedMessage.op.name;

    const isBootpRequest = requestType === 'BOOTPREQUEST';
    const isFromDashButton = macAdress === macAdressButton;

    if (isBootpRequest && !isFromDashButton) {
      console.log('BootPRequest received from different sender');
      return;
    }

    if (isBootpRequest && isFromDashButton) {
      console.log('BootPRequest received from dash button');
    }
  });

server.bind();
