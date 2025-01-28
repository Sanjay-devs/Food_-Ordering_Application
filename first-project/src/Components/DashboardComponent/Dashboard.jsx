import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { tokenExpire } from "../../Service/ApiService";
import foodpic from "../../Images/foodh.jpg"
import Menu from "../Menu/Menu";
import FoodDisplay from "../FoodDisplay/FoodDisplay";
import Restaurants from "../Restaurants/Restaurants";
import Navbar from "../NavbarComponent/Navbar";
import Header from "../../Header";
import Footer from "../../Footer";
import Home from "./Home";


export default function Dashboard() {
    const { isAuthenticated,logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("All");
    
    useEffect(() => {
      console.log("dashboard",isAuthenticated);

    //   const intervalId = setInterval(async () => {
    //     try {
    //       const isExpired = await tokenExpire();
    //       if (isExpired) {
    //           // logout();
    //         navigate("/sessionexpire"); // Correct usage of navigate
    //       }
    //     } catch (error) {
    //       console.error("Error checking token expiration:", error);
    //     }
    //   }, 30000); // Check every 30 seconds
  
    //   return () => clearInterval(intervalId); // Cleanup interval on component unmount
    // }, [navigate]);
    
  
    // const handleLogout = () => {
    //   localStorage.removeItem('authToken'); // Remove token from localStorage
    //   logout(); // Call logout function from context
    //   navigate('/Login'); // Redirect to login page
    });
  return (
    <div>
      {/* <button 
         className="nav-button"
         onClick={handleLogout}>Log Out
      </button> */}
      {/* <Navbar/> */}
      {/* <div className="nav-container">
        <button 
          className="nav-button"
          onClick={handleLogout}>Logout
        </button>
      </div> */}
      
      {/* <Header/>
      <main>
        <Menu selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
        <FoodDisplay selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
        <Restaurants/>
      </main>
      <Footer/> */}
      {/* <Home/> */}
      {/* <img src={foodpic} alt="Food" className="foodh"></img> */}
      <Home/>
      {/* <h1 className="h1">Welcome</h1> */}
      
      
    
    </div>
  );
}
