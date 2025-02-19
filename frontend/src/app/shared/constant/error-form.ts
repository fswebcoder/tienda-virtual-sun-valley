
export const ERROR_FORMS = {
  login: {
    username: {
      required: 'El usuario es requerido',
      minlength: 'El usuario debe tener al menos 3 caracteres',
      maxlength: 'El usuario debe tener menos de 20 caracteres',
    },
    password: {
      required: 'La contraseña es requerida',
      minlength: 'La contraseña debe tener al menos 3 caracteres',
      maxlength: 'La contraseña debe tener menos de 20 caracteres',
    },
  },

  editProduct: {
    name: {
      required: 'El nombre es requerido',
    },
    description: {
      required: 'La descripción es requerida',
    },
    price: {
      required: 'El precio es requerido',
      min: 'El precio debe ser mayor a 0',
    },
    stock: {
      required: 'El stock es requerido',
      min: 'El stock debe ser mayor a 0',
    },
    image: {},
  },

  user:{
      name:{
        required: 'El nombre es requerido',
      },
      email: {
        required: 'El nombre es requerido',
      },
      passwor:{
        required: 'El nombre es requerido',
      },
      rol:{
        required: 'El nombre es requerido',
      }
  }

};
