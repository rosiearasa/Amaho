
import { useAuth } from "../../context/auth";
import Sidebar from "../../components/Nav/Sidebar";

export default  function  Dashboard(){
   
    return (
        <div>
            
           <h1 className= "display-1 bg-primary text-light p-5">Dashboard</h1>
           <Sidebar/>
           
        </div>
    )
}
