import React from "react";
import { Link, Navigate } from "react-router-dom";
import './header.css'
import { FaUser, FaMapMarkerAlt, FaSignOutAlt, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem('token');
        navigate('/login')
    }

    return (
        <>
            <div className="header">
            <h2 className="header-title">Pathfinder</h2>
                <nav>
                    <ul>
                        <li>
                            <Link to="/"> <FaHome/> Dashbord </Link>
                        </li>
                        <li>
                            <Link to="/usuarios"> <FaUser/> Usuários </Link>
                        </li>
                        <li>
                            <Link to="/local"> <FaMapMarkerAlt/> Locais </Link>
                        </li>
                    </ul>
                </nav>
                <button className="header-button" onClick={logout} > <FaSignOutAlt /> Sair </button>
                
            </div>
        </>
    )
}

export default Header