import React from "react";
import {Redirect, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import "./Signin.css"
import logo from './logo.svg'
import { SigninSchema } from "../validation/formValidation.js";
import { useDispatch, useSelector} from "react-redux";
import { signin } from "../actions/auth.js";
import  {SIGNUP_RESET, SIGNIN_RESET} from '../actions/types.js'

const Signin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector(state => state.auth)
  const togglePanel = () => {
    history.push("/signup");
    dispatch({type: SIGNUP_RESET,})
    dispatch({type: SIGNIN_RESET,})
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SigninSchema,
    onSubmit: (values, { resetForm }) => {
      const form = {
        email: values.email,
        password: values.password,
      };
      dispatch(signin(form)).then(() => {
        history.push("/home");
      });
      resetForm();
    },
  });
  if (auth.login) {
    return <Redirect to='/home' />;
  }
  return (
    <section className='login-section'>
      <div className='container-login'>
      <form className='login-form' onSubmit={formik.handleSubmit}>
        <img src={logo} className="logo-login"/>
        <div className='input-container'>
        <label className='login-form-label' htmlFor='email'>Email</label>
        <input
          id='email'
          name='email'
          type='email'
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className='form-error'>{formik.errors.email}</div>
        ) : null}
        {auth.login_error ? (
          <div className='database-validation-login'>
            Nie znaleziono konta o takim adresie e-mail. 
          </div>
        ) : null}

        <label htmlFor='password'>Hasło</label>
        <input
          id='password'
          name='password'
          type='password'
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <button className='login-button-signin' type='submit'>Zaloguj</button>
        </div>
      </form>
      <div className='aside-div'>
        <p>Nie masz jeszcze konta TouchTalk?</p>
        <button className='register-button-signin' onClick={togglePanel}>Utwórz nowe konto</button>
      </div>
      </div>
    </section>
    
  );
};

export default Signin;
