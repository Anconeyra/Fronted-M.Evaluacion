import React from "react";

function Footer() {
    return (
        <footer className="bg-light text-center text-lg-start">
            <div className="container p-4">
                <div className="row">
                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Moss E.I.R.L </h5>
                        <p>Todos los derechos reservados Moss E.I.R.L 2025</p>
                    </div>
                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Síguenos</h5>
                        <div className="d-flex justify-content-center">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="me-3">
                                <img src={`${process.env.PUBLIC_URL}/facebook.png`} alt="Facebook" className="rounded-circle" width="40" height="40" />
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="me-3">
                                <img src={`${process.env.PUBLIC_URL}/x.png`} alt="Twitter" className="rounded-circle" width="40" height="40" />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="me-3">
                                <img src={`${process.env.PUBLIC_URL}/instagram.jpeg`} alt="Instagram" className="rounded-circle" width="40" height="40" />
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                <img src={`${process.env.PUBLIC_URL}/linkedin.png`} alt="LinkedIn" className="rounded-circle" width="40" height="40" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center p-3 bg-dark text-white">
                <a href="/terms" className="text-white">Términos y Condiciones de MOSS-COEVALUACIÓN</a>
            </div>
        </footer>
    );
}

export default Footer;