import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Review from '../components/Review';

export default function CheckoutPage() {
  const initialOptions = {
    'client-id': process.env.NEXT_PUBLIC_CLIENT_ID,
    currency: 'USD',
    intent: 'capture',
    // 'enable-funding': 'venmo', // removing Venmo for now
  };
  return (
    <PayPalScriptProvider options={initialOptions}>
      <Review />
    </PayPalScriptProvider>
  );
}
