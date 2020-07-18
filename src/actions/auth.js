import Swal from 'sweetalert2';

import { types } from "../types/types";
import {firebase, googleAuthProvider} from '../firebase/firebase-config';
import { startLoading, finishLoading } from "./ui";
import { noteLogout } from './notes';

export const startLoginEmailPassword = (email, password) => {
  // cuando sean tareas asincronas se retorna un callback, a ese callback le tienes que pasar como argumento el disptach a ejecutar
  return (dispatch) => {

    dispatch(startLoading());// verificando si esta cargando

    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        const { user } = data; //destrcuturing data

        

        // ejecutando el dispatch, modificando el state
        dispatch(
          login(
            user.uid,
            user.displayName
          )
        )

        dispatch(finishLoading());// verificando si esta cargando

      })
      .catch((error) => {
        dispatch(finishLoading());// verificando si esta cargando
        console.log(error);
        Swal.fire('Error, ', error.message, 'error');
      })
    
  }
}

export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => { // destructuring obteniendo datos del user
        // se usa async/await para manejar las promesas mas eficientemente
        
        // con este metodo de firebase se agrega el nombre de usuario y una foto de perfil si es requerido (este metodo retorna una promesa)
        await user.updateProfile({ displayName: name });

        // dispatch para modificar el state
        dispatch(
          login(
            user.uid,
            user.displayName
          )
        )
      })
      .catch((error) => {
        console.log(error);
        Swal.fire('Error, ', error.message, 'error');
      })
  }
}

export const startGoogleLogin = () => {
  return (dispatch) => {

    // se usa firebase.auth para autenticar ese usuario
    firebase.auth().signInWithPopup(googleAuthProvider)
      .then(({user}) => { // destructuring para obtener el user
        dispatch(
          login( // ejecutando el otro dispatch ya con la data obtenida
            user.uid,
            user.displayName
          )
        )
      })
  }
}

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName       
  }
});

export const startLogout = () => {
  return async (dispatch) => {

    try {
      // metodo para cerrar la cuenta en firebase
      await firebase.auth().signOut();

      // action para modificar el state y cerrar sesion
      dispatch(logout());

      // action para borrar las notas de redux 
      dispatch(noteLogout());


    } catch (error) {
      console.log(error);
    }
  }
}

export const logout = () => ({
  type: types.logout
});

