import { min } from "rxjs";

export const ERROR_FORMS = {
    login: {
       username: {
            required: 'El usuario es requerido',
            minlength: 'El usuario debe tener al menos 3 caracteres',
            maxlength: 'El usuario debe tener menos de 20 caracteres'
       } ,
         password: {
                required: 'La contraseña es requerida',
                minlength: 'La contraseña debe tener al menos 3 caracteres',
                maxlength: 'La contraseña debe tener menos de 20 caracteres'
         }
    },


}