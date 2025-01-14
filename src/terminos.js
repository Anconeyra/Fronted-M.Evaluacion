import React from "react";
import Nav from "./nav";
import Footer from "./footer";

function Terms() {
    return (
        <div className="container-fluid">
            <Nav />
            <div className="container mt-5">
                <h1 className="text-center">Términos y Condiciones de MOSS-COEVALUACIÓN</h1>
                <p>
                    Bienvenido a MOSS-COEVALUACIÓN. Estos términos y condiciones describen las reglas y regulaciones para el uso del sitio web de MOSS-COEVALUACIÓN.
                </p>
                <p>
                    Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones en su totalidad. No continúes usando el sitio web de MOSS-COEVALUACIÓN si no aceptas todos los términos y condiciones establecidos en esta página.
                </p>
                <h2>Licencia</h2>
                <p>
                    A menos que se indique lo contrario, MOSS-COEVALUACIÓN y/o sus licenciantes poseen los derechos de propiedad intelectual de todo el material en MOSS-COEVALUACIÓN. Todos los derechos de propiedad intelectual están reservados. Puedes ver y/o imprimir páginas de https://www.moss-coevaluacion.com para tu uso personal sujeto a las restricciones establecidas en estos términos y condiciones.
                </p>
                <h2>Uso Aceptable</h2>
                <p>
                    No debes:
                    <ul>
                        <li>Publicar material del sitio web en ningún medio.</li>
                        <li>Vender, alquilar o sublicenciar material del sitio web.</li>
                        <li>Reproducir, duplicar o copiar material del sitio web.</li>
                        <li>Redistribuir contenido del sitio web, a menos que el contenido esté específicamente hecho para la redistribución.</li>
                    </ul>
                </p>
                <h2>Comentarios</h2>
                <p>
                    Algunas partes de este sitio web ofrecen a los usuarios la oportunidad de publicar e intercambiar opiniones, información, material y datos ('Comentarios') en áreas del sitio web. MOSS-COEVALUACIÓN no filtra, edita, publica ni revisa los Comentarios antes de su aparición en el sitio web y los Comentarios no reflejan los puntos de vista o opiniones de MOSS-COEVALUACIÓN, sus agentes o afiliados. Los Comentarios reflejan el punto de vista y la opinión de la persona que publica dicho punto de vista u opinión. En la medida en que lo permitan las leyes aplicables, MOSS-COEVALUACIÓN no será responsable de los Comentarios ni de ningún costo de pérdida, responsabilidad, daños o gastos causados y/o sufridos como resultado de cualquier uso y/o publicación y/o aparición de los Comentarios en este sitio web.
                </p>
                <p>
                    MOSS-COEVALUACIÓN se reserva el derecho de monitorear todos los Comentarios y eliminar cualquier Comentario que pueda considerarse inapropiado, ofensivo o que cause un incumplimiento de estos Términos y Condiciones.
                </p>
                <Footer />
            </div>
        </div>
    );
}

export default Terms;