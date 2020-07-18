// importaciones necesarias de firebase
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


// configuracion de firebase obtenida desde firebase en la web
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
};

firebase.initializeApp(firebaseConfig);

// configuracion de firebase testing
/*
const firebaseConfigTesting = {
  apiKey: "AIzaSyBoEbWoxQCUqFBgphteRmuCdvx445XJPFI",
  authDomain: "testing-apps-8b45b.firebaseapp.com",
  databaseURL: "https://testing-apps-8b45b.firebaseio.com",
  projectId: "testing-apps-8b45b",
  storageBucket: "testing-apps-8b45b.appspot.com",
  messagingSenderId: "229559352550",
  appId: "1:229559352550:web:e17a1d64d7792d99b84f27"
};
*/

/*
// comprobamos enque ambiente estamos trabajando
if (process.env.NODE_ENV === 'test') {

  // testing
  firebase.initializeApp(firebaseConfigTesting);
} else {

  // dev/production
  firebase.initializeApp(firebaseConfig);
}
*/

// con este metodo de firebase se inicia el app

// crear base de datos en firebase
const db = firebase.firestore();

// creando la autenticacion con google
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
  db,
  googleAuthProvider,
  firebase
}
