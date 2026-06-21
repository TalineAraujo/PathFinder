import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaMapMarkerAlt, FaSignOutAlt, FaHome, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './header.css';

const Header = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const close = () => setOpen(false);

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('usuarioId');
        navigate('/login');
    }

    const navLinks = [
        { to: '/',         icon: <FaHome />,         label: 'Dashboard' },
        { to: '/usuarios', icon: <FaUser />,         label: 'Usuários'  },
        { to: '/local',    icon: <FaMapMarkerAlt />, label: 'Locais'    },
    ];

    return (
        <>
            {/* Mobile top bar */}
            <div className="mobile-topbar">
                <span className="mobile-logo">PathFinder</span>
                <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu">
                    {open ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Overlay */}
            {open && <div className="sidebar-overlay" onClick={close} />}

            {/* Sidebar */}
            <aside className={`sidebar ${open ? 'sidebar--open' : ''}`}>
                <div className="sidebar-logo">
                    <FaMapMarkerAlt className="sidebar-logo-icon" />
                    <span>PathFinder</span>
                </div>

                <nav className="sidebar-nav">
                    {navLinks.map(({ to, icon, label }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`sidebar-link ${location.pathname === to ? 'sidebar-link--active' : ''}`}
                            onClick={close}
                        >
                            <span className="sidebar-link-icon">{icon}</span>
                            {label}
                        </Link>
                    ))}
                </nav>

                <button className="sidebar-logout" onClick={logout}>
                    <FaSignOutAlt />
                    <span>Sair</span>
                </button>
            </aside>
        </>
    );
};

export default Header;
