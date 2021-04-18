import React from "react";
import {Redirect, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import "./Signin.css"
import logo from './logo.svg'
import { SigninSchema } from "../validation/formValidation.js";
import { useDispatch, useSelector} from "react-redux";
import { signin } from "../actions/auth.js";

const Signin = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector(state => state.auth)
  const togglePanel = () => {
    history.push("/signup");
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
    
    <section>
      <div className='container'>
      <form onSubmit={formik.handleSubmit}>
        <img src={logo} className="logo"/>
        <div className='input-container'>
        <label htmlFor='email'>Email</label>
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
      <aside>
        <p>Nie masz jeszcze konta TouchTalk?</p>
        <button className='register-button-signin' onClick={togglePanel}>Utwórz nowe konto</button>
      </aside>
      </div>
    </section>
    
  );
};

export default Signin;
