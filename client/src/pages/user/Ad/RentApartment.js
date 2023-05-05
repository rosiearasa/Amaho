
import AdForm from "../../../components/forms/AdForm";
import Sidebar from "../../../components/Nav/Sidebar";

export default  function  RentApartment(){
   
    return (
        <div>
            
           <h1 className= "display-1 bg-primary text-light p-5">Rent Apartment</h1>
           <Sidebar/>
           <div className="container mt-2">
            <AdForm action= "Rent" type= "Apartment"/>

           </div>
           
        </div>
    )
}
