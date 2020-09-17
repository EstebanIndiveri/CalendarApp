import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { validateColor, validateEmail } from "../helpers/validators";
import { types } from "../types/types";

export const startLogin=(email,password)=>{
    return async(dispatch)=>{
        if(validateEmail(email)){
            validateColor('#customEmail','is-valid');
            const resp=await fetchSinToken('auth',{email,password},'POST');
            const body=await resp.json();

            if(body.ok){
                localStorage.setItem('token',body.token);
                localStorage.setItem('token-init-date',new Date().getTime());
                dispatch(login({
                    uid:body.uid,
                    name:body.name
                }));
            };

        }else{
            Swal.fire('Error','Correo electronico invalido','error');
            validateColor('#customEmail','is-invalid');
        }

    }
}
export const startRegister=(name,email,password)=>{
    return async(dispatch)=>{
        const resp=await fetchSinToken('auth/new',{email,password,name},'POST');
        const body=await resp.json();

        if(body.ok){
            localStorage.setItem('token',body.token);
            localStorage.setItem('token-init-date',new Date().getTime());
            dispatch(login({
                uid:body.uid,
                name:body.name
            }));
        }else{
            Swal.fire('Error',body.msg,'error');
        }
    }
}

export const startChecking=()=>{
    return async(dispatch)=>{
        const resp=await fetchConToken('auth/renew');
        const body=await resp.json();

        if(body.ok){
            localStorage.setItem('token',body.token);
            localStorage.setItem('token-init-date',new Date().getTime());
            dispatch(login({
                uid:body.uid,
                name:body.name
            }));
        }else{
            // Swal.fire('Error',body.msg,'error');
            dispatch(checkingFinish());
        }
    }
}
const checkingFinish=()=>({type:types.authCheckingFinish});

const login=(user)=>({
    type:types.authLogin,
    payload:user
});

export const startLogout=()=>{
    return(dispatch)=>{
        localStorage.clear();
        dispatch(logout());
    }
}

const logout=()=>({type:types.authLogout});