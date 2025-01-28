import React from "react";
import { toast } from "react-toastify";
import { useState  } from "react";
import { Link } from "react-router-dom";
import { addandRemoveCart } from "../../Service/ApiService";

const FoodDetails = ({prop,foodthing}) => {
     const [cartState, setCartState] = useState({});

     const updateCart = async (foodItemId, change, menuId, restaurantId, foodItem) => {
            const userId = localStorage.getItem("userId"); // Fetch userId
            if (!userId) {
                toast.error("User not logged in.");
                return;
            }
            const currentCount = cartState[foodItemId] || 0;
            const newCount = currentCount + change;
    
            if (newCount < 0) return;
    
            try {
                await addandRemoveCart({
                    FoodItemID: foodItemId,
                    TotalCount: newCount,
                    UserId: userId,  
                    MenuId: menuId,
                    RestaurantId: restaurantId,
                    FoodItem : foodItem
                });
    
                // toast.success(change > 0 ? `${foodItem} added to cart.`: `${foodItem} removed from cart.`);
               
                
                setCartState((prev) => ({
                    ...prev,
                    [foodItemId]: newCount,
                }));
    
                if (change > 0) {
                    toast.success(`1 item added, to the cart 🛒. Cart is at top right corner `);<Link to="/orders"></Link>
                } else {
                    toast.error(`1 item removed from the cart 🛒. Cart is at top right corner `);<Link to="/orders"></Link>
                }
    
            } catch (error) {
                console.error("Error updating cart:", error);
            }
     };



    return (
        <div className="food-display-list-item">
        <img
            className="food-item-image"
            src={`http://localhost:9950/UploadedFiles/${foodthing.foodImage}`}
            alt={foodthing.foodItem}
        />
        <div className="food-item-container">
            <p className="food-item-name">{foodthing.foodItem}</p>
            <p className="food-price">₹{foodthing.price}/-</p>
        </div>
        {cartState[foodthing.foodItemId] > 0 ? (
            <div className="cart-controls">
                <button className="decrement" onClick={() => updateCart(foodthing.foodItemId, -1, foodthing.menuId, foodthing.restaurantId, foodthing.foodItem)}>-</button>
                <span className="value">{cartState[foodthing.foodItemId]}</span>
                <button className="increment" onClick={() => updateCart(foodthing.foodItemId, 1, foodthing.menuId, foodthing.restaurantId, foodthing.foodItem)}>+</button>
                
            </div>
        ) : (
            <button className="add" onClick={() => updateCart(foodthing.foodItemId, 1, foodthing.menuId, foodthing.restaurantId, foodthing.foodItem)}>ADD</button>
            
        )}
    </div>
    // <div>hellocc{Key} + {foodthing.price}</div>
    )
}
export default FoodDetails;

