import axios from 'axios';
import { data } from 'react-router-dom';
import { toast } from 'react-toastify';


const API_URL = 'http://localhost:9950/api/Master';
const User_Url = 'http://localhost:9950/api/User';



export const login = async (data) => {
  try {
    const response = await axios.post(`${User_Url}/Login`, {}, {
      params: {
        email: data.emailid,
        password: data.password,
      },
    });

    console.log("Login Response:", response); 
    // Store both token and userId
    // localStorage.setItem("authToken", response.data.value1);
    // localStorage.setItem("userId", response.data.userId);
    
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error.response ? error.response.data : error.message;
  }
};


export const register = async (data) => { 
  try 
  {
    const response = await axios.post(`${User_Url}/Register`,data); 
    return response.data;
  } 
  catch (error) 
  {
    console.error('Registration failed:', error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getImages = async(data) => {
  try 
  {
    const response = await axios.get(`${API_URL}/GetImages`, data);
    return response.data;
  } 
  catch (error) 
  {
    console.error('Error occured:', error);
    throw error.response ? error.response.data : error.message;
  }
  
}

export const tokenExpire = async (token) => {
  try {
    const response = await axios.post(`${User_Url}/TokenExpire`,
      { token }, // Send token as JSON
      // {
      //   headers: {
      //     "Content-Type": "application/json", // Ensure JSON content type
      //   },
      // }
    );
    localStorage.getItem("authToken", response.data)
    return response.data.isExpired;
  } catch (error) {
    console.error("Token validation failed:", error);
    return true; // Assume expired if the API call fails
  }
};


export const getAllRestaurants = async(data) => {
  try 
  {
    const response = await axios.get(`${API_URL}/GetAllRestaurants`, data);
    return response.data;
  } 
  catch (error) 
  {
    console.error('Error occured:', error);
    throw error.response ? error.response.data : error.message;
  }
  
}

export const getAllMenuItems = async(data) => {
  try 
  {
    const response = await axios.get(`${API_URL}/GetAllMenuItems`, data);
    return response.data;
  } 
  catch (error) 
  {
    console.error('Error occured:', error);
    throw error.response ? error.response.data : error.message;
  }
  
}

export const getAllFoodItems = async(data) => {
  try 
  {
    const response = await axios.get(`${API_URL}/GetAllFoodItems`, data);
    return response.data;
  } 
  catch (error) 
  {
    console.error('Error occured:', error);
    throw error.response ? error.response.data : error.message;
  }
  
}

export const getFoodItemsByMenuId = async (menuId) => {
  try {
      console.log("menuidd",menuId)
      const response = await axios.get(`${API_URL}/GetFoodItemsByMenuId`,{
        params: { menuId },
      });
      return response.data;
  } catch (error) {
      console.error("Error fetching food items by menu ID:", error);
      throw error.response ? error.response.data : error.message;
  }
};

export const getFoodItemsByRestaurantId = async (restaurantId) => {
  try {
      
      const response = await axios.get(`${API_URL}/GetFoodItemsByRestaurantId`,{
        params: { restaurantId },
      });
      console.log("res_sXzid",response)
      return response.data;
  } catch (error) {
      console.error("Error fetching food items by menu ID:", error);
      throw error.response ? error.response.data : error.message;
  }
};


export const searchItems = async (query) => {
  if (!query.trim()) {
      throw new Error("Query cannot be empty");
  }

  try {
      const response = await axios.get(`${API_URL}/search`, {
          params: { query },
      });
      console.log("API Response:", response.data);
      return response.data;
  } catch (error) {
      console.error("Error fetching search results:", error);
      throw error.response ? error.response.data : error.message;
  }
};

export const addandRemoveCart = async (data) => {
  try {
      const response = await axios.post(`${API_URL}/AddandRemoveCart`, data);
      console.log(data);
      
      return response.data;
  } catch (error) {
      console.error("Cart update failed:", error);
      throw error.response ? error.response.data : error.message;
  }
};

export const orderedFoodItems = async (userId) => {
  try {
      const response = await axios.get(`${API_URL}/OrderedFoodItems`, {
          params: { userId },
      });
      return response.data;
  } catch (error) {
      console.error("Failed to fetch cart summary:", error);
      throw error.response ? error.response.data : error.message;
  }
};

export const processOrder = async (UserId) => {
  try {
    // console.log(`${API_URL}/ProcessOrder`,user_Id)
    const response = await axios.post(`${API_URL}/ProcessOrder`, {},{
        params: {UserId},
        // params: { hjh },
    });
      return response.data;
  } catch (error) {
      console.error("Failed to fetch cart summary:", error);
      throw error.response ? error.response.data : error.message;
  }
};

export const ordersList = async (userId) => {
  try {
      const response = await axios.get(`${API_URL}/OrdersList`, {
          params: { userId }, // Properly passing userId as query parameter
      });
      return response.data;
  } catch (error) {
      console.error("Failed to fetch orders list:", error);
      throw error.response ? error.response.data : error.message;
  }
};

export const getTotalCartItems = async (userId) => {
  try {
      const response = await axios.get(`${API_URL}/TtotalItems`, {
          params: { userId }, 
      });
      return response.data;
  } catch (error) {
      console.error("Failed to fetch orders list:", error);
      throw error.response ? error.response.data : error.message;
  }
};
