import React from 'react'

function Card({post}) {
  return (
    <div className='border mt-3' >
     <div class="row">
    <div class="col">
      1 of 3
    </div>
    <div class="col-9">
      2 of 3 (wider)
    </div>
    <div class="col">
      3 of 3
    </div>
  </div>

    </div>
  )
}

export default Card