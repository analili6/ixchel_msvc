import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { changeEmail } from '../redux/userSlice';
import BannerPrincipal from './BannerPrincipal';
import Footer from './footer';

const RecuperarCuenta = () => {
    const email = useSelector((state) => state.user.email);
    const dispatch = useDispatch();

    const [correo, setCorreo] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false); // Nuevo estado para el loader
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar campos vacíos
        if (!email) {
            setError('Por favor, ingrese su correo electrónico.');
            setTimeout(() => setError(null), 5000);
            return;
        }

        setLoading(true); // Mostrar el loader

        const apiUrl = 'http://:8080/api/user/forgot-password';
        const requestBody = {
            email: email,
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            // Verificar la respuesta de la API
            const responseData = await response.text();

            if (response.ok) {
                if (responseData === 'Please check your email to set new password to your account') {
                    // Utilizando React Router para redirigir con el valor del correo electrónico
                    navigate(`/registroCodigoVerificacion/${encodeURIComponent(correo)}`);
                } else {
                    setError('Correo no encontrado. Verifica tu dirección de correo electrónico.');
                    setTimeout(() => setError(null), 5000);
                }
            } else {
                setError('Tu correo no ha sido registrado en nuestro sistema, por favor, verifica tus datos e inténtalo nuevamente');
                setTimeout(() => setError(null), 5000);
            }
        } catch (error) {
            console.error('Error de red:', error);
            setError('Error de red. Por favor, intenta de nuevo.');
            setTimeout(() => setError(null), 10000);
        } finally {
            setLoading(false); // Ocultar el loader después de la petición
        }
    };

    return (<>
        <div className="container">
            <BannerPrincipal titulo={'Recuperación de Cuenta'} />
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="card border shadow-lg p-3 mb-3 bg-white rounded">
                        <div className="ms-3 me-3">
                            <p className="fw-semibold">Por favor, ingrese su correo electrónico para verificar si existe una cuenta en nuestros registros:</p>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    {error && (
                                        <div className="alert alert-danger" role="alert">
                                            {error}
                                        </div>
                                    )}
                                    <label htmlFor="correo" className="form-label">
                                        Correo Electrónico
                                    </label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        id="correo"
                                        value={email}
                                        placeholder="Ingrese su correo electrónico"
                                        onChange={(event) => dispatch(changeEmail(event.target.value))}
                                    />
                                </div>
                                {loading && (
                                    <div className="mt-3 text-center">
                                        <p>Espere un momento...</p>
                                        <div className="spinner-border" style={{ color: '#B8285C' }} role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                )}
                                <div className="d-grid gap-2 mt-4">
                                    <button className="btn" style={{ backgroundColor: '#B8285C', color: 'white' }} type="submit">
                                        Restablecer contraseña
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
   
            <Footer/>
        
        </> 
    );
};

export default RecuperarCuenta;
