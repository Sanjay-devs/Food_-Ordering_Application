import Login from './Components/LoginComponent/Login';
import Error from './Components/Error';
import Home from './Components/DashboardComponent/Home'
import Session from './Utilities/SessionExpire'
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute'
import PrivateRoute from './PrivateRoute';
import CustomToastContainer from "./ToastContainer/ToastContainer"
import React, { useEffect } from 'react';
import RegisterCheck from './Components/RegistrationComponent/RegisterCheck';
import Dashboard from './Components/DashboardComponent/Dashboard';
import SessionExpire from './Utilities/SessionExpire';
import About from './Components/DashboardComponent/About'
import Header from './Header';
import Footer from './Footer';
import Navbar from './Components/NavbarComponent/Navbar';
import Menu from './Components/Menu/Menu';
import Restaurants from './Components/Restaurants/Restaurants';
import Search from './Components/Search/Search';
import SearchResults from './Components/Search/SearchResults';
import Orders from './Components/Orders/Orders'
import "./Styles.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Payment from './Components/Payment/Payment';
import OrdersList from './Components/Orders/OrdersList';
import { CartProvider } from './Components/Cart/CartContext';
import FoodDisplay from './Components/FoodDisplay/FoodDisplay';
import FoodItems from './Components/FoodDisplay/FoodItems';
import RestaurantFood from './Components/Restaurants/RestaurantFood';
// import Checkout from './Components/Payment/Checkout';



function App(state) {
  // const [category, setCategory] = useState("All");
  return (
    <div className="app">
      <AuthProvider>
        <CartProvider>
        <Router>
          <Navbar/>
          {/* <Header/> */}
          <Routes>
            <Route path="/menu" element={ <PrivateRoute > <Menu /> </PrivateRoute>}/>
            <Route path="/restaurants" element={ <PrivateRoute > <Restaurants /> </PrivateRoute>}/>
            {/* <Route path="/" element={<Navigate to= "/Login" />}></Route>
            <Route path="*" element={<Error/>}></Route>
            <Route path="/Login" element={<PrivateRoute children={<Login/>} isProtected={false} /> }></Route>
            <Route path="/Register" element={<PrivateRoute children={<RegisterCheck/>} isProtected={false} />}></Route>
            <Route path="/Home" element={<PrivateRoute elements={<Home/>}/>}> </Route>
            <Route path='/SessionExpire' element={ <Session/>}></Route>
            <Route path = "/dashboard" elements={<PrivateRoute element = {<Dashboard />}/>}/> */}
            <Route path="/" element={<Navigate to="/Login" />} />
            <Route path="/navbar" element={ <PrivateRoute > <Navbar /> </PrivateRoute>}/>
            <Route path="/Login" element={ <PrivateRoute isProtected={false}> <Login /> </PrivateRoute>}/>
            <Route path="/Register" element={ <PrivateRoute isProtected={false}> <RegisterCheck /> </PrivateRoute>}/>
            <Route path="/dashboard" element={ <PrivateRoute> <Dashboard /> </PrivateRoute>}/>
            <Route path="/home" element={ <PrivateRoute > <Home /> </PrivateRoute>}/>
            <Route path="/about" element={ <PrivateRoute > <About /> </PrivateRoute>}/>
            <Route path="/search_results" element={<PrivateRoute> <SearchResults/> </PrivateRoute>}/>
            <Route path="/orders" element={<PrivateRoute> <Orders/> </PrivateRoute>}/>
            {/* <Route path="/checkout" element={<PrivateRoute> <Checkout/> </PrivateRoute>}/> */}
            <Route path="*" element={<Error/>}></Route>
  {/* <Route path="/sessionexpire" element={ <PrivateRoute > <SessionExpire /> </PrivateRoute>}/> */}
            <Route path="/sessionexpire" element={<SessionExpire/>}/>
             <Route path='/payment_gateway' element={<PrivateRoute> <Payment/> </PrivateRoute>}/> 
             <Route path='/orders_list' element={<PrivateRoute> <OrdersList/> </PrivateRoute>}/> 
             <Route path='/restaurant_food' element={<PrivateRoute> <RestaurantFood/> </PrivateRoute>}/> 
             <Route path='/food_items' element={<PrivateRoute> <FoodItems/> </PrivateRoute>}/> 
             
          </Routes>
          {/* <Footer/> */}
        </Router>
        <CustomToastContainer/>
        </CartProvider>
        </AuthProvider>
      </div>
  );
}

export default App;
