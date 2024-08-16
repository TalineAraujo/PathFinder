import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Signin/Login";
import Cadastro from "../Pages/Signup/Cadastro";
import Home from '../Pages/dashbord/home/Dashboard';
import Local from "../Pages/Locais/Local";
import CadastroLocal from '../Pages/Locais/CadastroLocal';
import EditarLocal from "../Pages/Locais/EditarLocal";
import Usuarios from '../Pages/Usuarios/Usuarios';


export function AppRoutes() {
    return(
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/cadastro" element={<Cadastro/>} />
            <Route path="/local" element={<Local/>} />
            <Route path="/cadastroLocal" element={<CadastroLocal/>} />
            <Route path="/editarLocal/:local_id" element={<EditarLocal/>} />
            <Route path="/usuarios" element={<Usuarios />} />
        </Routes>
    );
}