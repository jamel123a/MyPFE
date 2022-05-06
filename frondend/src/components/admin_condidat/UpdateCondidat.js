import React, { useEffect, useState } from 'react'
import InputGroup from './InputGroup'

  import "./user.css";
  import Card from '@mui/material/Card';
  import CardActions from '@mui/material/CardActions';
  import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import { useParams } from 'react-router';
import Alert from './Alert';
import { showErrMsg, showSuccesMsg } from '../util/notification/Notification';

function UpdateCondidat() {

   const {id} =useParams("");
   const [errors,setErrors]=useState({});
  const [users,setUser]=useState({})
  const [form,setForm]=useState({})
  const [select,setSelect]=useState()
  const [data,setData]=useState({})
  const [avatar,setAvatar]=useState()
  const [loading,setLoading]=useState(false)
  const [message,setMessage]=useState("")
  const [show,setShow]=useState(false)
  const {err,success,email,firstName,lastName ,role} =data



   useEffect(async()=>{
    await axios.get(`http://localhost:6600/api/dashbord/condidat/${id}`)
    .then(res=>{
        setUser(res.data)
    })
})
const onChangeHandler=e=>{
  const {name,value}=e.target
  setData({...data,[name]:value,err:'',success:''})
}

  const changeAvatar=async(e)=>{
      e.preventDefault()
      try{
      const file =e.target.files[0]
      if(!file) return setData({...data,err:"no files were uploed",success:''})
      
      if(file.size >1024 *1024) 
      return  setData({...data,err:"Size so large",success:''})
     
      if(file.type !== 'image/jpeg' && file.type !== 'image/png')
      return   setData({...data,err:"file must be a image",success:''})
      
      let formData =new FormData()
      formData.append('file',file)
      setLoading(true)
      console.log(formData)
      const res =await axios.post('http://localhost:6600/api/admin/condidat/upload_avatar',formData,{
          headers:{'content-type' :'multipart/form-data'}
      })
      setLoading(false)
      setAvatar(res.data.url)
        
      }catch(err){
         setData({...data,err:err.response.data.msg,success:''})   
      }
   }
const onSubmitHandler =async()=>{
  console.log(avatar)
  try{
   await  axios.put(`http://localhost:6600/api/dashbord/updateCondidat/${id}`,{
     firstName,lastName,email,role
   })

   setData({...data,err:'',success :"Updated Success"})
  }catch(err){

  setData({...data,err:'something wrong',success:''})   

}  
}
const onSubmitHandlerAvatar =async()=>{
  try{
   await  axios.put(`http://localhost:6600/api/dashbord/updateCondidatAvatar/${id}`,{
     avatar
   })

   setData({...data,err:'',success :"Updated Success"})
  }catch(err){

  setData({...data,err:'something wrong',success:''})   

}  
}
const handleUpdate =()=>{
  if(firstName || lastName   || email || role) onSubmitHandler()
  if (avatar) onSubmitHandlerAvatar()
}
  
  return (
  <> 
  {err && showErrMsg(err)}
   {success && showSuccesMsg(success)} 
<div className="container mt-3">
  <div className="row">
    <div className="col-sm  margin-botton">
    <Card sx={{ minWidth: 275 }}>
        <CardContent>
        <div className='col-lg-6 col-md-6 col-12'>
          <h4 className='d-flex justify-content-center mt-3'>Suite</h4>
          <h5>avatar  : <img   src={users.avatar} style={{width:70,borderRadius :'50%'}} alt="profile"/></h5>
        
          <p className='mt-3'>Prenom : <span>{users.firstName} </span></p>
          <p className='mt-3'>Nom : <span> {users.lastName} </span></p>
          <p className='mt-3'>Adresse e-mail : <span> {users.email}</span></p>
          <p className='mt-3'>Role : <span> {users.role}</span></p>
        </div>
        </CardContent>
       
      </Card>
    </div>
    <div className="col-sm border col-12 ">
    <h5 className='mt-3 d-flex justify-content-center'>change les information</h5>

    
           <InputGroup type="file" label="avatar :" name="file" id='file_up' onChangeHandler={changeAvatar}/>
           <InputGroup label="Prenom :" type="text" name="firstName" onChangeHandler={onChangeHandler} placeholder=" Enter Prenom" />
           <InputGroup label="Nom :" type="text" name="lastName" onChangeHandler={onChangeHandler} placeholder="Entrer nom"  />
           <InputGroup label="Adresse e-mail :" type="email" name="email" onChangeHandler={onChangeHandler} placeholder="Entrer Adresse e-mail"  />
           <label >role :</label>
           <select className="form-select"  name='role' onChange={onChangeHandler}>
              <option>Open this select menu</option>
              <option  value="condidat">condidat </option>
              <option value="entreprise">entreprise</option>
              <option value="admin">Admin</option>
            </select>  
           
            <button  onClick={handleUpdate} className="btn btn-primary mt-3 mb-3  ">Change</button>

    </div>

    </div>
   </div>
   </>
  )
}

export default UpdateCondidat;