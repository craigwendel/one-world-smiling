import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Review from '../components/Checkout/Review';

export default function CheckoutPage() {
  const initialOptions = {
    'client-id': process.env.NEXT_PUBLIC_CLIENT_ID,
    currency: 'USD',
    intent: 'capture',
    // "data-client-token": "abc123xyz==",
  };
  return (
    <PayPalScriptProvider options={initialOptions}>
      <Review />
    </PayPalScriptProvider>
  );
}
