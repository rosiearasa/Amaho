//check if the user has access to the pages-- authorization set up for client pages


// make requests to be to current user endpoint

import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";

export default function PrivateRoute(){
    //context

    const [auth, setAuth] = useAuth();
    const [ok, setOk] = useState(false);

    useEffect(() => {
        if(auth?.token) getCurrentUser() 
    }, [auth?.token])

    const getCurrentUser = async ()=> {
        try{
            const {data} = await axios.get('/current-user', {
                headers:{
                    Authorization:auth?.token,
                },
            });
            

            setOk(true);

        } catch (err){
            setOk(false);
        }
    };

    return ok ? <Outlet/> : "";

}