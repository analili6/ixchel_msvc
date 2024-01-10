import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

 const CardInfoContacto = () => {
    //  const [contactoData, setContactoData] = useState(null);
     const [contactoDetails, setContactoDetails] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtén el valor del correo directamente
                const curp = localStorage.getItem('curp');

                // Verifica si el correo existe antes de realizar la solicitud
                if (curp) {
                    // Realiza la llamada a la API con el correo obtenido


                    // Segunda llamada a la API utilizando el idUsuario obtenido
                    const response2 = await axios.get(`http://189.138.113.161:8080/api/contacto/search-by-curp/${curp}`);
                    setContactoDetails(response2.data);

                    // Almacena la CURP en localStorage
                    localStorage.setItem('curp', response2.data[0].curp);
                } else {
                    console.error('Curp no encontrado en el localStorage.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="card border shadow-lg p-3 mt-4 bg-white rounded text-center">

            {contactoDetails  && contactoDetails.length > 0 && (
                <div>
                    <p className="text-start" style={{ color: "#B8285C" }}>Detalles del Contacto:</p>
                    {contactoDetails.map((contacto, index) => (
                        <div key={index}>
                            <p style={{ color: '#1b8ca3' }} className='h4'>{`${contacto.idContacto}`}</p>
                            <p style={{ color: '#B8285C' }} className='h6'>{`${contacto.nombreContacto} ${contacto.apPaterno} ${contacto.apMaterno}`}</p>
                            <p style={{ color: '#1b8ca3' }} className='h6'>{`${contacto.parentesco}`}</p>
                            <p style={{ color: '#1b8ca3' }} className='h5'>{`${contacto.email}`}</p>
                            <p style={{ color: '#1b8ca3' }} className='h6'>{`${contacto.curp}`}</p>
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

export default CardInfoContacto;
