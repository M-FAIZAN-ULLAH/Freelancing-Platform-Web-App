import React from "react";
// import { Link } from "react-router-dom";
import "./Orders.scss";

import {
  // QueryClient,
  // QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

import Message_pic from "../../Imagestemp/message.png"
import { useAuth } from "../../utilis/AuthContext";
import NewRequest from "../../utilis/NewRequest";
import { useNavigate } from "react-router-dom";

const Orders = () => {

  const { currentUser } = useAuth();
  const navigate = useNavigate()

  // eslint-disable-next-line 
  const { isLoading, error, data } = useQuery({
    queryKey: ['orders'],
    queryFn: () => 
      NewRequest.get(`/orders/`).then((res => {
        return res.data
      }))
    
  })

  const handleContact = async (order) => {
    
    const sellerId = order.sellerId
    const buyerId = order.buyerId
    const id = sellerId + buyerId

    
    try {
      const res = await NewRequest.get(`/conversations/single/${id}`)  
      navigate(`/message/${res.data.id}`)
    } catch (error) {
      console.log(error)
      if(error.response.status === 500){
        const res = await NewRequest.post(`/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId
        })
        navigate(`/message/${res.data.id}`)
      }
    }
  }


  return (
    <div className="orders">
      {isLoading ? "Loading..." : error ? "Something went wrong!" :
       <div className="container">
        <div className="title">
          <h1>Orders</h1>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            {/* {<th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>} */}
            <th>Contact</th>
          </tr>
          {data.map((order) => (
          <tr key={order._id}>
            <td>
              <img
                className="image"
                src={order.img || "https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"}
                alt=""
                
              />
            </td>
            <td>{order.title}</td>
            <td>{order.price}</td>
            <td>
              <img 
              className="message"
              src={Message_pic} 
              alt="" 
              onClick={() => handleContact(order)}
              // onClick={() => console.log('Image Clicked')}
              />
            </td>
          </tr>))}
        </table>
      </div>}
    </div>
  );
};

export default Orders;