const express = require ('express');
const fetch = require('node-fetch');

const server = express();

const PORT = 3000;
const URI_COINDESK_LAST_CLOSE = 'https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday';
const URI_COINDESK_CURRENT = 'https://api.coindesk.com/v1/bpi/currentprice.json';
const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

server.get('/compare', (req, res) => {
  fetch(URI_COINDESK_LAST_CLOSE)
    .then(response => response.json())
    .then(lastClosePrice => {
      lastClosePrice = Object.values(lastClosePrice.bpi)[0];
      fetch(URI_COINDESK_CURRENT)
        .then(response => response.json())
        .then(currentPrice => {
          currentPrice = currentPrice.bpi.USD.rate_float;
          const differenceInPrice = Number((currentPrice - lastClosePrice).toFixed(4));
          console.log('current: ' + currentPrice + ' last close: ' + lastClosePrice);
          res.status(STATUS_SUCCESS)
          // if you want a statement of change, use this 'if' block
          if (differenceInPrice < 0) {
            res.send(`Bitcoin has decreased in value by $${-differenceInPrice}`);
          } else {
            res.send(`Bitcoin has increased in value by $${differenceInPrice}`);
          }
          // if you want an object indicating the difference, use this res.json
          // res.json({ change: differenceInPrice });
        })
        .catch(error => console.log(error))
      // end fetch of current price
    })
    .catch(error => console.log(error));
  // end fetch of last closing price
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}.`);
});