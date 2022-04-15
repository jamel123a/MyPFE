import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Offre = ({match})=> {
  console.log(match.params.pageNumber)
const [posts,setPosts] =useState([]);
const [loading,setLoding]=useState(false);
const [error,setError] =useState(false);


const [page,setPage]=useState(1);
const [pages,setPages]=useState(1);

useEffect(()=>{
  
    const fetchPosts = async()=>{
        setLoding(true);
        try{
         const res =await fetch(`http://localhost:6600/api/offre/alloffres?page=${page}`); 
        console.log(res)
         const {data, pages: totalPages}=await res.json();

         setPages(totalPages);
         setPosts(data);
         setLoding(false);
             
   
        }catch (error){
            console.log(error)
            setLoding(false)
            setError('some eroor')
       }
  };
   fetchPosts()
},[page])
  return (
   <>
   
   </>
  )
}

export default Offre;