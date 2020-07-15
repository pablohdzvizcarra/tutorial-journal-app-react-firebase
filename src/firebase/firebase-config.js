// importaciones necesarias de firebase
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


// configuracion de firebase obtenida desde firebase en la web
const firebaseConfig = {
  apiKey: "AIzaSyB1AUYnfE5v7TvEmRPaJ8Jr-5y226Z9ppw",
  authDomain: "journal-app-3c50b.firebaseapp.com",
  databaseURL: "https://journal-app-3c50b.firebaseio.com",
  projectId: "journal-app-3c50b",
  storageBucket: "journal-app-3c50b.appspot.com",
  messagingSenderId: "32075617344",
  appId: "1:32075617344:web:e1d39ec4dead022e743ba5"
};

// con este metodo de firebase se inicia el app
firebase.initializeApp(firebaseConfig);

// crear base de datos en firebase
const db = firebase.firestore();

// creando la autenticacion con google
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  db,
  googleAuthProvider,
  firebase
}
