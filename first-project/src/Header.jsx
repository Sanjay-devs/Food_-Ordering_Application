import { Link, Navigate } from "react-router-dom"
import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext"
import logo from "./Images/header-logo.jpg"
import pimage from "./Images/food2.avif"
import { searchItems } from "./Service/ApiService";
import Search from "./Components/Search/Search"
import Navbar from "./Components/NavbarComponent/Navbar";
// import "./Styles.css"

export default function Header(){
    // const handleMenu = () => {
    //     <Navigate to="/menu"/>
    // }
    const [query, setQuery] = useState();
   
    return(
       
        <div className="header">
            <img className="header-img" src={pimage} alt=""></img>
          <div className="header-cont">
            <h3 className="heading">Hungry? Order Food😋</h3>
            <p>Craving something delicious? Explore our menu and get your favorite dish 🍽</p>
            <Search/>
            {/* <input className="input" type="text" placeholder="Search for restaurat, food item or more" /> */}
                {/* <button onClick={handleMenu}>View menu</button> */}
            </div>           
        </div>
        
       
    )
}