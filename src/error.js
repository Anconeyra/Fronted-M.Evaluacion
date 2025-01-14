import React from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./nav";
import Footer from "./footer";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      <Nav />
      <div className="error-container">
        <div className="error-content">
          <img
            src="https://www.wnpower.com/blog/wp-content/uploads/sites/3/2023/06/error-404-que-es.png" // Reemplaza esta URL con la imagen que desees
            alt="Error 404"
            className="error-image"
          />
          <h1 className="error-title">¡Oops! Página no encontrada</h1>
          <p className="error-message">
            Parece que algo salió mal. La página que buscas no existe o ha sido
            movida.
          </p>
          <div className="button-container">
            <button
              onClick={() => navigate("/")}
              className="btn btn-primary btn-lg error-button"
            >
              Volver al Inicio
            </button>
            <button
              onClick={() => navigate(-1)} // Esto retrocede en el historial de navegación
              className="btn btn-secondary btn-lg error-button"
            >
              Volver Atrás
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .error-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: #f8f9fa;
          color: #333;
          font-family: 'Arial', sans-serif;
        }

        /* Contenedor de contenido */
        .error-content {
          text-align: center;
          max-width: 500px;
          background: #ffffff;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        /* Imagen del error */
        .error-image {
          max-width: 100%;
          height: auto;
          margin-bottom: 20px;
          animation: fadeIn 1.5s ease-in-out;
        }

        /* Título principal */
        .error-title {
          font-size: 3em;
          font-weight: bold;
          color: #e74c3c;
          margin-bottom: 15px;
          animation: fadeIn 2s ease-in-out;
        }

        /* Mensaje de error */
        .error-message {
          font-size: 1.2em;
          margin-bottom: 30px;
          color: #555;
          animation: fadeIn 2.5s ease-in-out;
        }

        /* Contenedor de los botones */
        .button-container {
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        /* Botón para volver al inicio */
        .error-button {
          padding: 10px 30px;
          font-size: 1.1em;
          border-radius: 25px;
          transition: background-color 0.3s ease;
        }

        /* Estilo del botón de Volver al inicio */
        .btn-primary {
          background-color: #3498db;
          color: #fff;
        }

        .btn-primary:hover {
          background-color: #2980b9;
          cursor: pointer;
          transform: scale(1.05);
        }

        /* Estilo del botón de Volver atrás */
        .btn-secondary {
          background-color: #f39c12;
          color: #fff;
        }

        .btn-secondary:hover {
          background-color: #e67e22;
          cursor: pointer;
          transform: scale(1.05);
        }

        /* Animación de desvanecimiento */
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
      <Footer />
    </div>
  );
};

export default ErrorPage;