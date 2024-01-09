//COMPONENTE QUE CONTIENE EL LOGO Y EL TITULO DE CADA
//import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../resources/logo_bueno.jpg';
import barra from '../resources/banda_actualizada.png';
const BannerPrincipal = ({ titulo }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-4">
          <Link to="/">
            <img
              src={logo}
              className="rounded mx-auto d-block mb-2"
              alt="Ixchel"
              style={{ width: '20%', height: 'auto' }}
            />
          </Link>
        </div>
        <h2 className='text-semibold text-center' style={{ color: "#B8285C" }}>{titulo}</h2>
        <div className='col-12'>
          <img
            src={barra}
            className="rounded mx-auto d-block mb-3"
            alt="Ixchel"
            style={{ width: '50%', height: 'auto' }}
          />
        </div>
      </div>
    </div>
  );
}

export default BannerPrincipal;
