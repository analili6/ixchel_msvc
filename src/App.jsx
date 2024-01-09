import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Default from './components/Default'
import CrearCuenta from './components/CrearCuenta'
import Layout from './components/Layout'
import Login from './components/Login'
import RecuperarCuenta from './components/RecuperarCuenta';
import RegistroCodigoVerificacion from './components/RegistroCodigoVerificación';
import VerificacionInicioSesion from './components/VerificacionInicioSesion';
import RegistroBebe from './components/RegistroBebe';
import RegistroContacto from './components/RegistroContacto'
import VerificacionCodigoContacto from './components/VerificacionCodigoContacto';
import RegistroFinalizado from './components/RegistroFinalizado';
import Dashboard from './components/Dashboard'
import FormularioEditarBebe from './components/FormularioEditarBebe'
function App() {
    return (
        <>
           
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path='/' element={<Login />} />
                    <Route path='/default' element={<Default />} />
                    <Route path='/recuperarCuenta' element={<RecuperarCuenta />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/registroCodigoVerificacion' element={<RegistroCodigoVerificacion />}/>
                    <Route path='/registroUsuario' element={<CrearCuenta/>} />
                    <Route path='/codigoVerifica' element={<VerificacionInicioSesion/>}/>
                    <Route path='/registroBebe' element={<RegistroBebe/>}/>
                    <Route path='/RegistroContacto' element= {<RegistroContacto/>}/>
                    <Route path='/codigoVerificaContacto' element= {<VerificacionCodigoContacto/>}/>
                    <Route path='/registroFinalizado' element= {<RegistroFinalizado/>}/>
                    <Route path='/dashboard' element={<Dashboard/>}/>
                    <Route path='/editarBebe' element={<FormularioEditarBebe/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
