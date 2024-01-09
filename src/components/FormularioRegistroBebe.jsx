import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FormularioRegistroBebe = () => {

    const navigate = useNavigate();



    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [serverResponse, setServerResponse] = useState(null);
    const [emptyFieldsError, setEmptyFieldsError] = useState(null);

    const [formData, setFormData] = useState({
        curp: '',
        nombreInfante: '',
        apPaterno: '',
        apMaterno: '',
        sexo: '',
        tipoSangre: '',
        fechanac: '',
        talla: '',
        peso: '',
        observaciones: '',
        idUsuario: '',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validar campos vacíos excluyendo idUsuario
        const emptyFields = Object.keys(formData)
            .filter(key => key !== 'idUsuario' && formData[key] === '');

        if (emptyFields.length > 0) {
            setEmptyFieldsError(`Asegurese de llenar todos los campos`);

            // Limpiar el mensaje de error después de 5 segundos
            setTimeout(() => {
                setEmptyFieldsError(null);
            }, 5000);

            return;
        }

        setLoading(true);

        try {
            const formDataWithId = { ...formData, idUsuario: userData.idUsuario };

            const response = await fetch('http://189.138.113.161:8094/api/infante/crear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataWithId),
            });

            const responseBody = await response.text();

            let data;
            try {
                data = JSON.parse(responseBody);
            } catch (error) {
                data = responseBody;
            }

            setServerResponse(data);

            // Limpiar la respuesta después de 5 segundos
            setTimeout(() => {
                setServerResponse(null);
            }, 5000);

            if (data === 'Infante registrado con éxito') {
                localStorage.removeItem('correo');

                // Redirigir a /LOGIN después de 5 segundos
                setTimeout(() => {
                    localStorage.setItem('curp', formData.curp);
                    navigate('/RegistroContacto');

                    // Recargar la página después de redirigir a /LOGIN
                    setTimeout(() => {
                        window.location.reload();
                    }, 5000);
                }, 5000);
            }

        } catch (error) {
            console.error('Error al enviar los datos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (localStorage.getItem('correo')) {
            const apiUrl = `http://189.138.113.161:8080/api/user/search-by-email/${localStorage.getItem('correo')}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => setUserData(data))
                .catch(error => console.error('Error al obtener los datos del usuario:', error));
        }
    }, []);

    const resetForm = () => {
        // Agregar lógica para resetear el formulario si es necesario
        setFormData({
            curp: '',
            nombreInfante: '',
            apPaterno: '',
            apMaterno: '',
            sexo: '',
            tipoSangre: '',
            fechanac: '',
            talla: '',
            peso: '',
            observaciones: '',
            idUsuario: '',
        });
    };

    return (
        <div className='col-md-6 mt-md-0 mt-3'>
            <div className='row'>
                <div className='col-md-9'>
                    <div className='card border shadow-lg bg-white rounded'>
                        <div className='container'>
                            <p className='fw-semibold mt-2'>
                                Por favor, ingrese los datos de su bebé para continuar:
                            </p>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="curp">Ingrese la CURP del bebé a monitorear:</label>
                                <input
                                    type="text"
                                    placeholder="CURP"
                                    className='form-control mb-1'
                                    name="curp"
                                    maxLength={18}
                                    value={formData.curp}
                                    onChange={handleInputChange}
                                />

                                <input
                                    type="text"
                                    placeholder="Nombre del Infante"
                                    className='form-control mb-1'
                                    name="nombreInfante"
                                    value={formData.nombreInfante}
                                    onChange={handleInputChange}
                                />

                                <input
                                    type="text"
                                    placeholder="Apellido Paterno del Infante"
                                    className='form-control mb-1'
                                    name="apPaterno"
                                    value={formData.apPaterno}
                                    onChange={handleInputChange}
                                />

                                <input
                                    type="text"
                                    placeholder="Apellido Materno del Infante"
                                    className='form-control mb-1'
                                    name="apMaterno"
                                    value={formData.apMaterno}
                                    onChange={handleInputChange}
                                />

                                <div>
                                    <select id="sexo" name='sexo' className='form-control mb-2' value={formData.sexo} onChange={handleInputChange}>
                                        <option value="">Sexo</option>
                                        <option value="F">FEMENINO</option>
                                        <option value="M">MASCULINO</option>
                                    </select>
                                </div>

                                <div>
                                    <select id="tipoSangre" name='tipoSangre' className='form-control' value={formData.tipoSangre} onChange={handleInputChange}>
                                        <option value="">Tipo de Sangre</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                        <option value="A+">A+</option>
                                        {/* Agrega más opciones según sea necesario */}
                                    </select>
                                </div>

                                <label htmlFor="fechanac" className='mt-2'>Fecha de Nacimiento:</label>
                                <input
                                    type="date"
                                    className='form-control'
                                    name="fechanac"
                                    value={formData.fechanac}
                                    onChange={handleInputChange}
                                />

                                <div className='row'>
                                    <div className='col-md-6'>
                                        <input
                                            type="text"
                                            placeholder="Talla"
                                            className='form-control mt-2'
                                            name="talla"
                                            value={formData.talla}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='col-md-6'>
                                        <input
                                            type="text"
                                            placeholder="Peso"
                                            className='form-control mt-1'
                                            name="peso"
                                            value={formData.peso}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>

                                <div className="container mt-1 mb-3">
                                    <label htmlFor="textObserv" className="form-label">Observaciones:</label>
                                    <textarea
                                        id="textObserv"
                                        name='observaciones'
                                        className="form-control"
                                        rows={4}
                                        value={formData.observaciones}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {userData && (
                                    <div>
                                        <input
                                            type='hidden'
                                            name='idUsuario'
                                            value={userData.idUsuario} readOnly
                                        />
                                    </div>
                                )}
                                {loading &&
                                    <div className="mt-3 mb-3">
                                        <div className=" text-center">
                                            <div className="spinner-border" style={{ color: "#B8285C" }} role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <p className="mt-2">Espere un momento...</p>
                                        </div>
                                    </div>
                                }
                                {serverResponse && (
                                    <div className=' mt-3'>
                                        <div className='card-body'>
                                            <p className='text-center' style={{ color: "#B8285C" }}>{JSON.stringify(serverResponse, null, 2)}</p>
                                        </div>
                                    </div>


                                )}
                                {emptyFieldsError && (
                                    <div className="card text-white bg-danger mb-3 text-center">
                                        <div className="card-body">
                                            {emptyFieldsError}
                                        </div>
                                    </div>
                                )}
                                <div className='text-end'>
                                    <button className='btn  mb-3 bg-secondary-subtle me-2' type="button" onClick={() => resetForm()}>Cancelar</button>
                                    <button className='btn  mb-3' type="submit" style={{ backgroundColor: "#B8285C", color: "white" }}>Siguiente</button>
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
