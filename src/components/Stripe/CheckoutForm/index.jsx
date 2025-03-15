import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import '../styles.css';
import { useCart } from '../../../hooks/CartContext';
import { api } from '../../../services/api';
import { toast } from 'react-toastify';
import BG from '../../../assets/bg-login2.svg'



export default function CheckoutForm() {
  const { cartProducts, clearCart } = useCart();
  const {
    state: { clientSecret },
  } = useLocation(); // desmenbrando o location, buscando dentro de state o clientsecret

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error('Stripe ou Elements com falha, tente novamente');

      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      // chamada para o stripe para a confirmação de pagamento
      elements,
      redirect: 'if_required', // só vai redirecionar quando for requerido
    });

    if (error) {
      //se deu erro na intenção de pagamento
      setMessage(error.message);
      toast.error(error.message);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      try {
        const products = cartProducts.map((product) => {
          // faço um map no cardProducts e retorno os produtos no formato que o backend espera(só id, quantidade e preço do produto)
          return {
            id: product.id,
            quantity: product.quantity,
            price: product.price,
          };
        });

        const { status } = await api.post(
          '/orders',
          {
            products,
          },
          {
            validateStatus: () => true,
          },
        );

        if (status === 200 || status === 201) {
          setTimeout(() => {
            navigate(
              `/complete?payment_intent_client_secret=${paymentIntent.client_secret}`,
            ); // passando o clientSecret por queryparams
          }, 2000);
          toast.success('Pedido realizado com sucesso 👌');
          clearCart();
        } else if (status === 409) {
          toast.error('Falha ao realizar seu pedido');
        } else {
          throw new Error();
        }
      } catch (err) {
        toast.error('Falha no Sistema 🤯! Tente novamente. ');
      }
    } else {
      navigate(
        `/complete?payment_intent_client_secret=${paymentIntent.client_secret}`,
      );
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: 'accordion',
  };

  return (
    <div className="container">
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          disabled={isLoading || !stripe || !elements}
          id="submit"
          className="button"
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              'Pagar Agora'
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
}
