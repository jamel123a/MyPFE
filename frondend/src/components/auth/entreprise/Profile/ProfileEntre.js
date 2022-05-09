import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetProfile } from '../../../redux/action/Profile.Actions'
import { showErrMsg, showSuccesMsg } from '../../../util/notification/Notification'
import { isLength } from '../../../util/Validation'

const intialState={
  err :'',
  success :'',
  firstName:'',
  lastName:'',
  email:'',
  password :'' ,
  description :'',
  website :'',
  numberPhone :'',
  nomEntreprise :'',
  address :''
     

}



function DashbordEntreprise() {

  const dispatch =useDispatch()
  const profile =useSelector(state=>state.profile.profile)
  const [data,setData]=useState(intialState)
  const [avatar,setAvatar]=useState(false)
  const [loading,setLoading]=useState(false)
  const {err,success,password,email,firstName,lastName ,description,nomEntreprise,website,numberPhone,address} =data

  const onChangeHandler=e=>{
    const {name,value}=e.target
    setData({...data,[name]:value,err:'',success:''})
}

  useEffect(async()=>{
    await dispatch(GetProfile())
  //setData(profile)
 },[])
  
 
 const changeAvatar=async(e)=>{
    e.preventDefault()
    try{
    const file =e.target.files[0]
    if(!file) return setData({...data,err:"no filesaaaaaaaa were uploed",success:''})
    
    if(file.size >1024 *1024) 
    return  setData({...data,err:"Size so large",success:''})
   
    if(file.type !== 'image/jpeg' && file.type !== 'image/png')
    return   setData({...data,err:"file must be a image",success:''})
    
    let formData =new FormData()
    formData.append('file',file)
    setLoading(true)
    console.log(formData)
    const res =await axios.post('http://localhost:6600/api/entreprise/upload_avatar',formData,{
        headers:{'content-type' :'multipart/form-data'}
    })
    setLoading(false)
    setAvatar(res.data.url)
      
    }catch(err){
       setData({...data,err:err.response.data.msg,success:''})   
    }
 }
    const updateInfor =async()=>{
     
      try{
           await axios.put('http://localhost:6600/api/entreprise/update',{
            
            avatar :avatar ?avatar : profile.avatar,
            firstName :firstName ? firstName :profile.firstName,
            lastName :lastName ? lastName :profile.lastName,
            email :email ? email :profile.email,
            address :address? address: profile.address,
            nomEntreprise :nomEntreprise? nomEntreprise: profile.nomEntreprise,
            numberPhone :numberPhone ?numberPhone :profile.numberPhone,
            website :website ?website :profile.website,
            description :description ? description :profile.description,
           

            
          
          })
          setData({...data,err:'',success :"Updated Success"})
      }catch(err){

      setData({...data,err:'something wrong',success:''})   

    }
    }

    const updatePassword =()=>{
         if (isLength(password))
        return setData({...data,err :"Le mot de passe doit être au moins de 6 caractères",success :''})
   
        
        try{
             axios.post('http://localhost:6600/api/resetpassword',{password})
           console.log(password)
            setData({...data,err:'',success :"Updated Success"})
   
           }catch(err){
           setData({...data,err:err.response.data.msg,success:''})   
   
        }
      }

      
  
 const handleUpdate =()=>{
  if(firstName || lastName || avatar  || email || address || nomEntreprise || numberPhone || description || website) updateInfor()
  if (password) updatePassword()
}


  return (
    <>
       {err && showErrMsg(err)}
      {success && showSuccesMsg(success)} 
   <div className='container profile mt-3 border'>
   <div className='col-left' >
 
   <h2 className='nom_profile'>Entreprise Profile Edit</h2>

             
         <div className='avatar1'>
         
            <img src={avatar ? avatar :profile.avatar} alt="" name="avatar"></img>
            <span>
                <i className="fas fa-camera"></i>
                <p>change</p>
                <input type="file" name="file" id='file_up' onChange={changeAvatar} />
            </span>
        </div>

  <div class="row mb-2">
    <div class="col">
      <div class="form-outline">
      <label class="form-label" htmlFor="form6Example1">Prenom :</label>
        <input type="text" class="form-control"  name='firstName' onChange={onChangeHandler}/>
      </div>
    </div>
    <div class="col">
      <div class="form-outline">
      <label class="form-label" htmlFor="form6Example2">Nom :</label>
        <input type="text"  class="form-control"  name='lastName' onChange={onChangeHandler}/>
       
      </div>
    </div>
  </div>
  <div class="row mb-2">
    <div class="col">
      <div class="form-outline">
      <label class="form-label" htmlFor="form6Example1">Email :</label>
        <input type="email"  class="form-control" name='email' onChange={onChangeHandler} />

      </div>
    </div>
    <div class="col">
      <div class="form-outline">
      <label class="form-label" htmlFor="form6Example2">Address :</label>
        <input type="text" class="form-control" name='address' onChange={onChangeHandler} />
      </div>
    </div>
  </div>
  <div class="row mb-2">
    <div class="col">
      <div class="form-outline">
      <label class="form-label" htmlFor="form6Example1">Nom Entreprise :</label>
        <input type="text" class="form-control" name='nomEntreprise' onChange={onChangeHandler}/>

      </div>
    </div>
    <div class="col ">
      <div class="form-outline">
      <label class="form-label" htmlFor="form6Example2">Telephone :</label>
        <input type="number"  class="form-control" name='numberPhone'  onChange={onChangeHandler}/>
      </div>
    </div>
  </div>
 
   <div class="row mb-2">
    <div class="col">
      <div class="form-outline">
      <label class="form-label" htmlFor="form6Example1">Site web  :</label>
        <input type="text"  class="form-control" name='website' onChange={onChangeHandler}/>

      </div>
    </div>
    <div class="col">
      <div class="form-outline">
      <label class="form-label" htmlFor="form6Example2">Mode de pass :</label>
        <input type="password"  class="form-control" name='password'  onChange={onChangeHandler}/>
      </div>
    </div>
  </div>


  <div class="form-outline mb-2">
  <label class="form-label" htmlFor="form6Example7">description :</label>
    <textarea class="form-control"   rows="4" name='description' onChange={onChangeHandler} ></textarea>
  
  </div>

  

  <button  onClick={handleUpdate} className="btn btn-primary mt-3 mb-5">Change</button>
    </div>
   
   </div>
   </>
  )
}

export default DashbordEntreprise