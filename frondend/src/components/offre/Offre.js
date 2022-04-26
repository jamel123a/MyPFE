import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Card from './Card';
import Pagination from './Pagination';

const Offre = ()=> {
  const params =useParams()
  const pageNumber =params.pageNumber || 1;
const [posts,setPosts] =useState([]);
const [loading,setLoding]=useState(false);
const [error,setError] =useState(false);

const [page,setPage]=useState(pageNumber);
const [pages,setPages]=useState(1);

useEffect(()=>{
  
 const fetchPosts = async()=>{
        setLoding(true);
        try{
         const res =await fetch(`http://localhost:6600/api/offre/alloffres?page=${page}`); 
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
    <div className='container'>
    <Pagination page={page} pages={pages} changePage={setPage} />
     <div style={{marginButton:"20px"}}>
       {
         posts.map((post)=>(
           <Card key={post._id} post={post}/>
         ))
       }
     </div>
    <Pagination page={page} pages={pages} changePage={setPage}/>

   </div>
  )
}

export default Offre;