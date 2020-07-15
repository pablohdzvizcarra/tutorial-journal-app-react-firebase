import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import { useForm } from '../../hooks/useForm'
import { setError, removeError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

  
  
  // usando el hook useDispatch 
  const dispatch = useDispatch();

  // usando el hook para traer los datos del state
  // const state = useSelector(state => state);
  const {msgError} = useSelector(state => state.ui);
  
  // estableciendo valores por defecto al formulario
  const [formValues, handleInputChange] = useForm({
    email: 'correo@correo.com',
    name: 'Lucero',
    password: '123456',
    password2: '123456',
  });

  //destructuring al objeto formValues
  const { email, name, password, password2 } = formValues;

  const handleRegister = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name));
    }
    
  }

  // validacion del formulario
  const isFormValid = () => {

    if (name.trim().length === 0) {
      dispatch(setError('No hay un nombre valido')); //usando un dispatch
      return false;
  
    } else if (!validator.isEmail(email)) {
      dispatch(setError('Email no valido')); //usando un dispatch
      return false;

    } else if (password !== password2 || password.length < 5) {
      dispatch(setError('Las password deben ser iguales y mayores a 5 caracteres')); //usando un dispatch
      return false
    }

    dispatch(removeError());
    return true;
  }

  return (
    <>
      <h3 className="auth__title">Register</h3>
      <form
        onSubmit={handleRegister}
      >
        
      {/* Se crea un mensaje de error condicional */}
        {
          msgError &&
          (
            <div className="auth__alert-error">
              {msgError}
            </div>
          )
        }
        
        <input
          autoComplete="off"
          className="auth__input"
          name="name"
          placeholder="Name"
          type="text"
          value={name}
          onChange={handleInputChange}
        />

        <input
          type="text" 
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />

        <input
          type="password" 
          placeholder="Password"
          name="password"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />

        <input
          type="password" 
          placeholder="Confirm Password"
          name="password2"
          className="auth__input"
          value={password2}
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="btn btn-primary btn-block mb-5"
        >
          Register
        </button>

        <Link
          to="/auth/login"
          className="link"
        >
          Already Registered?
        </Link>

      </form>
    </>
  )
}
