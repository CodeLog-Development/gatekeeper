import * as fs from 'fs';

export default () => {
  return {
    serviceAccount: JSON.parse(
      fs.readFileSync('firebase-service-account.json').toString(),
    ),
    currencyApiKey: JSON.parse(
      fs.readFileSync('freecurrencyapi.json').toString(),
    ),
  };
};
