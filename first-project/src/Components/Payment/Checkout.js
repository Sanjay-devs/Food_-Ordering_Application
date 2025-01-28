import React, { useState, useEffect } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import "./Payment.css"
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = ({totalPrice}) => {
    const navigate = useNavigate();
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [currency, setCurrency] = useState(options.currency);

    const onCurrencyChange = ({ target: { value } }) => {
        setCurrency(value);
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: value,
            },
        });
    }

    const onCreateOrder = (data, actions) => {
        const convertedPrice = (totalPrice / 82).toFixed(2); // Ensure it's a string with two decimal places
        if (isNaN(convertedPrice) || convertedPrice <= 0) {
            alert("Invalid total price");
            return;
        }
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        // currency_code: currency,
                        value: convertedPrice,
                    },
                },
            ],
        });
    };
    
    

    const onApproveOrder = (data,actions) => {
        return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            alert(`Transaction completed by ${name}`);
            navigate("/orders_list");
            toast.success("Orders Placed successfully");
        });
    }

    return (
        <div className="checkout">
            {isPending ? <p>LOADING...</p> : (
                <>
                    <div className="checkout">
                        <select value={currency} onChange={onCurrencyChange}>
                                <option value="USD">💵 USD</option>
                                <option value="EUR">💶 Euro</option>
                        </select>
                    </div>
                    
                    <div className="paypal-buttons">
                        <PayPalButtons 
                            style={{ layout: "vertical" }}
                            createOrder={(data, actions) => onCreateOrder(data, actions)}
                            onApprove={(data, actions) => onApproveOrder(data, actions)}
                        />
                    </div>
                    
                </>
            )}
        </div>
    );
}
export default Checkout;