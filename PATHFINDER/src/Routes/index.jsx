import { Route, Routes } from "react-router-dom";
import {Login} from "../Pages/Login";
import {Cadastro} from "../Pages/Cadastro";
import {Home} from "../Pages/dashbord/home";

export function AppRoutes(){
    return (
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/cadastro" element={<Cadastro/>} />
            <Route path="/dashbord" element={<Home/>} />
        </Routes>
    )
}