import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFoodItemsByMenuId } from "../../Service/ApiService";
import "./FoodDisplay.css";
import { useLocation } from "react-router-dom";
import FoodDetails from "./FoodDetails";

const FoodItems = () => {
  const { menuId } = useParams(); // Retrieve menuId from URL
  const location = useLocation(); // Retrieve state passed with navigation
  const menuid_nav_menujsx = location.state?.menuid_nav_menujsx || 0;
 
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    

    fetchFoodItems();
  }, [menuId]);

  const fetchFoodItems = async () => {
    try {
      // console.log("ded",menuid_nav_menujsx)
      const response = await getFoodItemsByMenuId(menuid_nav_menujsx);
      setFoodItems(response);
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
            // <div key={food.foodItemId} className="food-display-list-item">
            //   <img
            //     src={`http://localhost:9950/UploadedFiles/${food.foodImage}`}
            //     alt={food.foodItem}
            //   />
            //   <div>
            //     <p>{food.foodItem}</p>
            //     <p>₹{food.price}</p>
            //   </div>
            // </div>
            <FoodDetails foodthing={food}/>
          ))}
        </div>
      ) : (
        <p>No food items available for this menu.</p>
      )}
    </div>
  );
};

export default FoodItems;
