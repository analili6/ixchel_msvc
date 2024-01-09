
import FormularioRegistroContacto from './FormularioRegistroContacto';
import BannerIxchelInfo from './BannerIxhcelInfo';
import BannerPrincipal from './BannerPrincipal';
import Footer from './footer';

const RegistroBebe = () => {

    // if (!storedCorreo) {

    //     return (
    //         <>
    //             <h1>No tienes los permisos para estar aquí</h1>
    //         </>
    //     );
    // }

    // // Resto de tu componente aquí
    // else {


    return(
    <>

        <div className="container">
            <div className="row">
                <div>
                    <BannerPrincipal titulo={"Registro de un Contacto"} />
                </div>
                <BannerIxchelInfo />
                <FormularioRegistroContacto />
            </div>
            <div className='mb-5'></div>

        </div>
        <Footer />

    </>)
}
// }

export default RegistroBebe;