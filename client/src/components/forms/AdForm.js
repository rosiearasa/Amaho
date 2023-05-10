import { useState } from "react"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { GOOGLE_PLACES_KEY } from "../../config";
import CurrencyInput from "react-currency-input-field"
import ImageUpload from "./ImageUpload";

export default function AdForm ({action, type})  {
    const [ad, setAd] = useState({
        photos:[],
        uploading: false,
        price:"",
        address:'',
        bedrooms:'',
        carpack:'',
        type:'',
        title:'',
        description:'',
        apartmentsize:'',
        loading:false,
        });

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
 value = {ad.carpack}
 onChange={e => setAd({...ad, carpack:e.target.value})}
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
 
 <button className="btn btn-primary"> Submit</button>


 <pre>
    {JSON.stringify(ad , null, 4)}
 </pre>
    </>
    
)};