
export const validateEmail=(email)=> {
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
export const validateColor=(elemnto,clase)=> {
    const customEmail=document.querySelector(elemnto);
            customEmail.classList.add(clase);
            setTimeout(() => {
            customEmail.classList.remove(clase);
            }, 3000);
}
