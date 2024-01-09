import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CardInfoInfante = () => {
    const [infanteData, setInfanteData] = useState(null);
    const [infanteDetails, setInfanteDetails] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtén el valor del correo directamente
                const correo = localStorage.getItem('correo');

                // Verifica si el correo existe antes de realizar la solicitud
                if (correo) {
                    // Realiza la llamada a la API con el correo obtenido
                    const response1 = await axios.get(`http://189.138.113.161:8080/api/user/search-by-email/${correo}`);
                    const { idUsuario } = response1.data;
                    setInfanteData({ idUsuario });
                    localStorage.setItem('idUsuario', idUsuario);

                    // Segunda llamada a la API utilizando el idUsuario obtenido
                    const response2 = await axios.get(`http://189.138.113.161:8094/api/infante/search-by-user/${idUsuario}`);
                    setInfanteDetails(response2.data);

                    // Almacena la CURP en localStorage
                    localStorage.setItem('curp', response2.data[0].curp);
                } else {
                    console.error('Correo no encontrado en el localStorage.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="card border shadow-lg p-3 mt-4 bg-white rounded text-center">

            {infanteDetails && infanteDetails.length > 0 && (
                <div>
                    <p className="text-start" style={{ color: "#B8285C" }}>Detalles del Infante:</p>
                    {infanteDetails.map((infante, index) => (
                        <div key={index}>
                            <p style={{ color: '#1b8ca3' }} className='h4'>{`${infante.curp}`}</p>
                            <p style={{ color: '#B8285C' }} className='h6'>{`${infante.nombreInfante} ${infante.apPaterno} ${infante.apMaterno}`}</p>
                            <p style={{ color: '#1b8ca3' }} className='h6'>{`Sexo: ${infante.sexo}`}</p>
                            <p style={{ color: '#B8285C' }} className='h4'>{`${infante.tipoSangre}`}</p>
                            <p style={{ color: '#1b8ca3' }} className='h5'>{`${infante.fechanac}`}</p>
                            <p style={{ color: '#1b8ca3' }} className='h6'>{`Talla: ${infante.talla} cm`}</p>
                            <p style={{ color: '#1b8ca3' }} className='h6'>{`Peso: ${infante.peso} kg`}</p>
                            <p style={{ color: '#B8285C' }} className='text-start'>{`Observaciones:`}</p>
                            <p style={{ color: '#1b8ca3' }} className='h6'>{`${infante.observaciones}`}</p>
                        </div>
                    ))}
                </div>
            )}
            <div className='text-end'>
                <Link to={"/editarBebe"}>
                    <button className='btn mt-2' style={{ color: 'white', background: "#B8285C" }}>Editar Datos</button>
                </Link>
            </div>
        </div>
    );
};

export default CardInfoInfante;
