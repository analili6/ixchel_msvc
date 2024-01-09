import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';

const CardTemperatura = () => {
    return (
        <>
            <div className="card border shadow-lg p-2 mb-3 bg-white rounded">
                <div className="card-title">
                    
                    <h1 className="ms-2 mb-3 text-center" style={{ color: '#1b8ca3' }}>
                        Temperatura
                    </h1>

                    <div className='ms-2 mb-2' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ color: '#B8285C' }}>
                            <FontAwesomeIcon icon={faTemperatureHigh} style={{ fontSize: '70px' }} />
                        </div>
                        <h1 style={{ marginLeft: '10px', fontSize: '40px' }}>34°</h1>
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

export default CardTemperatura;
