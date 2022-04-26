import "./list.scss"
import Users from '../../components/users/Users'
const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
         <Users/> 
      </div>
    </div>
  )
}

export default List