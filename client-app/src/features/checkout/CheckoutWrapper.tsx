import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./CheckoutPage";

const stripePromise = loadStripe('pk_test_51LXQQsKlw9xvGTHnexAqJ8lZwkvFr479z1JL8y9DC5uRIwU5xEWVPCjITgHz8MpXmUkocM2iODMTLq5aLkCoYO4g007oC1AAsQ');

export default function CheckoutWrapper() {

    return ( 
        <Elements stripe={stripePromise}> 
            <CheckoutPage />
        </Elements>
    )
}