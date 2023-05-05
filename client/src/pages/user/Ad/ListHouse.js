
import AdForm from "../../../components/forms/AdForm";
import Sidebar from "../../../components/Nav/Sidebar";

export default  function  ListHouse(){
   
    return (
        <div>
            
           <h1 className= "display-1 bg-primary text-light p-5">Add House</h1>
           <Sidebar/>
           <div className="container mt-2">
            <AdForm action= "List" type= "House"/>

           </div>
           
        </div>
    )
}
