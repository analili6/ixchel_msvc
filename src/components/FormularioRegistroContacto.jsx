import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeCorreo } from "../redux/emailSlice";
import { useSelector, useDispatch } from "react-redux";
const FormularioRegistroBebe = () => {
    const navigate = useNavigate();
    const correo = useSelector((state) => state.email);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [serverResponse, setServerResponse] = useState(null);
    const [formData, setFormData] = useState({
        nombreContacto: '',
        apPaterno: '',
        apMaterno: '',
        parentesco: '',
        email: correo.correo,
        curp: localStorage.getItem('curp')
    });

    // Utiliza useEffect para actualizar el campo de correo electrónico en el estado local
    useEffect(() => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            email: correo.correo,
        }));
    }, [correo.correo]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegistration = async () => {
        // Validar campos vacíos
        if (
            formData.nombreContacto.trim() === '' ||
            formData.apPaterno.trim() === '' ||
            formData.apMaterno.trim() === '' ||
            formData.parentesco.trim() === '' ||
            formData.email.trim() === ''
        ) {
            setServerResponse('Por favor, completa todos los campos.');
            setTimeout(() => {
                setServerResponse(null);
            }, 5000);
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://189.138.113.161:8095/api/contacto/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const responseBody = await response.text();
            console.log(responseBody);
            setServerResponse(responseBody);

            // Limpiar la respuesta después de 5 segundos
            setTimeout(() => {
                setServerResponse(null);
            }, 5000);

            if (responseBody.includes('El registro de contacto se ha realizado correctamente para')) {
                // Redirigir a /LOGIN después de 5 segundos
                setTimeout(() => {
                    navigate('/codigoVerificaContacto');
                }, 5000);
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            nombreContacto: '',
            apPaterno: '',
            apMaterno: '',
            parentesco: '',
            email: '',
        });
    };

    return (
        <div className='col-md-6 mt-md-0 mt-3'>
            <div className='row'>
                <div className='col-md-9'>
                    <div className='card border shadow-lg bg-white rounded'>
                        <div className='container'>
                            <p className='fw-semibold mt-2'>
                                ¡Ya casi terminamos el registro!, Ahora, ingresa los datos de contacto para continuar, este paso es muy importante dado que de él dependerán las alertas:
                            </p>
                            <form>
                                <label>CURP:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={localStorage.getItem('curp')}
                                    readOnly
                                    name="email"
                                />

                                <input
                                    type="text"
                                    placeholder="Nombre del Contacto"
                                    className='form-control mb-1 mt-4'
                                    name="nombreContacto"
                                    id="nombreContacto"
                                    value={formData.nombreContacto}
                                    onChange={handleInputChange}
                                />

                                <input
                                    type="text"
                                    placeholder="Apellido Paterno del Contacto"
                                    className='form-control mb-1'
                                    name="apPaterno"
                                    value={formData.apPaterno}
                                    onChange={handleInputChange}
                                />

                                <input
                                    type="text"
                                    placeholder="Apellido Materno del Contacto"
                                    className='form-control mb-1'
                                    name="apMaterno"
                                    value={formData.apMaterno}
                                    onChange={handleInputChange}
                                />

                                <div>
                                    <select
                                        id="parentesco"
                                        name='parentesco'
                                        className='form-control mb-2'
                                        value={formData.parentesco}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Parentesco</option>
                                        <option value="Madre">MAMÁ</option>
                                        <option value="Padre">PAPÁ</option>
                                    </select>
                                </div>

                                <input
                                    type="email"
                                    placeholder="Correo electrónico de Contacto"
                                    className='form-control mb-1'
                                    name="email"
                                    value={correo.correo}
                                    onChange={(event) => dispatch(changeCorreo(event.target.value))}
                                />

                                {serverResponse && (

                                    <div className='text-center'>
                                        <p>{serverResponse}</p>
                                    </div>

                                )}
                                {loading &&
                                    <div className="mt-3 mb-3">
                                        <div className="text-center">
                                            <div className="spinner-border" style={{ color: "#B8285C" }} role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <p className="mt-2">Espere un momento...</p>
                                        </div>
                                    </div>
                                }
                                <div className='text-end mt-3'>
                                    <button className='btn  mb-3 bg-secondary-subtle me-2' type="button" onClick={() => resetForm()}>Cancelar</button>
                                    <button className='btn  mb-3' type="button" onClick={handleRegistration} style={{ backgroundColor: "#B8285C", color: "white" }}>Siguiente</button>
                                </div>
                            </form>




                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormularioRegistroBebe;
