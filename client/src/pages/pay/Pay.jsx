import React, { useEffect, useState } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51NsgkeA1zDYEJIwgLAbIYnl2SWP7qmO4VynuubOftlt83bMToSFzndvj2i2CVzfxWAUgliVtumoaGnkJE7aYZsPn00grTbA139"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");

  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/enrollments/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        if (err.response.statusText == "Unauthorized"){
          alert("Cannot buy course when logged out!. Redirecting you to sign in.")
          navigate("/login")
        }
        // console.log(err);
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

  return <div className="pay">
    {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
  </div>;
};

export default Pay;
