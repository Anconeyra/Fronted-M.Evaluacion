import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Players from "./players"; // Asegúrate de que la ruta sea correcta
import Nav from "./nav";
import Footer from "./footer";

function MenuAssessment() {
    const [assessments, setAssessments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [archiveFilter, setArchiveFilter] = useState("todos");
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("token");
    const fileInputRef = useRef(null);

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        fetchAssessments();
    }, [token]);

    const fetchAssessments = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/assessment/all/token=${token}`
            );
            if (!response.ok) {
                if (response.status === 404) {
                    setAssessments([]);
                } else {
                    throw new Error(
                        `Error ${response.status}: ${response.statusText}`
                    );
                }
            } else {
                const data = await response.json();
                setAssessments(data);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            navigate("/error");
        }
    };

    const handleInfo = (assessmentId) => {
        navigate(`/menu/assessment/${assessmentId}`);
    };

    const handleArchiveToggle = async (assessmentId, archivedStatus) => {
        try {
            const response = await fetch(
                `http://localhost:8000/assessment/${assessmentId}/archive/token=${token}`,
                { method: "POST" }
            );
            if (!response.ok) {
                throw new Error(
                    `Error ${response.status}: ${response.statusText}`
                );
            }
            fetchAssessments();
        } catch (error) {
            console.error("Fetch error:", error);
            navigate("/error");
        }
    };

    const handleDelete = async (assessmentId) => {
        if (window.confirm("¿Estás seguro de eliminar la evaluación?")) {
            try {
                const response = await fetch(
                    `http://localhost:8000/assessment/${assessmentId}/delete/token=${token}`,
                    { method: "DELETE" }
                );
                if (!response.ok) {
                    throw new Error(
                        `Error ${response.status}: ${response.statusText}`
                    );
                }
                fetchAssessments();
            } catch (error) {
                console.error("Fetch error:", error);
                navigate("/error");
            }
        }
    };

    const handleNewAssessment = () => {
        navigate("/menu/assessment/new");
    };

    const handleImportAssessment = async () => {
        const file = fileInputRef.current.files[0];
        if (!file) {
            alert("Por favor, selecciona un archivo .lgqz.");
            return;
        }

        if (!file.name.endsWith(".lgqz")) {
            alert("El archivo no tiene la extensión .lgqz");
            return;
        }

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const jsonData = JSON.parse(event.target.result);
                const response = await fetch(
                    `http://localhost:8000/assessment/create/token=${token}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(jsonData),
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        `Error ${response.status}: ${response.statusText}`
                    );
                }

                alert("Evaluación importada con éxito");
                window.location.reload(true);
            } catch (error) {
                console.error("Fetch error:", error);
                navigate("/error");
            }
        };

        reader.onerror = () => {
            console.error("Error al leer el archivo");
            alert("Error al leer el archivo");
        };

        reader.readAsText(file);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleResetFilters = () => {
        setSearchTerm("");
        setArchiveFilter("todos");
    };

    const filteredAssessments = assessments.filter((assessment) => {
        const archiveCondition =
            archiveFilter === "todos" ||
            (archiveFilter === "archivados" && assessment.archived) ||
            (archiveFilter === "noArchivados" && !assessment.archived);

        return (
            assessment.title.toLowerCase().includes(searchTerm) &&
            archiveCondition
        );
    });

    if (location.pathname === "/menu/players") {
        return <Players />;
    }

    return (
        <div className="container-fluid">
            <Nav />
            <div className="row">
                <aside className="col-md-3">
                    <button
                        className="btn btn-success mb-3 w-100"
                        onClick={handleNewAssessment}
                    >
                        Nuevo Assessment
                    </button>
                    <button
                        className="btn btn-primary mb-3 w-100"
                        onClick={triggerFileInput}
                    >
                        Importar Assessment
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept=".lgqz"
                        style={{ display: "none" }}
                        onChange={handleImportAssessment}
                    />
                    <input
                        type="text"
                        className="form-control mb-3 w-100"
                        placeholder="Buscar Assessment"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />

                    <div className="bg-light p-2 rounded-3 mb-3">
                        <div className="nav nav-pills nav-fill">
                            <button
                                className={`nav-link ${
                                    archiveFilter === "todos"
                                        ? "active bg-primary text-white"
                                        : "bg-light"
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setArchiveFilter("todos");
                                }}
                            >
                                Todos
                            </button>
                            <button
                                className={`nav-link ${
                                    archiveFilter === "archivados"
                                        ? "active bg-primary text-white"
                                        : "bg-light"
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setArchiveFilter("archivados");
                                }}
                            >
                                Archivados
                            </button>
                            <button
                                className={`nav-link ${
                                    archiveFilter === "noArchivados"
                                        ? "active bg-primary text-white"
                                        : "bg-light"
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setArchiveFilter("noArchivados");
                                }}
                            >
                                No
                                <br />
                                Archivados
                            </button>
                        </div>
                    </div>

                    <button
                        className="btn btn-secondary mb-3 w-100"
                        onClick={handleResetFilters}
                    >
                        Resetear Filtros
                    </button>
                </aside>

                <section className="col-md-9">
                    {assessments.length === 0 ? <h2>No hay resultados</h2> : ""}
                    {filteredAssessments ? (
                        <div className="row">
                            {filteredAssessments.map((assessment) => (
                                <div
                                    key={assessment.id}
                                    className="col-md-4 mb-4 d-flex align-items-stretch"
                                >
                                    <div
                                        className="card"
                                        style={{ width: "100%" }}
                                    >
                                        <img
                                            src={
                                                assessment.image ||
                                                `${process.env.PUBLIC_URL}/default-banner.png`
                                            }
                                            className="card-img-top img-fluid"
                                            style={{
                                                maxHeight: "150px",
                                                objectFit: "cover",
                                            }}
                                            alt={`Assessment ${assessment.title}`}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `${process.env.PUBLIC_URL}/default-banner.png`;
                                            }}
                                        />
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">
                                                {assessment.title}
                                            </h5>
                                            <p className="card-text">
                                                Creado:{" "}
                                                {new Date(
                                                    assessment.createdAt
                                                ).toLocaleDateString()}
                                            </p>
                                            <div className="mt-auto d-flex justify-content-between">
                                                <button
                                                    className="btn btn-info"
                                                    onClick={() =>
                                                        handleInfo(assessment.id)
                                                    }
                                                >
                                                    Ver mas sobre el canal
                                                </button>
                                                <div className="d-flex"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Cargando detalles del juego...</p>
                    )}
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default MenuAssessment;
