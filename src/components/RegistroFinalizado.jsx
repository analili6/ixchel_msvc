import { Link } from "react-router-dom";
import BannerPrincipal from "./BannerPrincipal";
import './FooterStyles.css';
const RegistroFinalizado = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <BannerPrincipal titulo={"¡El registro ha sido éxitoso!"} />
                        <div className="card border shadow-lg p-2 mb-5 bg-white rounded">
                            <h3 className="ms-4 mt-3 fw-semibold" style={{ color: "#B8285C" }}>Mensaje:</h3>
                            <h3 className="ms-4 mt-3 fw-light text-center">Estimado usuario, el registro de tu cuenta ha sido éxitoso, ¡Ya eres parte de Ixchel!, Ahora, con el dispositivo, podrás disfrutar de grandes beneficios para el bienestar de tu bebé.</h3>
                            <h5 className="ms-4 text-center fw-normal" style={{ color: "#B8285C" }}>Por favor, inicia sesión dentro del monitor Ixchel para empezar el monitoreo.</h5>
                            <h4 className="ms-4 mt-2 text-center fw-light">Agradecemos tu confianza, Ixchel comienza aquí, y seguirá renovandose para ofrecerte una mejor experiencia.</h4>

                            <h5 className="text-center" style={{ color: "#B8285C" }}>Atentamente:</h5>
                            <div className="text-center mb-4 fw-normal">
                                <img
                                    src="src/resources/credit.png"
                                    className="mi-imagen"
                                    alt="Ixchel"
                                />
                            </div>
                            <div className="text-end me-2">
                                <Link to={"/Login"}>
                                <button className="btn" style={{ backgroundColor: '#B8285C', color: 'white' }}>
                                    Iniciar Sesión
                                </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default RegistroFinalizado;