import { useState } from "react"

import Sidebar from "../../../components/Nav/Sidebar"
import { useNavigate } from "react-router-dom";

export default  function  AdCreate(){
   const [sell, setAddListing] = useState(false);

   //hooks for navigation
   const navigate = useNavigate();


   const [rent, setRent] = useState(false);
    const handleAddListing =()=>{

        setAddListing(true);
        setRent(false);

    };
    const handleRent = () =>{
        setAddListing(false);
        setRent(true);

    };


    return (
        <div>
            
           <h1 className= "display-1 bg-primary text-light p-5">Ad Create</h1>
           <Sidebar/>
           <div className="d-flex justfiy-content-center align-items-center vh-100"
           style={{marginTop: "-16%"}}>
            <div className="col-lg-6">
            <button onClick= {handleAddListing} 
            className="btn btn-primary btn-lg col-12 p-5">
                <span className="h2">Add Listing</span>
                </button>
            {sell &&
             (
                <div className="my-1">
                    <button onClick={() => navigate('/ad/create/Sell/House')} 
                    className="btn btn-secondary p5 col-6">House</button>
                    <button onClick={() => navigate('/ad/create/Sell/Apartment')} 
                    className="btn btn-secondary p5 col-6">Apartment</button>
                </div>

            )}
            </div>


            <div className="col-lg-6">
            <button onClick= {handleRent}
             className="btn btn-primary btn-lg col-12 p-5">
                <span className="h2">Rent</span>
                
                </button>
             {rent &&      (
                <div className="my-1">
                    <button onClick={() => navigate('/ad/create/rent/House')} 
                    className="btn btn-secondary p5 col-6">House</button>
                    <button onClick={() => navigate('/ad/create/rent/Apartment')} 
                    className="btn btn-secondary p5 col-6">Apartment</button>
                </div>

            )}
            </div>
           </div>
        </div>
    )
}
