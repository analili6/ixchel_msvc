import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLungs } from '@fortawesome/free-solid-svg-icons';

const CardOxigenacion = () => {
    return (
        <>
            <div className="card border shadow-lg p-2 mb-5 bg-white rounded">
                <div className="card-title">

                    <h1 className="ms-2 mb-3 text-center" style={{ color: '#1b8ca3' }}>
                        Oxigenación
                    </h1>
                    <div className='ms-2' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ color: '#B8285C' }}>
                            <FontAwesomeIcon icon={faLungs} style={{ fontSize: '70px' }} />
                        </div>
                        <h1 style={{ marginLeft: '10px', fontSize: '40px' }}>92</h1>
                        <p className='text-end'>%SpO2</p>
                    </div>
                    <img
                        src="src/resources/banda_actualizada.png"
                        className="rounded mx-auto d-block mb-2 m-3"
                        alt="Ixchel"
                        style={{ width: '90%', height: 'auto' }}
                    />
                </div>
            </div>
        </>
    );
};

export default CardOxigenacion;
