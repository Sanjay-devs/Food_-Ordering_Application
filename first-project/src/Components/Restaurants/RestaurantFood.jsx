import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFoodItemsByRestaurantId } from "../../Service/ApiService";
import "./Restaurants.css";
import { useLocation } from "react-router-dom";
import FoodDetails from "../FoodDisplay/FoodDetails";

const RestaurantFood = () => {
  const { restaurantId } = useParams(); // Retrieve menuId from URL
  const location = useLocation(); // Retrieve state passed with navigation
  const restaurantid_nav_restaurantjsx = location.state?.restaurantid_nav_restaurantjsx || 0;

  const [foodItems, setFoodItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    

    fetchRestaurantFoodItems();
  }, [restaurantId]);

  const fetchRestaurantFoodItems = async () => {
    try {
      console.log("res_id",restaurantid_nav_restaurantjsx)
      const response = await getFoodItemsByRestaurantId(restaurantid_nav_restaurantjsx);
      console.log("foodites",response)
      setFoodItems(response.items_1);
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };

  return (
    <div className="food-display">
      <h1>Food Items</h1>
      {foodItems.length > 0 ? (
        <div className="food-display-list">
          {foodItems.map((food) => (
            <FoodDetails foodthing={food}/>
          ))}
        </div>
      ) : (
        <p>No food items available for this restaurant.</p>
      )}
    </div>
  );
};

export default RestaurantFood;
