import React from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import { useLocation } from "react-router-dom";
import Checkout from "./Checkout";
import "./Payment.css"


export default function Payment(){
    const location = useLocation();
    const {totalPrice} = location.state ||  {totalPrice:0}
    const initialOptions = {
        "client-id": "Af9ywQhq2Wdy0yOHbWz7RLPcKKoMuoyjqYmMadjgFWIl_N5r5bTWgrsuGaul0fPcwqZj4is8LtG_nR12",
        currency: "USD",
        intent: "capture",
      };
    return(
        <div className="payment">
            <h1>Payment Gateway</h1>
            <h3>Total Amount to pay ₹{totalPrice}/-</h3>
            <div className="payment-options">
                <PayPalScriptProvider options={initialOptions}>
                    <div className="checkout">
                        <Checkout totalPrice={totalPrice}/>
                    </div>
                </PayPalScriptProvider>
                
            </div>
            
        </div>
    )
}