export const userInfoValidation = (userInfo) => {
    console.log(userInfo);
    if(!userInfo.firstName) return  'El nombre es requerido'
    if(!userInfo.lastName) return  'El apellido es requerido'
    if(!userInfo.email) return 'El correo es requerido'
    if(userInfo.password){
        if(userInfo.password.length < 6) return 'La contraseña debe tener al menos 6 caracteres'
        if(!userInfo.repeatPassword) return 'La contraseña es requerida'
        if(userInfo.password !== userInfo.repeatPassword) return 'Las contraseñas no coinciden'
    }
    if(!userInfo.address) return 'La dirección es requerida'
    if(!userInfo.state) return  'El departamento es requerido'
    if(!userInfo.city) return 'La ciudad es requerida'
    if(!userInfo.phoneNumber) return 'El teléfono es requerido'
    if(userInfo.phoneNumber.length < 12) return  'El teléfono debe tener al menos 10 caracteres'
    if(!userInfo.bank) return 'Selecciona un método de pago'
}