import React from 'react'
import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import AddCondidat from '../../components/users/AddCondidat'
function AddCondidat1() {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
         <AddCondidat/> 
      </div>
    </div>
  )
}

export default AddCondidat1