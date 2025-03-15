import { Elements } from '@stripe/react-stripe-js';
import { useLocation } from 'react-router-dom';
import stripePromise from '../../config/stripeConfig';
import CheckoutForm from '../../components/Stripe/CheckoutForm';


export function Checkout() {
  const {
    state: { clientSecret },
  } = useLocation(); // desmenbrando o location, buscando dentro de state o clientsecret
  console.log(clientSecret)

  if (!clientSecret) {
    return <div>Erro, volte e tente novamente</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{clientSecret}}> 
      {/* // uso duas chaves pq está esperando um objeto(clientSecret) vindo de dentro do location */}
      <CheckoutForm />
    </Elements>
  );
}
