import React from 'react'
import '../../style.css'
import {Link} from 'react-router-dom'
function RegisterEntreprise() {
  return (
   <>
   
   <div className="container shadow my-5">
        <div className="row justify-content-end">
          <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form order-2">
            <h1 className="display-4 fw-bolder">Bonjour</h1>
            <p className="lead text-center">Entrez vos coordonnées pour vous inscrire</p>
            <h5 className="mb-4">ou</h5>
            <Link
              to="/entreprise/signin"
              className="btn btn-outline-light rounded-pill pb-2 w-50"
            >
              Connexion
            </Link>
            <h5 className="mb-4">ou</h5>
            <Link
              to="/condidat/signup"
              className="btn btn-outline-light rounded-pill pb-2 w-50 "
            >
              espase condidat
            </Link>
            
          </div>
          <div className="col-md-6 p-5">
            <form  method="POST">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                Prénom *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="username"  
                />
                
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                Nom de famille *
                </label>
                <input type="text" className="form-control"  id="name"   name="username"  />
                
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                Adresse e-mail *
                </label>
                <input
                  type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  name="email" 
                />
                <div id="emailHelp" className="form-text">   Nous ne partagerons jamais votre e-mail avec quelqu'un d'autre. </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                Mot de passe *
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="password"
                />    
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                Nom de Entreprise *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="nomEntreprise"
                /> 
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                Telephone *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="numberPhone"
                />     
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                site web *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="website"
                />     
                
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                adresss *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="address"
                />     
              </div>

              <button type="submit" className="btn btn-outline-primary w-100 mt-4 rounded-pill">
              S'inscrire
              </button>
            </form>
          </div>
        </div>
      </div>
   </>
  )
}

export default RegisterEntreprise