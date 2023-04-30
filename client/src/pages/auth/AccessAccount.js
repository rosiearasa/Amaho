import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";


export default function AccessAccount(){

const [auth, setAuth] = useAuth();
const navigate = useNavigate()

const {token} = useParams();
 useEffect(() =>{
   if(token) requestAccess()

 }, [token]);

 const requestAccess = async ()=>{
    try {
        const {data} = await axios.post(`/access-account`, {resetCode: token});
        if(data.err){
            toast.error(data.error);
        }
        else{
            //save in local storage
            localStorage.setItem("auth", JSON.stringify(data));
            //save in context
            setAuth(data);
            toast.success("Please Update Your Password in profile page");
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