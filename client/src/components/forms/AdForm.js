import { useState } from "react"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { GOOGLE_PLACES_KEY } from "../../config";
import CurrencyInput from "react-currency-input-field"
import ImageUpload from "./ImageUpload";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import toast from "react-hot-toast"


export default function AdForm ({action, type})  {
    const [ad, setAd] = useState({
        photos:[],
        uploading: false,
        price:"",
        address:'',
        bedrooms:'',
        carpark:'',
        bathrooms:'',
        title:'',
        description:'',
        apartmentsize:'',
        loading:false,
        type,
        action,
        });
const navigate = useNavigate();

const handleClick = async () =>{
    try {
        
        setAd({...ad, loading: true});
        const {data} = await axios.post('/ad', ad);
        console.log("add create response =>", data)
        if (data?.error){
            toast.error(data.error);
            setAd({...ad, loading: false});
           
        }else{
            toast.success("Ad created successfully");
            setAd({...ad, loading: false});
            navigate("/dashboard")

        }
    } catch (error) {
        
    }

 }
return (
    <>

 <div className="mb-3 form-control">
    <ImageUpload ad={ad} setAd = {setAd}/>
    <GooglePlacesAutocomplete 
    apiKey={GOOGLE_PLACES_KEY} 
    apiOptions=""
    selectProps={{
        defaultInputValue: ad?.address, 
        placeholder:"Search for address",
        onChange:({value}) =>{
            setAd({...ad, address: value.description});

        },
    }}
    />
 </div>

 <CurrencyInput 
 placeholder="Enter Price" 
 defaultValue={ad.price} 
 className="form-control mb-3"
 onValueChange={(value) => setAd({...ad, price:value})}
 />
 <input 
 type= "number" 
 min  = "0"
 className="form-control mb-3"
 placeholder = "Enter number of bedrooms"
 value = {ad.bedrooms}
 onChange={e => setAd({...ad, bedrooms:e.target.value})}
 />

<input 
 type= "number" 
 min  = "0"
 className="form-control mb-3"
 placeholder = "Enter number of bathrooms"
 value = {ad.bathrooms}
 onChange={e => setAd({...ad, bathrooms:e.target.value})}

 />

<input 
 type= "number" 
 min  = "0"
 className="form-control mb-3"
 placeholder = "Enter number of garages"
 value = {ad.carpark}
 onChange={e => setAd({...ad, carpark:e.target.value})}
 />

<input 
 type= "text" 
 className="form-control mb-3"
 placeholder = "Enter size of Apartment"
 value = {ad.apartmentsize}
 onChange={e => setAd({...ad, apartmentsize:e.target.value})}
 />
 

<textarea 
 className="form-control mb-3"
 placeholder = "Enter title"
 value = {ad.title}
 onChange={e => setAd({...ad, title:e.target.value})}
 />
 
<textarea 
 className="form-control mb-3"
 placeholder = "Enter description"
 value = {ad.description}
 onChange={e => setAd({...ad, description:e.target.value})}
 />
 
 <button onClick ={handleClick} className={`btn btn-primary mb-5 ${ad.loading? "disabled": ""}`}> {ad.loading? "Saving...":"Submit"}</button>


 <pre>
  
 </pre>
    </>
    
)};