import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


    const CustomToastContainer = () => {
        return(
            <ToastContainer 
                position="bottom-center" // Position at the bottom center
                autoClose={3000}         // Close after 3 seconds
                closeOnClick
                hideProgressBar={false}
                newestOnTop={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                // toastStyle={{
                //     backgroundColor: '#60b246', color: 'white', width: '100%'
                // }}
                
            ></ToastContainer>
        )
    }


export default CustomToastContainer
