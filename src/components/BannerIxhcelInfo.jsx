//COMPONENTE PARA EL CARD DONDE CARGAS LAS IMAGENES EN UN CARD

import React from 'react';

const BannerIxchelInfo = () => {
    return (
        <div className="col-md-6">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-9">
                    <div className="card text-bg-dark pb-4">
                        <img src="src/resources/banner_prueba.png" className="card-img" alt="..." />
                        <div className="card-img-overlay">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p className="card-text"><small>Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default BannerIxchelInfo;