  import { useContext, useState } from "react";
  import { AuthContext } from "../../AuthContext"
  import { useNavigate } from "react-router-dom";
  import pimage from "../../Images/food2.avif"
  import Header from "../../Header";
  import Menu from "../Menu/Menu";
  import FoodDisplay from "../FoodDisplay/FoodDisplay";
  import Restaurants from "../Restaurants/Restaurants";
  import Navbar from "../NavbarComponent/Navbar";
  import Footer from "../../Footer";
  import { useLocation } from "react-router-dom";

  export default function Home() {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState({
      id: null,
      name: "All",
    });

    // const handleMenuClick = (menu) => {
    //   navigate(`/food-items`);
    // };

    const [selectedRestaurant, setSelectedRestaurant] = useState({
      id: null,
      name: "All",
    });
  
    const handleRestaurantClick = (restaurant) => {
      setSelectedRestaurant(restaurant);
      navigate(`/restaurant_food`);
    };
  
    return (
      <div className="home">
        <main>
          <Header />
          <Menu
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            // onMenuClick={handleMenuClick}
          />
          <FoodDisplay
            selectedCategory={selectedCategory}
            // selectedRestaurant={selectedRestaurant}
          />
          <Restaurants
            selectedRestaurant={selectedRestaurant}
            setSelectedRestaurant={setSelectedRestaurant}
            // onRestaurantClick={handleRestaurantClick}
          />
          <Footer />
        </main>
      </div>
    );
  }