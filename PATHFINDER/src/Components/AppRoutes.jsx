import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../Pages/Signin/Login";
import Cadastro from "../Pages/Signup/Cadastro";
import Home from '../Pages/dashbord/home/Dashboard';
import Local from "../Pages/Locais/Local";
import CadastroLocal from '../Pages/Locais/CadastroLocal';
import EditarLocal from "../Pages/Locais/EditarLocal";
import Usuarios from '../Pages/Usuarios/Usuarios';
import PrivateRoute from "./PrivateRoute";


export function AppRoutes() {
    return(
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/cadastro" element={<Cadastro/>} />
            <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>} />
            <Route path="/local" element={<PrivateRoute><Local/></PrivateRoute>} />
            <Route path="/cadastroLocal" element={<PrivateRoute><CadastroLocal/></PrivateRoute>} />
            <Route path="/editarLocal/:local_id" element={<PrivateRoute><EditarLocal/></PrivateRoute>} />
            <Route path="/usuarios" element={<PrivateRoute><Usuarios/></PrivateRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}