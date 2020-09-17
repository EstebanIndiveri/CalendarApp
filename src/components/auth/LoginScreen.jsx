import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin,startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';

export const LoginScreen = () => {
    const dispatch = useDispatch();
   
    const [ formLoginValues, handleLoginInputChange ] = useForm({
        lEmail:'algo@gmail.com',
        lPassword:'123456'
    });

    const [ formRegisterValues, handleRegisterInputChange ] = useForm({
        rName:'Nando',
        rEmail:'nando@gmail.com',
        rPassword1:'123456',
        rPassword2:'123456',
    });

    const{rName,rEmail,rPassword1,rPassword2}=formRegisterValues

    const{lEmail,lPassword}=formLoginValues;

    const handleLogin=(e)=>{
        e.preventDefault();
        dispatch(startLogin(lEmail,lPassword));
    }
    const handleRegister=(e)=>{
        e.preventDefault();
        if(rPassword1!==rPassword2){
            return Swal.fire('Error','Las contraseñas deben ser iguales','error');
        };
        dispatch(startRegister(rName,rEmail,rPassword1));
    }
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control m-1 "
                                placeholder="Correo"
                                id="customEmail"
                                name="lEmail"
                                value={lEmail}
                                onChange={handleLoginInputChange}
                            />
                    
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control m-1"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={lPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control m-1"
                                placeholder="Nombre"
                                name="rName"
                                value={rName}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control m-1"
                                placeholder="Correo"
                                name="rEmail"
                                onChange={handleRegisterInputChange}
                                value={rEmail}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control m-1"
                                placeholder="Contraseña" 
                                name="rPassword1"
                                onChange={handleRegisterInputChange}
                                value={rPassword1}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control m-1"
                                placeholder="Repita la contraseña" 
                                name="rPassword2"
                                onChange={handleRegisterInputChange}
                                value={rPassword2}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}