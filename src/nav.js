import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Nav() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 shadow-sm">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img
                        src={`${process.env.PUBLIC_URL}/MOSS.png`}
                        alt="Logo"
                        height="40"
                        className="d-inline-block align-text-top"
                    />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav">
                        <a
                            href="#"
                            onClick={() => navigate("/about-us")}
                            className={`nav-link ${location.pathname === "/about-us" ? "active" : ""}`}
                        >
                            Moss coevaluación
                        </a>
                        <a
                            href="#"
                            onClick={() => navigate("/menu/assessment")}
                            className={`nav-link ${location.pathname.startsWith("/menu/assessment") ? "active" : ""}`}
                        >
                            Assessment
                        </a>
                        <a
                            href="#"
                            onClick={() => navigate("/menu/players")}
                            className={`nav-link ${location.pathname === "/menu/players" ? "active" : ""}`}
                        >
                            Jugadores
                        </a>
                    </div>
                    <span className="navbar-text ms-auto me-3">
                        Gracias por elegirnos
                    </span>
                    <button
                        className="btn btn-danger"
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/login");
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Nav;