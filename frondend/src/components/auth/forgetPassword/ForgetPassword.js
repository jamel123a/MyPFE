import React from 'react'

function ForgetPassword() {
  return (
    <div className="container shadow my-5">
      <div className="row">
        <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
         
         
        
          
        </div>
        <div className="col-md-6 p-5">
          <h1 className="display-6 fw-bolder mb-5">mode de pass oublier</h1>
        
          <form >
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
              Adresse e-mail
              </label>
              <input  type="email"  className="form-control"  id="exampleInputEmail1"  aria-describedby="emailHelp" name="email"    />
             
            
            </div>
           
          
            <button  type="submit" className="btn btn-primary w-100 mt-4 rounded-pill">
              ENVOIYER  
            </button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default ForgetPassword