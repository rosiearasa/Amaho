
import AdForm from "../../../components/forms/AdForm";
import Sidebar from "../../../components/Nav/Sidebar";

export default  function  SellApartment(){
   
    return (
        <div>
            
           <h1 className= "display-1 bg-primary text-light p-5">List Apartment</h1>
           <Sidebar/>
           <div className="container mt-2">
            <AdForm action= "Sell" type= "Apartment"/>

           </div>
           
        </div>
    )
}
