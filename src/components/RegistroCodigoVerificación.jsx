import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import BannerPrincipal from './BannerPrincipal';
import marco_variante from '../resources/marco_variante.png';


const RegistroCodigoVerificacion = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.email === "") {
            navigate(`/login`);
        }
    }, [user.email, navigate]);



    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [serverResponse, setServerResponse] = useState('');
    const [timer, setTimer] = useState(60);


    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!code || !newPassword) {
            setServerResponse('Por favor, complete todos los campos.');
            setTimeout(() => {
                setServerResponse('');
            }, 5000);
            return;
        }

        setIsLoading(true);

        const apiUrl = 'http://l189.138.116.110:8080/api/user/set-password';
        const requestBody = {
            email: user.email,
            otp: code,
            newPassword: newPassword,
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
            setIsLoading(false);

            setTimeout(() => {
                setServerResponse('');
            }, 5000);

            if (responseData === "Nueva contraseña actualizada , inicie sesion ") {
                window.alert("Contraseña cambiada con éxito. Inicie sesión.");
                navigate(`/login`);
                window.location.reload();
                return;
            } else {
                console.log('no entra??')
            }
            console.log(responseData);
        } catch (error) {
            console.error('Error de red:', error);
            setIsLoading(false);
        }
    };

    const resendCode = async () => {
        const apiUrlResendCode = 'http://189.138.113.161:8080/api/user/regenerate-otp';
        const resendCodeBody = {
            email: user.email,
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
                <BannerPrincipal titulo={"Código de Verificación"} />
                <div className="row">
                    <div className="col-md-3 col-xl-3"></div>
                    <div className="col-md-6">
                        <div className="card border shadow-lg p-2 mb-5 bg-white rounded">
                            <div className="ms-3 me-3">
                                <p className="fw-semibold ms mt-2">
                                    Se ha enviado un código de verificación a{' '}
                                    <span style={{ color: '#B8285C' }}>{user.email}</span>, por favor ingrese el código y la nueva contraseña
                                    para restablecerla.
                                </p>

                                {serverResponse && (
                                    <div className="card text-white bg-danger mb-3">
                                        <div className="card-body">
                                            <p className="card-text">{serverResponse}</p>
                                        </div>
                                    </div>
                                )}
                                <div className='row'>
                                    <div className='col-4'></div>
                                    <div className="mb-3 col-4">
                                        <input
                                            type="number"
                                            className="form-control text-center border-2"
                                            style={{ border: '2px solid #B8285C' }}
                                            placeholder="******"
                                            maxLength={6}
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                        />
                                    </div>
                                    <div className='col-4'></div>
                                </div>
                                <img
                                    src={marco_variante}
                                    className="rounded mx-auto d-block mb-2"
                                    alt="Ixchel"
                                    style={{ width: '100%', height: 'auto' }}
                                />

                                <div className="mb-3">
                                    <div className="input-group border-2">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className="form-control mt-1 border-2"
                                            id="newPassword"
                                            placeholder="Ingrese su nueva contraseña"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        <button
                                            className="btn mt-1"
                                            style={{ backgroundColor: '#B8285C', color: 'white' }}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>

                                <div className="d-grid gap-2 mt-3 mb-3">
                                    <button
                                        className="btn"
                                        style={{ backgroundColor: '#B8285C', color: 'white' }}
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Cargando...' : 'Cambiar contraseña'}
                                    </button>
                                </div>

                                {timer > 0 && (
                                    <div className="text-center mt-3">
                                        <p>Tiempo restante: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p>
                                    </div>
                                )}

                                {timer === 0 && (
                                    <div className="text-center mt-3">
                                        <button className="btn btn-link" onClick={resendCode}>
                                            Volver a enviar código
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </>
    );
};

export default RegistroCodigoVerificacion;
