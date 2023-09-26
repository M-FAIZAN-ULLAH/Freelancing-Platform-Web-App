import React, { useEffect, useRef, useState } from 'react'
import "./Gigs.scss"

import {
  // QueryClient,
  // QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

// import { gigs } from "../../data"
import GigCard from '../../components/gigCard/GigCard'

import Down_pic from "../../Imagestemp/down.png"
import newRequest from '../../utilis/NewRequest'
import { useLocation } from 'react-router-dom'

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();
 
  const { search } = useLocation()

  const { isLoading, error, data, refetch} = useQuery({
    queryKey: ['gigUser'],
    queryFn: () => 
      newRequest.get(`/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`).then((res => {
        return res.data
      }))
    
  })

  

  useEffect(() => {
    refetch()
    // eslint-disable-next-line
  }, [sort])

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  const apply = ()=>{
    refetch()
  }

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Liverr {">"} Graphics & Design {">"}</span>
        <h1>AI Artists</h1>
        <p>
          Explore the boundaries of art and technology with Liverr's AI artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src={Down_pic} alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                  )}
                  <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
          {isLoading
           ? "Loading..." 
           : error 
           ? "Something went wrong!" 
           : data.map(item => (
            <GigCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gigs;