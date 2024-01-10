import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa'; // Asegúrate de importar un icono de carga o utiliza tu propio componente de loader

import Footer from './footer';


function Login() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [mostrarContrasenia, setMostrarContrasenia] = useState(false);
  const [error, setError] = useState(false);
  const [alertMessage, setAlertMessage] = useState(""); // Nuevo estado para el mensaje del alert

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!correo.trim()) {
      setAlertMessage('Porfavor, digite un correo electrónico');
      setTimeout(() => setAlertMessage(null), 5000);
      return;
    } else if (!contrasenia.trim()) {
      setAlertMessage('Porfavor, digite una contraseña');
      setTimeout(() => setAlertMessage(null), 5000);
      return;
    }

    try {
      setLoading(true); // Habilita el loader al hacer clic en el botón

      const response = await axios.post('http://ixchelms2024.ddns.net:8080/api/user/login', {
        email: correo,
        password: contrasenia,
      });

      if (response.data === 'La contraseña es incorrecta') {
        setAlertMessage('Tu contraseña es incorrecta. Inténtalo nuevamente o recupérala.');
        setTimeout(() => setAlertMessage(null), 5000);
      } else if (response.data === 'Tu cuenta no está verificada') {
        setAlertMessage('Tu cuenta no está verificada, porfavor, intenta recuperarla.');
        setTimeout(() => setAlertMessage(null), 5000);
      } else {
        navigate('/dashboard');

        localStorage.setItem('correo', correo);
     

        window.location.reload();   
      };

    } catch (error) {
      // Actualiza el estado para mostrar el mensaje de error en el alert
      setAlertMessage("Las credenciales no coinciden con ningún usuario previamente registrado, Verifique los datos o regístrese");
      setTimeout(() => setAlertMessage(null), 10000);
    } finally {
      setLoading(false); // Restablece el estado de carga después de manejar la respuesta
    }
  };

  const toggleMostrarContrasenia = () => {
    setMostrarContrasenia(!mostrarContrasenia);
  };

  return (
    <>
      <div className='container bg-white'>
        <img
          src="src/resources/logo_bueno.jpg"
          className="rounded mx-auto d-block mt-5"
          alt="Ixchel"
          style={{ width: '20%', height: 'auto' }}
        />
        <div className='row'>
          <div className='col'></div>
          <div className='col-md-6 col-xl-4'> {/* Ajuste aquí para limitar el ancho del formulario */}
            <h4 className='fw-semibold text-center mt-4' style={{ color: "#B8285C" }}>Inicia sesión en Ixchel</h4>
            {alertMessage && (
              <div className="alert alert-danger text-center">
                {error}
                {alertMessage}
              </div>
            )}

            <div className="card border shadow-lg p-2 mb-5 bg-white rounded">
              <div className="card-body">
                <img
                  src="src/resources/marcofinal.png"
                  className="rounded mx-auto d-block"
                  alt="Ixchel"
                  style={{ width: '100%', height: 'auto' }}
                />
                <form onSubmit={handleSubmit}>

                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label mt-2">Correo Electrónico</label>
                    <input
                      type="email"
                      className="form-control"
                      id="correo"
                      placeholder='Ingrese su correo electrónico'
                      value={correo}
                      onChange={e => setCorreo(e.target.value)} />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                    <div className="input-group">

                      <input
                        type={mostrarContrasenia ? "text" : "password"}
                        className="form-control"
                        id="contrasenia"
                        placeholder='Ingrese su contraseña'
                        value={contrasenia}
                        onChange={e => setContrasenia(e.target.value)} />

                      <button
                        className="btn"
                        style={{ backgroundColor: '#B8285C', color: 'white' }}
                        type="button"
                        onClick={toggleMostrarContrasenia}>
                        {mostrarContrasenia ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>

                    <div className="d-grid gap-2 mt-4">
                      <button
                        className="btn"
                        style={{ backgroundColor: '#B8285C', color: 'white' }}
                        type="submit"
                        disabled={loading} // Deshabilita el botón mientras se carga
                        onClick={handleSubmit}
                      >
                        {loading ? <FaSpinner className="animate-spin" /> : 'Inicia Sesión'}
                      </button>

                    </div>

                    <div className='mt-3 text-center mb-3'>
                      <Link to="/recuperarCuenta">¿Olvidaste tu contraseña?</Link>
                    </div>
                    <div className='text-center mb-5'>
                      <p >¿Aún no tienes cuenta? <Link to={"/registroUsuario"}>Regístrate</Link></p>
                    </div>

                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className='col'></div>
        </div>

      </div>


    </>
  );
}

export default Login;
