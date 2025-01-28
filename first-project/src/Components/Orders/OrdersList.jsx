import { useState, useEffect } from "react";
import { orderedFoodItems, ordersList, processOrder } from "../../Service/ApiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {Navbar} from "../NavbarComponent/Navbar"
import "../Orders/OrdersList.css"

const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId"); // Make sure userId is retrieved here

    useEffect(() => {
        fetchOrders();
    }, []);

    const backToDashboard = () => {
        navigate("/dashboard")
        toast.success("Again order something");
    }

    const fetchOrders = async () => {
        if (!userId) {
            console.error("User ID is missing");
            return;
        }

        try {
            const response = await ordersList(userId); // Pass userId to the service
            setOrders(response); // Update the orders state with response data
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const handlePaymentSuccess = () => {
        toast.success("Order placed successfully!");
        navigate("/orders-list");
    };

    return (
        <div className="orders-list">
            <h2>Orders List</h2>
            <div>
                <button className="dashboard" onClick={backToDashboard}>
                    Dashboard
                </button>
            </div>
            {orders.length > 0 ? (
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Food Item</th>
                            <th>Restaurant Name</th>
                            <th>Total Count</th>
                            <th>Price</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.orderId}>
                                <td>
                                    <img
                                        src={`http://localhost:9950/UploadedFiles/${order.foodImage}`}
                                        alt={order.foodItem}
                                        className="food-image"
                                    />
                                </td>
                                <td>{order.foodItem}</td>
                                <td>{order.restaurantName}</td>
                                <td>{order.totalQuantity}</td>
                                <td>₹{order.totalPrice}/-</td>
                                <td className="payment-status">{order.paymentStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No orders found.</p>
            )}
            
        </div>
    );
};

export default OrdersList;
