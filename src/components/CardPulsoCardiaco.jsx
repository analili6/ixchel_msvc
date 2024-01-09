import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartPulse } from '@fortawesome/free-solid-svg-icons';

const CardPulsoCardiaco = () => {
    return (
        <>
            <div className="card border shadow-lg p-2 bg-white rounded mt-4 mb-3">
                <div className="card-title">

                    <h1 className="ms-2  text-center" style={{ color: '#1b8ca3' }}>
                        Pulso Cardíaco
                    </h1>
                    <div className='ms-2' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ color: '#B8285C' }}>
                            <FontAwesomeIcon icon={faHeartPulse} style={{ fontSize: '70px' }} />
                        </div>
                        <h1 style={{ marginLeft: '10px', fontSize: '40px' }}>92</h1>
                        <p className='text-end'>LPM</p>
                    </div>
                    <img
                        src="src/resources/banda_actualizada.png"
                        className="rounded mx-auto d-block"
                        alt="Ixchel"
                        style={{ width: '90%', height: 'auto' }}
                    />
                </div>
            </div>
        </>
    );
};

export default CardPulsoCardiaco;
