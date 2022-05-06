import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import './Profile.css'
import { showErrMsg, showSuccesMsg } from '../../../util/notification/Notification'
import { GetProfile } from '../../../redux/action/Profile.Actions'
import { isEmail, isLength } from '../../../util/Validation'
const intialState={
    err :'',
    success :'',
    firstName:'',
    lastName:'',
    email:'',
    password :''    

}
function Profile() {
    const dispatch =useDispatch()
    const profile =useSelector(state=>state.profile.profile)
    const [data,setData]=useState(intialState)
    const [avatar,setAvatar]=useState(false)
    const [loading,setLoading]=useState(false)
    const {err,success,password,email,firstName,lastName} =data
  
   
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
      const res =await axios.post('http://localhost:6600/api/condidat/profile/upload_avatar',formData,{
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
      await axios.put('http://localhost:6600/api/condidat/profile/update',{
              
              avatar :avatar ?avatar : profile.avatar,
             firstName :firstName ? firstName :profile.firstName,
              lastName :lastName ? lastName :profile.lastName,
              email :email? email: profile.email
           
           })
           setData({...data,err:'',success :"Updated Success"})
       }catch(err){

        setData({...data,err:'something wrong',success:''})   

     }
   }
   const updatePassword =()=>{
   console.log(password)
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
       if(firstName || lastName || avatar  || email) updateInfor()
       if (password) updatePassword()
   }

  return (
    <>
    {err && showErrMsg(err)}
    {success && showSuccesMsg(success)}
    
    <div className='container profile  m-5'>
     <div className='col-left'>
         <h2 className='nom_profile'>User Profile</h2>
         <div className='avatar1'>
            <img src={avatar ? avatar :profile.avatar} alt="" name="avatar"></img>
            <span>
                <i className="fas fa-camera"></i>
                <p>change</p>
                <input type="file" name="file" id='file_up' onChange={changeAvatar}/>
            </span>
        </div>
        
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">Prenom :</label>
            <input type="text" className="form-control"   name='firstName'  onChange={onChangeHandler}/>
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">Nom :</label>
            <input type="text" className="form-control" name="lastName" onChange={onChangeHandler} />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">Adresse e-mail</label>
            <input type="email" className="form-control" name="email" onChange={onChangeHandler} />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">Mode de Passe :</label>
            <input type="password" className="form-control" name="password" onChange={onChangeHandler} />
        </div>
        
        <button disabled={loading} onClick={handleUpdate} className="btn btn-primary mt-3">Change</button>
      


     </div>

    </div>
    </>
  )
}

export default Profile