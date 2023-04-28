import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from "./components/Nav/Main"
import {Toaster} from "react-hot-toast"

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from "./context/auth";
function App() {
  return (

   < BrowserRouter>
   <Main/>
   <Toaster/>
    
   <AuthProvider>
   <Routes>

    <Route path= "/" element={<Home/>}/>
    <Route path= "/login" element={<Login/>}/>
    <Route path= "/register" element={<Register/>}/>
   </Routes>
   </AuthProvider>
   </BrowserRouter>
  );
}

export default App;
