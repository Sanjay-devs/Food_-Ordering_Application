import React, { useState, useEffect } from "react";
import { getAllRestaurants } from "../../Service/ApiService";
import "../Restaurants/Restaurants.css";
import { useNavigate } from "react-router-dom";

export default function Restaurants({ onRestaurantClick }) {
    const navigate = useNavigate();
    const [restaurants, setRestaurants] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 4;

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const response = await getAllRestaurants();
                setRestaurants(response);
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }
        };

        fetchRestaurants();
    }, []);

    const handleRestaurantClick = (restaurant_id) => {
        console.log("restaurantid",restaurant_id)
        navigate("/restaurant_food", { state: { restaurantid_nav_restaurantjsx: restaurant_id } });
      }

    const handleNext = () => {
        if (currentIndex + itemsPerPage < restaurants.length) {
            setCurrentIndex(currentIndex + itemsPerPage);
        }
    };

    const handlePrev = () => {
        if (currentIndex - itemsPerPage >= 0) {
            setCurrentIndex(currentIndex - itemsPerPage);
        }
    };

    return (
        <div className="restaurants">
            <h1>Discover the Best Restaurants 🌇</h1>
            <p>Explore restaurants and their delicious food 🥗</p>

            {restaurants.length > 0 ? (
                <div className="restaurant-container">
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="arrow-button left-arrow"
                    >
                        &#8249;
                    </button>

                    <div className="restaurant-list">
                        {restaurants
                            .slice(currentIndex, currentIndex + itemsPerPage)
                            .map((restaurant) => (
                                <div
                                    key={restaurant.restaurantId}
                                    className="carousel-item"
                                    // onClick={() => onRestaurantClick(restaurant)}
                                    onClick={()=>handleRestaurantClick(restaurant.restaurantId)}
                                >
                                    <img
                                        src={`http://localhost:9950/UploadedFiles/${restaurant.rest_Image}`}
                                        alt=""
                                        className="restaurant-image"
                                    />
                                    <div className="carousel-details">
                                        <h2 className="restaurant-name">{restaurant.name}</h2>
                                        <p className="restaurant-desc">{restaurant.description}</p>
                                        <p className="restaurant-address">{restaurant.address}</p>
                                    </div>
                                </div>
                            ))}
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={currentIndex + itemsPerPage >= restaurants.length}
                        className="arrow-button right-arrow"
                    >
                        &#8250;
                    </button>
                </div>
            ) : (
                <p className="error">Restaurants are not available presently😔</p>
            )}
        </div>
    );
}
