import { toast } from 'react-toastify';

import { createUser } from '../firebase/UserActionsAdd';
import { signIn, isValidName } from '../firebase/UserActionsGet';

const toastMessage = () =>
  toast.loading('validando...', { toastId: 'showMessage' });

export async function validateUserMessage(username, email, password) {
  const comp = toastMessage();

  //Validate name
  if (await isValidName(username)) {
    const status = await createUser(username, email, password);

    //Validate account
    if (Array.isArray(status)) {
      error(comp, status[1]);
      //don't return any
      return;
    }

    sucessAdded(comp);

    return status;
  }

  error(comp, 'auth/name-used');
  return;
}

export async function SignUserMessage(email, password) {
  const comp = toastMessage();

  const user = await signIn(email, password);

  if (Array.isArray(user)) {
    error(comp, user[1]);
    return;
  }

  sucessCreated(comp);

  return user;
}

function errorMessage(message) {
  switch (message) {
    case 'auth/invalid-email':
      return 'Verifique que el correo tenga (@ y .).';

    case 'auth/weak-password':
      return 'Contraseña debil. Debe tener mas de 8 caracteres.';

    case 'auth/email-already-in-use':
      return 'Correo ya en uso. Use otro.';

    case 'auth/too-many-requests':
      return 'Servidor no disponible, intentelo mas tarde.';

    case 'auth/user-not-found':
      return 'Este usuario no existe.';

    case 'auth/wrong-password':
      return 'Contraseña incorrecta.';
    case 'auth/name-used':
      return 'Nombre ya en uso.';

    default:
      return message;
  }
}

//Config to sucess Add user
const configSucessAddedMessage = {
  type: toast.TYPE.SUCCESS,
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: true,
  draggable: false,
  progress: undefined,
  isLoading: false,
};

const sucessAdded = (component) => {
  toast.update(component, {
    render: 'Usuario creado! Verifique su correo.',
    ...configSucessAddedMessage,
  });
};

//Config to create user
const configSucessLoggedMessage = {
  type: toast.TYPE.SUCCESS,
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: false,
  draggable: false,
  progress: undefined,
  isLoading: false,
};

const sucessCreated = (component) => {
  toast.update(component, {
    render: 'Iniciando sesion...',
    ...configSucessLoggedMessage,
  });
};

//Config to warning error
const update_wanm = {
  position: 'top-right',
  type: toast.TYPE.ERROR,
  closeOnClick: true,
  draggable: false,
  progress: undefined,
  autoClose: 3000,
  isLoading: false,
};

const error = (component, message) => {
  toast.update(component, {
    render: errorMessage(message),
    ...update_wanm,
  });
};
