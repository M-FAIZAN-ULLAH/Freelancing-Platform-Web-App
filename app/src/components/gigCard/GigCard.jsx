import React from 'react'
import { Link } from 'react-router-dom'
import "./GigCard.scss"

import {
  // QueryClient,
  // QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

import Star_icon from "../../Imagestemp/star.png"
import Heart_icon from "../../Imagestemp/heart.png"
import NewRequest from '../../utilis/NewRequest'

const GigCard = ({ item }) => {
  // eslint-disable-next-line 
  const { isLoading, error, data } = useQuery({
    queryKey: ['gigs'],
    queryFn: () => 
      NewRequest.get(`/users/${item.userId}`).then((res => {
        return res.data
      }))
    
  })


    return (
      <Link to={`/gig/${item._id}`} className="link">
        <div className="gigCard">
          <img src={item.cover} alt="" />
          <div className="info">
            {isLoading ? ("Loading...")
             : error ? ("Something went wrong") 
             : (
              <div className="user">
              <img src={data.img || "https://images.pexels.com/photos/1115697/pexels-photo-1115697.jpeg?auto=compress&cs=tinysrgb&w=1600"} alt="" />
              <span>{data.username}</span>
            </div>
             )
            }
            <p>{item.desc}</p>
            <div className="star">
              <img src={Star_icon} alt="" />
              <span>{!isNaN(Math.round(item.totalStars / item.starNumber)) && Math.round(item.totalStars / item.starNumber)}</span>
            </div>
          </div>
          <hr />
          <div className="detail">
            <img src={Heart_icon} alt="" />
            <div className="price">
              <span>STARTING AT</span>
              <h2>
                $ {item.price}
              </h2>
            </div>
          </div>
        </div>
      </Link>
    );
  };

export default GigCard