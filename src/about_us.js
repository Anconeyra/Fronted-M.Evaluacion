import React from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./nav";
import Footer from "./footer";

function AboutUs() {
    const navigate = useNavigate();

    return (
        <div className="container-fluid">
            <Nav />
            <div className="container mt-5">
                {/* Sección de encabezado */}
                <div className="text-center bg-primary text-white p-5 rounded shadow-lg mb-4">
                    <h1 className="display-3 font-weight-bold">MOSS Coevaluación</h1>
                    <h2 className="font-italic mb-4">¡Impulsando la educación colaborativa!</h2>
                    <p className="lead">Transformando la manera de evaluar y aprender, impulsando el trabajo en equipo.</p>
                </div>

                <div className="row align-items-center">
                    {/* Columna con la imagen */}
                    <div className="col-md-6 mb-4">
                        <img
                            src={`${process.env.PUBLIC_URL}/MOSS.png`} // Aquí se ajusta la ruta de la imagen
                            alt="Plataforma MOSS Coevaluación"
                            className="img-fluid rounded-circle shadow-lg"
                        />
                    </div>

                    {/* Columna con el contenido */}
                    <div className="col-md-6">
                        <h3 className="text-primary">¿Qué es MOSS Coevaluación?</h3>
                        <p className="lead">
                            MOSS Coevaluación es una plataforma educativa innovadora diseñada para facilitar la evaluación en entornos colaborativos. Nuestra herramienta permite a docentes y estudiantes interactuar, evaluar y mejorar proyectos de manera eficiente y justa.
                        </p>

                        <h4 className="mt-4 text-secondary">Nuestra Misión</h4>
                        <p>
                            Buscamos fomentar el aprendizaje interactivo y la autoevaluación entre estudiantes, promoviendo el trabajo en equipo y desarrollando habilidades críticas y colaborativas. MOSS Coevaluación permite a los estudiantes participar activamente en el proceso de evaluación, mejorando tanto su desempeño como su comprensión del contenido.
                        </p>

                        <h4 className="mt-4 text-secondary">¿Por Qué Elegir MOSS Coevaluación?</h4>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <strong>Fácil de Usar:</strong> Plataforma intuitiva, accesible y sencilla para todos los usuarios, independientemente de su experiencia en tecnología.
                            </li>
                            <li className="mb-2">
                                <strong>Evaluación Dinámica:</strong> Permite la creación de rúbricas personalizadas, asegurando una evaluación justa y precisa según el desempeño real de los estudiantes.
                            </li>
                            <li className="mb-2">
                                <strong>Promueve la Colaboración:</strong> Facilita el trabajo en equipo, alentando a los estudiantes a trabajar juntos mientras evalúan y aprenden de sus compañeros.
                            </li>
                            <li className="mb-2">
                                <strong>Feedback Constante:</strong> Los estudiantes reciben retroalimentación continua para mejorar su aprendizaje y desarrollo.
                            </li>
                        </ul>

                        <h4 className="mt-4 text-secondary">Únete a la Revolución Educativa</h4>
                        <p>
                            Creemos en el poder de la colaboración y la evaluación interactiva. Únete a MOSS Coevaluación y transforma tu experiencia educativa. Empieza a aprender, enseñar y evaluar de manera más eficiente.
                        </p>
                    </div>
                </div>

                <div className="text-center mt-5">
                    <button className="btn btn-lg btn-success" onClick={() => navigate('/menu/assessment')}>
                        Comienza Ahora
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AboutUs;