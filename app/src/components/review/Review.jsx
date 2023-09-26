import React from 'react'
import "./Review.scss"

import Like_pic from "../../Imagestemp/like.png"
import Dislike_pic from "../../Imagestemp/dislike.png"
import Star_pic from "../../Imagestemp/star.png" 

import {
  // QueryClient,
  // QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

import NewRequest from '../../utilis/NewRequest'

function Review({review}) {

  // eslint-disable-next-line
  const { isLoading, error, data} = useQuery({
    queryKey: [review.userId],
    queryFn: () => 
      NewRequest.get(`/users/${review.userId}`).then((res => {
        return res.data
      }))
    
  })

  return (
    <div>
        <div className="reviews">
            <div className="item">
              {isLoading ? "Loading..." : error ? "Something went wring" : 
              <div className="user">
                <img
                  className="pp"
                  src={data.img || "https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600"}
                  alt=""
                />
                <div className="info">
                  <span>{data.username}</span>
                  <div className="country">
                    <span>{data.country}</span>
                  </div>
                </div>
              </div>}
              <div className="stars">
                {Array(review.star).fill().map((item,i) => (
                  <img src={Star_pic} alt="" key={i}/>
                ))}
                <span>{review.star}</span>
              </div>
              <p>
                {review.desc}
              </p>
              <div className="helpful">
                <span>Helpful?</span>
                <img src={Like_pic} alt="" />
                <span>Yes</span>
                <img src={Dislike_pic} alt="" />
                <span>No</span>
              </div>
            </div>
            <hr />
          </div>
    </div>
  )
}

export default Review