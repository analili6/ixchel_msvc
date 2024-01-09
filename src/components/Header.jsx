import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, } from 'react-bootstrap';

const CustomNavbar = () => {
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleOffcanvasToggle = () => setShowOffcanvas(!showOffcanvas);

    return (
        <>
            <div className='mb-5'>
                <div className='pb-5'>
                    <Navbar bg="body-tertiary bg" fixed="top">
                        
                            <Link to="/dashboard">
                            <img
                                src="src/resources/png_logo.png"
                                className="rounded float-start me-3"
                                alt="Ixchel"
                                style={{ width: '30%', height: 'auto' }}
                            />
                            </Link>
                    </Navbar>
                </div>
            </div>
        </>
    );
}

export default CustomNavbar;
