import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import marcofinal from '../resources/marcoextenso.png';
import { Link } from 'react-router-dom';


const VerificacionCodigoContacto = () => {
  const [code, setCode] = useState('');
  const [serverResponse, setServerResponse] = useState('');
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const correo = useSelector((state) => state.email);

  useEffect(() => {
    localStorage.setItem('correo', correo.correo);
  }, [correo.correo]);

  const handleSubmit = async () => {
    setLoading(true);

    const apiUrl = 'http://189.138.113.161:8080/api/contacto/verify-account';
    const requestBody = {
      email: correo.correo,
      otp: code,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.text();
      console.log('Respuesta del servidor:', responseData);
      setServerResponse(responseData);

      setTimeout(() => {
        setServerResponse('');

        if (responseData === 'Cuenta verificada , ahyora ya puede recibir Alertas') {
          navigate('/registroFinalizado');
          window.location.reload();
        }
      });
    } catch (error) {
      console.error('Error de red:', error);
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    setLoading(true);

    const apiUrlResendCode = 'http://189.138.113.161:8080/api/contacto/regenerate-otp';
    const resendCodeBody = {
      email: correo.correo,
    };

    try {
      await fetch(apiUrlResendCode, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resendCodeBody),
      });

      setTimer(60);
    } catch (error) {
      console.error('Error al volver a enviar el código:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, []);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <>
      <div className="container">
        <div className="col-12 mt-4">
          <Link to="/">
            <img
              src="src/resources/logo_bueno.jpg"
              className="rounded mx-auto d-block mb-2"
              alt="Ixchel"
              style={{ width: '20%', height: 'auto' }}
            />
          </Link>
        </div>
        <div className="row">
          <div className="col-3"></div>
          <div className="col">
            <h4 className="fw-semibold text-center mt-4" style={{ color: "#B8285C" }}>Código de verificación</h4>

            <div className="card  shadow-lg p-2 mb-3 bg-white rounded">
              <div className="ms-3 me-3">
                <p className="fw-semibold ms">
                  Se ha enviado un código de verificación a
                  <span style={{ color: "#B8285C" }} > {correo.correo}</span>, por favor ingrese el código y la nueva
                  contraseña para restablecerla.
                </p>

                {serverResponse && (
                  <div className="card text-white bg-danger mb-3">
                    <div className="card-body">
                      <p className="card-text">{serverResponse}</p>
                    </div>
                  </div>
                )}

                <div className="container">
                  <div className="row">
                    <div className="col-3"></div>
                    <div className="col">
                      <input
                        type="number"
                        className="form-control text-center border-2" style={{ border: "2px solid #B8285C" }}
                        placeholder="******"
                        maxLength={6}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                      />
                    </div>

                    <div className="col-3"></div>
                    <img
                      src={marcofinal}
                      className="rounded mx-auto d-block mt-1"
                      alt="Ixchel"
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </div>
                </div>

                <div className="d-grid gap-2 mt-3 mb-3">
                  <button className="btn" style={{ backgroundColor: "#B8285C", color: "white" }} type="button" onClick={handleSubmit}>
                    {loading ? 'Verificando...' : 'Verificar cuenta'}
                  </button>
                </div>

                {timer > 0 && (
                  <div className="text-center mt-3">
                    <p>
                      Tiempo restante: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </p>
                  </div>
                )}

                {timer === 0 && (
                  <div className="text-center mt-3">
                    <button className="btn btn-link" onClick={resendCode}>
                      {loading ? 'Reenviando código...' : 'Volver a enviar código'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-3"></div>
        </div>
      </div>
    </>
  );
};

export default VerificacionCodigoContacto;
