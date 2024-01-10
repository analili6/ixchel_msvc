import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa el CSS de Bootstrap
import { Button } from 'react-bootstrap';
import BannerPrincipal from './BannerPrincipal';

const FormularioEditarContacto = () => {
  const [infanteData, setInfanteData] = useState({
    curp: '',
    nombreContacto: '',
    apPaterno: '',
    apMaterno: '',
    parentesco: '',
    email: '',
  });
  const curp = localStorage.getItem('curp');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://189.138.113.161:8080/api/contacto/search-by-curp//${curp}`);
        const data = await response.json();
        setInfanteData(data[0] || {});
      } catch (error) {
        console.error('Error al obtener datos del servidor:', error);
      }
    };

    fetchData();
  }, [curp]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://189.138.113.161:8080/api/contacto/update/${infanteData.curp}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombreInfante: infanteData.nombreInfante,
          apPaterno: infanteData.apPaterno,
          apMaterno: infanteData.apMaterno,
          sexo: infanteData.sexo,
          tipoSangre: infanteData.tipoSangre,
          fechanac: infanteData.fechanac,
          talla: infanteData.talla.toString(), // Asegúrate de enviarlo como cadena
          peso: infanteData.peso.toString(), // Asegúrate de enviarlo como cadena
          observaciones: infanteData.observaciones
        })
      });

      if (response.ok) {
        console.log('Datos actualizados correctamente');
        // Puedes añadir aquí alguna lógica adicional o redireccionar al usuario
      } else {
        console.error('Error al actualizar los datos:', response.statusText);
      }
    } catch (error) {
      console.error('Error al realizar la petición de actualización:', error);
    }
  };

  return (
    <div className="container">
      <BannerPrincipal titulo={'Actualización de datos del bebé'} />
      <div className="col-md-3"></div>
      <div className="row justify-content-start">
        <div className="col-lg-6 col-md-8">
          <div className="card">
            <div className="card-body">
              {infanteData ? (
                <form className="mb-3">
                  <div className="mb-3">
                    <label className="form-label">Curp:</label>
                    <input type="text" className="form-control" value={infanteData.curp} readOnly />
                  </div>

                  <div className="mb-1">
                    <label className="form-label">Nombre del Infante:</label>
                    <input type="text" className="form-control" value={infanteData.nombreInfante} onChange={(e) => setInfanteData({...infanteData, nombreInfante: e.target.value})} />
                  </div>

                  <div className="mb-1">
                    <label className="form-label">Apellido Paterno:</label>
                    <input type="text" className="form-control" value={infanteData.apPaterno} onChange={(e) => setInfanteData({...infanteData, apPaterno: e.target.value})} />
                  </div>

                  <div className="mb-1">
                    <label className="form-label">Apellido Materno:</label>
                    <input type="text" className="form-control" value={infanteData.apMaterno} onChange={(e) => setInfanteData({...infanteData, apMaterno: e.target.value})} />
                  </div>

                  <div className="mb-1">
                    <label className="form-label">Sexo:</label>
                    <input type="text" className="form-control" value={infanteData.sexo} onChange={(e) => setInfanteData({...infanteData, sexo: e.target.value})} />
                  </div>

                  <div className="mb-1">
                    <label className="form-label">Tipo de Sangre:</label>
                    <input type="text" className="form-control" value={infanteData.tipoSangre} onChange={(e) => setInfanteData({...infanteData, tipoSangre: e.target.value})} />
                  </div>

                  <div className="mb-1">
                    <label className="form-label">Fecha de Nacimiento:</label>
                    <input type="date" className="form-control" value={infanteData.fechanac} onChange={(e) => setInfanteData({...infanteData, fechanac: e.target.value})} />
                  </div>

                  <div className="mb-1">
                    <label className="form-label">Talla:</label>
                    <input type="text" className="form-control" value={infanteData.talla} onChange={(e) => setInfanteData({...infanteData, talla: e.target.value})} />
                  </div>

                  <div className="mb-1">
                    <label className="form-label">Peso:</label>
                    <input type="text" className="form-control" value={infanteData.peso} onChange={(e) => setInfanteData({...infanteData, peso: e.target.value})} />
                  </div>

                  <div className="mb-1">
                    <label className="form-label">Observaciones:</label>
                    <textarea className="form-control" value={infanteData.observaciones} onChange={(e) => setInfanteData({...infanteData, observaciones: e.target.value})} />
                  </div>

                  <Button variant="primary" onClick={handleUpdate}>
                    Actualizar Datos
                  </Button>
                </form>
              ) : (
                <p>Cargando datos...</p>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-8">
          <div className="row justify-content-start">
            <div className="col-md-9">
              <div className="card text-bg-dark pb-4">
                {/* Contenido del banner adicional ... */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioEditarBebe;
