import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { Toast, toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";


export default function AccountActivate(){

const [auth, setAuth] = useAuth();
const navigate = useNavigate()

const {token} = useParams();
 useEffect(() =>{
   if(token) requestActivation()

 }, [token]);

 const requestActivation = async ()=>{
    try {
        const {data} = await axios.post(`/register`, {token});
        if(data.err){
            toast.error(data.error);
        }
        else{
            //save in local storage
            localStorage.setItem("auth", JSON.stringify(data));
            //save in context
            setAuth(data);
            toast.success("successfully logged in. Welcome to Realisr App");
            navigate("/");
        }
        
    } catch (err) {
        console.log(err);
        toast.error('Something went wrong. try again');
        
    }
 }

    return (
        <div className="display-1 d-flex justify-content-center align-items-center vh-100" style={{marginTop: '-5%'}}>
       Please Wait...
        </div>
    );
}