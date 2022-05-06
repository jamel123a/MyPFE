import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

function RowDetails({firstName,lastName,email,avatar,Id,OnDelete}) {
   
  return (
          <tr>
                     <th scope="row">1</th>
                    <td><img className='avatar' src={avatar}/></td>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{email}</td>
                    <td className='d-flex justify-content-between'>
                        <Link to={`/admin/DetailsCondidat/${Id}`}>
                            <button className='btn btn-primary'>
                                <i class='fas fa-edit'></i></button>
                       </Link>
                        <button className='btn btn-danger' onClick={()=>OnDelete(Id)}><i class='fas fa-trash'></i></button>
                    </td>
        </tr>
  )
}
export default RowDetails