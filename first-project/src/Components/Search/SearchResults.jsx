import { useLocation } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"
import "../FoodDisplay/FoodDisplay.css";
// import "../Restaurants/Restaurants.css";
import "../Search/Search.css";
import Navbar from "../NavbarComponent/Navbar";
import Header from "../../Header";
import Footer from "../../Footer";
import FoodDetails from "../FoodDisplay/FoodDetails";

export default function SearchResults() {
    const location = useLocation();
    const data = location.state;

    if (!data) {
        return <p>No results found.</p>;
    }

    const { foodItems = [], restaurants = [], menu = [] } = data;
    const carouselSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    return (
        <div className="search-results">
            {/* <Navbar/> */}   
            <Header/>
            <h2 className="sre">Search Results</h2>

            {/* Food Items Section */}
            <div className="food-items">
            <h3 className="food-items">Food Items 🥧</h3>
            {foodItems.length > 0 ? (
                <div className="food-display-list">
                    {foodItems.map((item,index) => (
                        // <div key={item.foodItemId} className="food-display-list-item">
                        //     <img
                        //         className="food-item-image"
                        //         src={`http://localhost:9950/UploadedFiles/${item.foodImage}`}
                        //         alt={item.foodItem}
                        //     />
                        //     <div className="food-item-container">
                        //         <p className="food-item-name">{item.foodItem}</p>
                        //         <p className="food-item-price">₹{item.price}/-</p>
                        //     </div>
                        // </div>
                        <FoodDetails key={index} foodthing={item}/>
                      
                    ))}
                </div>
                
            ) : (
                <p>No food items found.</p>
            )}
            </div>

            <div className="results-container">
                {/* Restaurants Section */}
                <div className="carousel-section">
                    <h3>Restaurants 🌇</h3>
                    {restaurants.length > 0 ? (
                        <Slider {...carouselSettings}>
                           {/* <button
                                onClick={handlePrev}
                                disabled={currentIndex === 0}
                                className="arrow-button left-arrow"
                            >
                                &#8249;
                            </button> */}
                            {restaurants.map((restaurant) => (
                                <div key={restaurant.restaurantId} className="carousel-item-rest">
                                    <img
                                        src={`http://localhost:9950/UploadedFiles/${restaurant.rest_Image}`}
                                        alt={restaurant.name}
                                        className="restaurant-image"
                                    />
                                    <div className="carousel-details">
                                        <h4 className="restaurant-name">{restaurant.name}</h4>
                                        <p className="restaurant-desc">{restaurant.description}</p>
                                        <p className="restaurant-address">{restaurant.address}</p>
                                    </div>
                                </div>
                            ))}
                            {/* <button
                                onClick={handlePrev}
                                disabled={currentIndex === 0}
                                className="arrow-button left-arrow"
                            >
                                &#8249;
                            </button> */}
                        </Slider>
                        
                    ) : (
                        <p>No restaurants found.</p>
                    )}
                </div>
            </div>
            
            {/* Menu Section */}
            <div className="menu">
                <div className="carousel-section">
                            <h3>Menu</h3>
                            {menu.length > 0 ? (
                                <Slider {...carouselSettings}>
                                    {menu.map((menuItem) => (
                                        <div key={menuItem.menuId} className="carousel-item">
                                            <img
                                                src={`http://localhost:9950/UploadedFiles/${menuItem.menuImage}`}
                                                alt={menuItem.itemName}
                                                className="menu-image"
                                            />
                                            <p className="menu-name">{menuItem.itemName}</p>
                                        </div>
                                    ))}
                                </Slider>
                            ) : (
                                <p>No menu items found.</p>
                            )}
                </div>
            </div>
            
        <Footer/>    
        </div>
        
    );
}
