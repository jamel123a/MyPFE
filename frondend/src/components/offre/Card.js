import React from 'react'
import { Link } from 'react-router-dom'
import './Card.css'
function Card({post}) {
  console.log(post)
  return (
    <div className='border mt-3 border-info offres' >
     <div class="row mt-3">
    <div class="col image_en">
    <img className='image_entreprise border' src={post.createBy.avatar} alt=''/>
    </div>
    <div class="col-9 padding">
      <h4 className='title_offre'>{post.name}</h4>
      <hr></hr>
      <h5 className='Nom_de_entreprise'>{post.createBy.nomEntreprise}</h5>
      <h5 className='dres_offre'>{post.description}</h5>

    </div>
    <div class="col padding button_en">
    <Link to={`/offre/details/${post._id}`} class="btn btn-primary active" aria-current="page">view plus</Link>
    </div>
  </div>
  <div class="aaaa">
  <i class="fa-solid fa-clock size"><h5 className='en'>{post.updatedAt}</h5></i>
  <i class="fa-solid fa-location-dot size"><h5 className='en'>{post.lieu}</h5></i>
  </div>
    </div>
  )
}

export default Card