import React, { useEffect, useState } from 'react';
import CardOxigenacion from "./CardOxigenacion";
import CardPulsoCardiaco from "./CardPulsoCardiaco";
import CardTemperatura from "./CardTemperatura";
import CardInfoInfante from "./CardInfoInfante";
import CardInfoContacto from "./CardInfoContacto";
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLungs } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
    

   

    return (
        <div className="container-fluid">
            <Header />
            <div className="row">
                
                <div className="col-md-3 mt-2">
                    <CardInfoInfante />
                </div>
                <div className="col-md-6 col-xl-6 mt-2">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6 col-xl-12">
                                <CardPulsoCardiaco  />
                            </div>
                            <div className="col-md-6 col-xl-6">
                                <CardTemperatura  />
                            </div>
                            <div className="col-md-6 col-xl-6">
                                <CardOxigenacion  />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 col-xl-2">
                    <CardInfoContacto />
                </div>
                <div className="col-xl-3 bg-dark">
                    {/* Contenido para la cuarta columna */}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
