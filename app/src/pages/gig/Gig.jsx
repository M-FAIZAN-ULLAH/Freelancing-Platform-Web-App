import React from 'react'
import "./Gig.scss"
import Slider from "infinite-react-carousel"

import Star_pic from "../../Imagestemp/star.png"

import Recycle_pic from "../../Imagestemp/recycle.png"
import Greencheck_pic from "../../Imagestemp/greencheck.png"
import Clock_pic from "../../Imagestemp/clock.png"

import Reviews from '../../components/reviews/Reviews'

import {
  // QueryClient,
  // QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'
import NewRequest from '../../utilis/NewRequest'


function Gig() {

  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["gig"],
    queryFn: () =>
      NewRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ["usergig"],
    queryFn: () =>
      NewRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  return (
    <div className="gig">
      {isLoading ? (
        "loading"
      ) : error ? (
        "Something went wrong!"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              Fiverr {">"} Graphics & Design {">"}
            </span>
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser.img || "https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"}
                  alt=""
                />
                <span>{dataUser.username}</span>
                {!isNaN(data.totalStars / data.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(data.totalStars / data.starNumber))
                      .fill()
                      .map((item, i) => (
                        <img src={Star_pic} alt="" key={i} />
                      ))}
                    <span>{Math.round(data.totalStars / data.starNumber)}</span>
                  </div>
                )}
              </div>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data.images.map((img) => (
                <img key={img} src={img} alt="" />
              ))}
            </Slider>
            <h2>About This Gig</h2>
            <p>{data.desc}</p>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong!"
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img src={dataUser.img || "https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"} alt="" />
                  <div className="info">
                    <span>{dataUser.username}</span>
                    {!isNaN(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src={Star_pic} alt="" key={i} />
                          ))}
                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                    <button>Contact Me</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{dataUser.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser.desc}</p>
                </div>
              </div>
            )}
            <Reviews gigId={id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>$ {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src={Clock_pic} alt="" />
                <span>{data.deliveryDate} Days Delivery</span>
              </div>
              <div className="item">
                <img src={Recycle_pic} alt="" />
                <span>{data.revisionNumber} Revisions</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div className="item" key={feature}>
                  <img src={Greencheck_pic} alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Link to={`/pay/${id}`}>
            <button>Continue</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );

  // const { id } = useParams()

  
  // const { isLoading, error, data } = useQuery({
  //   queryKey: ['gig'],
  //   queryFn: () => 
  //     NewRequest.get(`/gigs/single/${id}`).then((res => {
  //       return res.data
  //     }))
    
  // })

  // // eslint-disable-next-line
  // const { isLoading: isLoadingUser, error: errorUser, data: dataUser} = useQuery({
  //   queryKey: ['user'],
  //   queryFn: () => 
  //     NewRequest.get(`/users/${data.userId}`).then((res => {
  //       return res.data
  //     }))
    
  // })

  // return (
  //   <div className="gig">
  //     {isLoading ? "Loading..." : error ? "Something went wrong!" :
  //      <div className="container">
  //       <div className="left">
  //         <span className="breadcrumbs">Liverr {">"} Graphics & Design {">"}</span>
  //         <h1>{data.title}</h1>
  //         <div className="user">
  //           <img
  //             className="pp"
  //             src={dataUser.img || "https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"}
  //             alt=""
  //           />
  //           <span>{dataUser.username}</span>
  //           {!isNaN(Math.round(data.totalStars / data.starNumber)) && 
  //           <div className="stars">
  //             {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item,i) => (
  //               <img src={Star_pic} alt="" key={i}/> 
  //             ))}
  //             <span>{Math.round(data.totalStars / data.starNumber)}</span>
  //           </div>}
  //         </div>
  //         <Slider slidesToShow={1} arrowsScroll={1} className="slider">
  //           {data.images.map((img) => (
  //             <img key={img} src={img} alt=''/>
  //           ))}
  //         </Slider>
  //         <h2>About This Gig</h2>
  //         <p>
  //           {data.desc}
  //         </p>
  //         <div className="seller">
  //           <h2>About The Seller</h2>
  //           <div className="user">
  //             <img
  //               src="https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"
  //               alt=""
  //             />
  //             <div className="info">
  //               <span>{dataUser.username}</span>
  //               {!isNaN(Math.round(data.totalStars / data.starNumber)) && 
  //           <div className="stars">
  //             {Array(Math.round(data.totalStars / data.starNumber)).fill().map((item,i) => (
  //               <img src={Star_pic} alt="" key={i}/> 
  //             ))}
  //             <span>{Math.round(data.totalStars / data.starNumber)}</span>
  //           </div>}
  //               <button>Contact Me</button>
  //             </div>
  //           </div>
  //           <div className="box">
  //             <div className="items">
  //               <div className="item">
  //                 <span className="title">From</span>
  //                 <span className="desc">{dataUser.country}</span>
  //               </div>
  //               <div className="item">
  //                 <span className="title">Member since</span>
  //                 <span className="desc">Aug 2022</span>
  //               </div>
  //               <div className="item">
  //                 <span className="title">Avg. response time</span>
  //                 <span className="desc">4 hours</span>
  //               </div>
  //               <div className="item">
  //                 <span className="title">Last delivery</span>
  //                 <span className="desc">1 day</span>
  //               </div>
  //               <div className="item">
  //                 <span className="title">Languages</span>
  //                 <span className="desc">English</span>
  //               </div>
  //             </div>
  //             <hr />
  //             <p>
  //               {dataUser.desc}
  //             </p>
  //           </div>
  //         </div>
  //         <Reviews gigId={id}/>
  //       </div>
  //       <div className="right">
  //         <div className="price">
  //           <h3>{data.shortTitle}</h3>
  //           <h2>$ {data.price}</h2>
  //         </div>
  //         <p>
  //           {data.shortDesc}
  //         </p>
  //         <div className="details">
  //           <div className="item">
  //             <img src={Clock_pic} alt="" />
  //             <span>{data.deliveryDate} Days Delivery</span>
  //           </div>
  //           <div className="item">
  //             <img src={Recycle_pic} alt="" />
  //             <span>{data.revisionNumber} Revisions</span>
  //           </div>
  //         </div>
  //         <div className="features">
  //           {data.features.map((features) => (
  //             <div className="item" key={features}>
  //               <img src={Greencheck_pic} alt="" />
  //               <span>{features}</span>
  //             </div>
  //           ))}
  //         </div>
  //         <button>Continue</button>
  //       </div>
  //     </div>}
  //   </div>
  // );
}

export default Gig