import { defineSecret } from 'firebase-functions/params';

export const firebaseServiceAccount = defineSecret('FIREBASE_SERVICE_ACCOUNT');
export const freecurrencyApiKey = defineSecret('FREECURRENCY_API_KEY');
export const paystackSecret = defineSecret('PAYSTACK_SECRET_KEY');

export default () => {
  return {
    serviceAccount: JSON.parse(firebaseServiceAccount.value()),
    currencyApiKey: freecurrencyApiKey.value(),
    paystackSecret: paystackSecret.value(),
  };
};
