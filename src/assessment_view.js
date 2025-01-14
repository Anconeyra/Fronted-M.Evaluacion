import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Nav from "./nav";

function DetalleAssessment() {
    const [assessment, setAssessment] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem("token");

    const fetchAssessment = useCallback(async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/assessment/${id}/view/token=${token}`
            );
            if (!response.ok) {
                throw new Error(
                    `Error ${response.status}: ${response.statusText}`
                );
            }
            const data = await response.json();
            console.log(data);
            setAssessment(data);
        } catch (error) {
            console.error("Fetch error:", error);
            navigate("/error");
        }
    }, [id, token]);

    useEffect(() => {
        fetchAssessment();
    }, [fetchAssessment]);

    function transformJson(originalJson) {
        return {
            title: originalJson.title,
            image: originalJson.image,
            questions: originalJson.questions.map((question) => ({
                title: question.title,
                image: question.image,
                questionType: question.questionType,
                selectOptions: question.selectOptions.map((selectOption) => ({
                    title: selectOption.title,
                })),
            })),
        };
    }

    const handleExport = () => {
        const simplifiedJson = transformJson(assessment);
        const jsonString = JSON.stringify(simplifiedJson);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${assessment.title}.lgqz`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleEdit = () => {
        navigate(`/menu/assessment/${id}/edit`);
    };

    const handleViewGames = () => {
        navigate(`/menu/assessment/${id}/instances`);
    };

    const handleArchive = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/assessment/${id}/archive/token=${token}`,
                {
                    method: "POST",
                }
            );
            if (!response.ok) {
                throw new Error(
                    `Error ${response.status}: ${response.statusText}`
                );
            }
            window.location.reload();
        } catch (error) {
            console.error("Fetch error:", error);
            navigate("/error");
        }
    };

    const handleDelete = async () => {
        if (window.confirm("¿Estás seguro de eliminar el assessment?")) {
            try {
                const response = await fetch(
                    `http://localhost:8000/assessment/${id}/delete/token=${token}`,
                    {
                        method: "DELETE",
                    }
                );
                if (!response.ok) {
                    throw new Error(
                        `Error ${response.status}: ${response.statusText}`
                    );
                }
                alert("Assessment eliminado con éxito");
                navigate("/menu/assessment");
            } catch (error) {
                console.error("Fetch error:", error);
                navigate("/error");
            }
        }
    };

    const handleCreateAssessmentInstance = async () => {
        navigate(`/menu/assessment/${id}/instance/new`);
    };

    const handleReturn = () => {
        navigate("/menu/assessment");
    };

    return (
        <div className="container-fluid">
            <Nav />
            <div className="row">
                <aside className="col-md-2 d-flex flex-column">
                    <button
                        className="btn btn-success mb-3"
                        onClick={handleCreateAssessmentInstance}
                    >
                        Crear Juego
                    </button>
                    <button
                        className="btn btn-primary mb-3"
                        onClick={handleEdit}
                    >
                        Editar
                    </button>
                    <button
                        className="btn btn-primary mb-3"
                        onClick={handleExport}
                    >
                        Exportar
                    </button>
                    <button
                        className="btn btn-primary mb-3"
                        onClick={handleViewGames}
                    >
                        Juegos
                    </button>
                    <button
                        className="btn btn-warning mb-3"
                        onClick={handleArchive}
                    >
                        {assessment
                            ? assessment.archived
                                ? "Desarchivar"
                                : "Archivar"
                            : "Cargando..."}
                    </button>
                    <button
                        className="btn btn-danger mb-3"
                        onClick={handleDelete}
                    >
                        Eliminar
                    </button>
                    <button
                        className="btn btn-secondary mb-3"
                        onClick={handleReturn}
                    >
                        Volver
                    </button>
                </aside>
                <section className="col-md-10">
                    {assessment && (
                        <div className="card">
                            <img
                                src={assessment.image}
                                className="card-img-top img-fluid"
                                style={{
                                    maxHeight: "300px", // Ajusta el tamaño de la imagen principal aquí
                                    objectFit: "cover",
                                    width: "100%",
                                }}
                                alt={`Assessment ${assessment.title}`}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `${process.env.PUBLIC_URL}/default-banner.png`;
                                }}
                            />
                            <div className="card-body">
                                <h2 className="card-title">{assessment.title}</h2>
                                <p className="card-text">
                                    Creado:{" "}
                                    {new Date(
                                        assessment.createdAt
                                    ).toLocaleDateString()}
                                </p>
                                <p className="card-text">
                                    Actualizado:{" "}
                                    {new Date(
                                        assessment.updatedAt
                                    ).toLocaleDateString()}
                                </p>

                                {assessment.questions.map((question, index) => (
                                    <div key={question.id} className="mb-3">
                                        <div
                                            className="d-flex"
                                            style={{
                                                backgroundColor: "#f8f9fa",
                                                borderRadius: "10px",
                                            }}
                                        >
                                            <div
                                                className="me-3"
                                                style={{
                                                    backgroundImage: `url(${question.image}), url(${process.env.PUBLIC_URL}/default-banner.png)`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                    borderTopLeftRadius: "10px",
                                                    borderBottomLeftRadius: "10px",
                                                    width: "150px", // Ajusta el tamaño de las imágenes de las preguntas aquí
                                                    minHeight: "150px",
                                                }}
                                                onError={(e) =>
                                                    (e.currentTarget.style.backgroundImage = `url(${process.env.PUBLIC_URL}/default-banner.png)`)
                                                }
                                            ></div>
                                            <div
                                                style={{
                                                    flex: 1,
                                                    padding: "10px",
                                                }}
                                            >
                                                <p>
                                                    <strong>
                                                        {question.title}
                                                    </strong>
                                                </p>

                                                <p>
                                                    <strong>
                                                        Tipo de pregunta:
                                                    </strong>{" "}
                                                    {question.questionType === "select" && (
                                                        <span>
                                                            Selección
                                                        </span>
                                                    )}
                                                    {question.questionType === "text" && (
                                                        <span>
                                                            Texto
                                                        </span>
                                                    )}
                                                    {question.questionType === "number" && (
                                                        <span>
                                                            Numérica
                                                        </span>
                                                    )}
                                                </p>
                                                {question.questionType === "select" ? (
                                                    <>
                                                        <strong>Opciones:</strong>
                                                        <ul>
                                                            {question.selectOptions.map(
                                                                (selectOption) => (
                                                                    <li
                                                                        key={selectOption.id}
                                                                    >
                                                                        {selectOption.title}
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

export default DetalleAssessment;