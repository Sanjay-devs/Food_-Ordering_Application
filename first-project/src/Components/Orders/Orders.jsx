import "../Orders/Orders.css";
import { orderedFoodItems } from "../../Service/ApiService";
import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { CartContext } from "../Cart/CartContext";
import { addandRemoveCart, processOrder } from "../../Service/ApiService";
// import { PayPalScriptProvider,  } from "@paypal/react-paypal-js"; 
// import Checkout from "../Payment/Checkout";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Orders = () => {
    const navigate = useNavigate();
    const {setCartCount} = useContext(CartContext);
    const [orders, setOrders] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        fetchOrdersSummary();
    }, [userId]);

    const fetchOrdersSummary = async () => {
        if (!userId) {
            console.error("User not logged in.");
            return;
        }

        try {
            const summary = await orderedFoodItems(userId);
            setOrders(summary);
            setTotalPrice(
                summary.reduce((acc, item) => acc + item.totalPrice, 0)
            );

            const totalItems = summary.reduce((acc, item) => acc + item.totalCount, 0);
            setCartCount(totalItems);
        } catch (error) {
            console.error("Error fetching cart summary:", error);
        }
    };

    // const handlePaymentSuccess = async () => {
    //     try {
    //       const userId = +localStorage.getItem("userId");
    //       const result = await processOrder(userId);
    //       toast.success(result.Message);
    //     } catch (error) {
    //       toast.error("Error completing payment: " + error);
    //     }
    //   };
      
    const handlePaymentSuccess = async () => {
        try {
            const userId = +localStorage.getItem("userId");
    
            // Call the processOrder API (or equivalent) to clear the cart
            const result = await processOrder(userId);
    
            // Set the cart count to zero
            setCartCount(0);
    
            toast.success(result.Message);
    
            // Redirect to the payment gateway
            navigate("/payment_gateway", { state: { totalPrice } });
        } catch (error) {
            toast.error("Error completing payment: " + error);
        }
    };
    
    const updateCart = async (foodItemID, change, menuId, restaurantId, foodItem, cartId, foodImage, price) => {
        console.log("jhbjh", orders);
        const currentItem = orders.find((item) => item.foodItemID === foodItemID);
        const currentQuantity = currentItem?.totalCount || 0;
        const newQuantity = currentQuantity + change;

        if (newQuantity < 0) return;

        try {
            await addandRemoveCart({
                FoodItemID: foodItemID,
                TotalCount: newQuantity,
                UserId: userId,
                MenuId: menuId,
                RestaurantId: restaurantId,
                FoodItem: foodItem,
                CartId: cartId,
                FoodImage: foodImage,
                Price: price
            });

            if (change > 0) {
                toast.success(`1${foodItem} added to cart`);
            } else {
                toast.error(`1${foodItem} removed from cart.`);
            }

            fetchOrdersSummary();
        } catch (error) {
            console.error("Error updating cart:", error);
            toast.error("Failed to update cart.");
        }
    };

   
    if (!orders) return <p>Loading...</p>;

    return (
        <div className="cart-summary">
            <h2>Cart Items 🛒</h2>
            <h3>Scroll down 📜 for payment 💲</h3>
            {orders && orders.length > 0 ? (
                <div className="cart-items">
                    {orders.map((item) => (
                        <div key={item.foodItemID} className="cart-item">
                            <img
                                className="food-item-image"
                                src={`http://localhost:9950/UploadedFiles/${item.foodImage}`}
                                alt={item.foodItem}
                            />
                            <div>
                                <div className="order-items">
                                    <h3 className="food-item">{item.foodItem}</h3>
                                    <p>Price: ₹{item.price}</p>
                                    <p>Quantity: {item.totalCount}</p>
                                    <p>Total: ₹{item.totalPrice}</p>
                                </div>
                                <div className="cart-controls">
                                    <button
                                        className="decrement"
                                        onClick={() =>
                                            updateCart(
                                                item.foodItemID,
                                                -1,
                                                item.menuId,
                                                item.restaurantId,
                                                item.foodItem,
                                                item.cartId,
                                                item.foodImage,
                                                item.price
                                            )
                                        }
                                    >
                                        -
                                    </button>

                                    <span className="value">{item.totalCount}</span>
                                    <button
                                        className="increment"
                                        onClick={() =>
                                            updateCart(
                                                item.foodItemID,
                                                1,
                                                item.menuId,
                                                item.restaurantId,
                                                item.foodItem,
                                                item.cartId,
                                                item.foodImage,
                                                item.price
                                            )
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="empty-cart">Your cart is empty.</p>
            )}

            <div className="payment">
                <h3 className="total-price">
                    Total Price: ₹ {totalPrice}/-
                </h3>
                <button 
                className="payment-button"
                onClick={() => 
                    { handlePaymentSuccess(); 
                    navigate("/payment_gateway", { state: { totalPrice } })}} 
                    disabled={totalPrice === 0}>Pay Now</button>
            </div>
        </div>
    );
};

export default Orders;