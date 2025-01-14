import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./initial.css"; // Asegúrate de crear este archivo CSS

function Initial() {
    const [pin, setPin] = useState(0);
    const [error, setError] = useState("");
    const [text, setText] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch(`http://${process.env.REACT_APP_IP}:8000/user-login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ pin }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                navigate("/game");
            } else {
                setError(data.detail || "Error de autenticación");
            }
        } catch (error) {
            setError("PIN incorrecto");
        }
    };

    function handleAdminClick() {
        navigate("/login");
    }

    useEffect(() => {
        const textArray = "BBienvenido a una enseñanza de calidad".split("");
        let index = 0;
        const interval = setInterval(() => {
            setText((prev) => prev + textArray[index]);
            index++;
            if (index === textArray.length) {
                clearInterval(interval);
                setTimeout(() => {
                    setText("");
                    index = 0;
                }, 1000); // Espera 1 segundo antes de reiniciar el texto
            }
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-light position-relative">
            {/* Botón Admin en la parte superior derecha */}
            <button
                type="button"
                className="btn btn-secondary position-absolute top-0 end-0 m-3"
                onClick={handleAdminClick}
            >
                Inicia sesión
            </button>

            <div className="text-center mb-4">
                <img src={`${process.env.PUBLIC_URL}/MOSS.png`} alt="MOSS Logo" className="mb-3" style={{ width: "150px" }} />
                <h1 className="mb-3">Moss-Coevaluación</h1>
                <h2 className="animated-text">{text}</h2>
            </div>

            <div className="card p-4 mb-2" style={{ maxWidth: "400px" }}>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <h3 className="card-title text-center mb-3">Jugar</h3>
                        {/* Campo Usuario */}
                        <div className="mb-3">
                            <label htmlFor="pin" className="form-label">
                                PIN proporcionado por el profesor
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="pin"
                                value={pin != 0 ? pin : ""}
                                onChange={(e) => setPin(e.target.value)}
                                placeholder="PIN"
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-100 mb-2"
                        >
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
            {error && (
                <div
                    className="alert alert-danger"
                    style={{ maxWidth: "400px" }}
                >
                    {error}
                </div>
            )}
        </div>
    );
}

export default Initial;