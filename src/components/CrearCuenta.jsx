//COMPONENTE PARA CREAR CUENTA DE USUARIO

import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { changeCorreo } from "../redux/emailSlice";
import BannerPrincipal from './BannerPrincipal';
import BannerIxchelInfo from './BannerIxhcelInfo';

const CrearCuenta = () => {
    const correo = useSelector((state) => state.email);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombreUsuario: '',
        email: '',
        password: '',
        confirmPassword: '',
        noSerie: ''
    });

    const [loading, setLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [correo2, setCorreo] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setResponseMessage('');
        }, 5000);

        return () => clearTimeout(timer);
    }, [responseMessage]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.nombreUsuario || !correo.correo || !formData.password || !formData.confirmPassword) {
            setResponseMessage('Por favor, complete todos los campos.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setResponseMessage('Las contraseñas no coinciden.');
            return;
        }

        setLoading(true);

        try {
            const requestData = {
                nombreUsuario: formData.nombreUsuario,
                email: correo.correo,
                password: formData.password,
                noSerie: formData.noSerie
            };

            const response = await fetch('http://189.138.113.161:8080/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                const responseData = await response.text();
                setResponseMessage(responseData);

                // Verifica si la respuesta incluye el mensaje específico
                if (responseData.includes('El registro de usuario se ha realizado correctamente para')) {
                    navigate(`/codigoVerifica`);
                }
            } else {
                const errorData = await response.json();
                setResponseMessage(errorData.message || 'El correo electrónico ingresado ya ha sido registrado, intente con otro');
            }
        } catch (error) {
            console.error('Error al realizar la petición:', error);
            setResponseMessage('Error al conectar con el servidor');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            nombreUsuario: '',
            email: '',
            password: '',
            confirmPassword: '',
            noSerie: ''
        });
        setResponseMessage('');
    };


    return (

        <div className="container">
            <div className="row">
                <BannerPrincipal titulo={"Registrate en Ixchel"} />
                <BannerIxchelInfo />
                <div className="col-md-6 mt-md-0">
                    <div className="row">
                        <div className='col-md-9'>
                            <div className='card'>
                                <div className='container'>
                                    <p className='fw-semibold mt-2'>Por favor, ingrese sus datos para continuar:</p>
                                    {responseMessage && (
                                        <div className='alert alert-danger text-center' role='alert'>
                                            {responseMessage}
                                        </div>
                                    )}

                                    {loading && (

                                        <div className="text-center">
                                            <div className="spinner-border" style={{ color: "#B8285C" }} role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <p className="mt-2">Espere un momento...</p>
                                        </div>

                                    )}
                                    <div className='row'>
                                        <form onSubmit={handleSubmit}>
                                            <input
                                                type="text"
                                                placeholder="Nombre de usuario"
                                                className='form-control mb-1'
                                                name="nombreUsuario"
                                                value={formData.nombreUsuario}
                                                onChange={handleInputChange}
                                            />
                                            <input
                                                type="email"
                                                placeholder="Correo electrónico"
                                                className='form-control mb-1'
                                                name="email"
                                                value={correo.correo}
                                                onChange={(event) => dispatch(changeCorreo(event.target.value))}
                                            />
                                            <div className="input-group mb-1">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Contraseña"
                                                    className='form-control'
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                />
                                                <button
                                                    className="btn"
                                                    style={{ backgroundColor: "#B8285C", color: "white" }}
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}>
                                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </div>
                                            <div className="input-group mb-1">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="Repetir contraseña"
                                                    className='form-control mb-1'
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleInputChange}
                                                />
                                                <button
                                                    className="btn mb-1"
                                                    style={{ backgroundColor: "#B8285C", color: "white" }}
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}>
                                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </div>

                                            <div className='text-end'>
                                                <button className='btn mt-4 mb-4 bg-secondary-subtle me-2' type="button" onClick={() => resetForm()}>Cancelar</button>
                                                <button className='btn mt-4 mb-4' type="submit" style={{ backgroundColor: "#B8285C", color: "white" }}>Siguiente</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrearCuenta;
