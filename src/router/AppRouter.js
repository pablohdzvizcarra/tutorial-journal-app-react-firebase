import React, { useEffect } from 'react'
import { firebase } from '../firebase/firebase-config';

import {
  BrowserRouter as Router, Switch
} from 'react-router-dom'
import { AuthRouter } from './AuthRouter';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { JournalScreen } from '../components/journal/JournalScreen';
import { useState } from 'react';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from '../actions/notes';

export default function AppRouter() {


  const dispatch = useDispatch();

  /*
    Se crea un state para ver si el usuario esta autenticado,
    se esperara la respuesta que ejecute firebase en el useEffect
    y el renderizado de los componentes sera de forma asincrona
  */
  const [checking, setChecking] = useState(true);

  // verificamos si el usuario esta logeado
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    
    //este metodo de firebase crea un observable que cambiara cada vez que la
    // autenticacion se modifique
    // user tiene los datos del usuario autenticado
    firebase.auth().onAuthStateChanged(async (user) => {
      
      // si existe un usuario se obtiene el uid del user
      if (user?.uid) {

        // guardamos el usuario en el store si esta logeado en firebase
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);

        // dispatch para obtener las notas de firebase
        dispatch(startLoadingNotes(user.uid));
        
      } else {

        setIsLoggedIn(false);
      }

      // funcion para ver si el usuario esta autenticado
      setChecking(false);
    })
    
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return (
      <h1>Please Wait...</h1>
    )
  }

  return (
    <Router>
      <div>
        <Switch>
          
          <PublicRoute
            path="/auth"
            component={AuthRouter}
            isLoggedIn={isLoggedIn}
          />
          
          <PrivateRoute
            exact
            isLoggedIn={isLoggedIn}
            path='/'
            component={JournalScreen}
          />

        </Switch>
      </div>
    </Router>
  )
}