import React, { useState, useEffect } from 'react'
import "./Pay.scss"
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js"
import NewRequest from "../../utilis/NewRequest";
import { useParams } from 'react-router-dom';
import CheckOutForm from '../../components/checkoutForm/CheckOutForm';

const stripePromise = loadStripe("pk_test_51NquzJSHt6orvfMAg0ao0naPFGzl2iKZ4u7FGy9Gnk0zUh6I0GUaFa3eqMFaVH7g7xmp63cLsdYYK5VcQOzWxAzm00sHI1SBdy");

function Pay() {

    const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await NewRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pay">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckOutForm/>
        </Elements>
      )}
    </div>
  )
}

export default Pay