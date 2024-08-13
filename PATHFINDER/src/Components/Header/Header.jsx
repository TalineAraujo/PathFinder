import React from "react";
import { Link } from "react-router-dom";
import './header.css'
import { FaUser, FaMapMarkerAlt, FaSignOutAlt, FaHome } from 'react-icons/fa';


const Header = () => {
    const handleLogout = () =>(
        console.log('teste saindo')

    );

    function logout() {
        localStorage.removeItem('token');
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
                <button className="header-button" onClick={handleLogout} > <FaSignOutAlt /> Sair </button>
                
            </div>
        </>
    )
}

export default Header