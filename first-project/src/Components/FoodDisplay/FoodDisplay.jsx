import React, { useEffect, useState } from "react";
import "./FoodDisplay.css";
import { getAllFoodItems, addandRemoveCart } from "../../Service/ApiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import {CartContext} from "../Cart/CartContext"
import FoodDetails from "./FoodDetails"

const FoodDisplay = ({ selectedCategory, selectedRestaurant }) => {
    const [foodItems, setFoodItems] = useState([]);
    const [cartState, setCartState] = useState({});
    const {cartCount} = useContext(CartContext);

    useEffect(() => {
        const fetchFoodItems = async () => {
            try {
                const response = await getAllFoodItems();
                setFoodItems(response);
            } catch (error) {
                console.error("Error fetching food items:", error);
            }
        };

        fetchFoodItems();
    }, []);

    // if (!selectedRestaurant) {
    //     return (
    //         <div>
    //             <p>Please select a restaurant to view its menu.</p>
    //         </div>
    //     );
    // }

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
                toast.success(`1 item added, to the cart 🛒`);
            } else {
                toast.error(`1 item removed from the cart 🛒.`);
            }

        } catch (error) {
            console.error("Error updating cart:", error);
        }
    };

    const filteredFoodItems = foodItems.filter((food) => {
        const matchesCategory =
            selectedCategory?.name === "All" || food.menuId === selectedCategory?.id;
        const matchesRestaurant =
            !selectedRestaurant || food.restaurantId === selectedRestaurant.restaurantId;
    
        return matchesCategory && matchesRestaurant;
    });
    
    console.log("Selected Restaurant:", selectedRestaurant);
    console.log("Food Items:", foodItems);
    return (
        <div className="food-display">
            <div className="food-display-contents">
                <h1>Top Dishes near your location 🚩</h1>
                <p>Select the food item and place order 🗽</p>
            </div>
            {filteredFoodItems.length > 0 ? (
                <div className="food-display-list">
                    {filteredFoodItems.map((food,index) => (
                        // <div key={food.foodItemId} className="food-display-list-item">
                        //     <img
                        //         className="food-item-image"
                        //         src={`http://localhost:9950/UploadedFiles/${food.foodImage}`}
                        //         alt={food.foodItem}
                        //     />
                        //     <div className="food-item-container">
                        //         <p className="food-item-name">{food.foodItem}</p>
                        //         <p className="food-price">₹{food.price}/-</p>
                        //     </div>
                        //     {cartState[food.foodItemId] > 0 ? (
                        //         <div className="cart-controls">
                        //             <button className="decrement" onClick={() => updateCart(food.foodItemId, -1, food.menuId, food.restaurantId, food.foodItem)}>-</button>
                        //             <span className="value">{cartState[food.foodItemId]}</span>
                        //             <button className="increment" onClick={() => updateCart(food.foodItemId, 1, food.menuId, food.restaurantId, food.foodItem)}>+</button>
                                    
                        //         </div>
                        //     ) : (
                        //         <button className="add" onClick={() => updateCart(food.foodItemId, 1, food.menuId, food.restaurantId, food.foodItem)}>ADD</button>
                                
                        //     )}
                        // </div>

                        <div id={`food-${food.foodItemId}`} key={food.foodItemId}>
                            <FoodDetails foodthing={food} />
                        </div>
                        // <div>hello</div>
                        
                    ))}
                </div>
            ) : (
                <div className="no-food-message">
                    <p>
                        No food items available for this menu:{" "}
                        <strong>{selectedCategory?.name}</strong>
                    </p>
                </div>
            )}
        </div>
    );
};
export default FoodDisplay;
