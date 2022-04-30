import React from 'react'
function OneOffre() {
  return (
<div className="container mt-5 ">
  <div className="row">
    <div className="col-8 d-flex flex-column border  mb-3">
      <div className="d-flex mt-3">
        <div className="flex-shrink-0">
          <img src="..." alt="..." />
        </div>
        <div className="flex-grow-1 ms-3">
          This is some content 
        </div>
        <button to='' class="btn btn-primary active " aria-current="page">Postuler</button>

      </div>
      <h4 className='mt-3'>nom de offre</h4>
      <div class="icon_offre d-flex flex-row mt-2">
        <i class="fa-solid fa-clock size "><h5 className='en'>jamel</h5></i>
        <i class="fa-solid fa-location-dot size "><h5 className='en'>jamel</h5></i>
      </div>
       <div className='transparent flex-column d-flex'>
         <div className='flex-row d-flex mt-2'>
         <h5 className='color_more'>Mois:</h5> <h5> 1500 Dt</h5>
         </div>
         <div className='flex-row d-flex mt-2'>
         <h5 className='color_more'>Niveau d'études :</h5> <h5> 1500 Dt</h5>
         </div>
         <div className='flex-row d-flex mt-3'>
         <h5 className='color_more'>Date d'expiration :</h5> <h5> 1500 Dt</h5>
         </div>
        
       </div>
       <p className='mt-3'>Pour renforcer nos équipes et intervenir sur différents projets d'assistance à maîtrise d'ouvrage nous cherchons un consultant ayant
          nécessairement une première expérience (minimum 2 ans), idéalement en banque ou en assurance.
          Cette opportunité offre l'avantage de rejoindre un cabinet de conseil IT, filiale d'un grand groupe dont la maison mère est l'assurance CARTE.
           Nos clients sont issus des secteurs financiers (assurances, banques, intermédiaires), de l'industrie ou des startups, ce qui assure à nos consultants
            d'intervenir sur des programmes de transformation digitale et une diversité de missions intéressantes.</p>
            <div className='flex-column d-flex mt-2'>
         <h4 className='color_more'>Exigences de Condidat :</h4>
          <p> 1500 Dt</p>
          <h4 className='color_more'>Avantage :</h4>
          <p> 1500 Dt</p>
         </div> 
        <div className=' d-flex flex-row-reverse mb-3'>
        <button to='' class="btn btn-primary ml-2"  aria-current="page">Postuler</button>
      </div>    
      
    </div>
    <div className="col-4 border mb-3">
    <div class="icon_offre d-flex flex-column mt-3">
        <i class="fa-solid fa-phone size"><h5 className='en'>jamel</h5></i>
        <i class="fa-solid fa-map-location-dot size"><h5 className='en'>jamel</h5></i>
      </div>
      <p> jdqsd  hjdfsdj jdhqsjd skqskjqshd sdhjsqhdj dhqsdhjqs sdhgjhsd </p>
     
    </div>
  </div>
</div>

  )
}

export default OneOffre