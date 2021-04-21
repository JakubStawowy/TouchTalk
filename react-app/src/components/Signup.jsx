import React from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import logo from './logo.svg'
import "./Signup.css"
import { SignupSchema } from "../validation/formValidation.js";
import { useDispatch, useSelector} from "react-redux";
import { signup } from "../actions/auth.js";

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  const togglePanel = () => {
    history.push("/");
  };

  if(auth.register_error) console.log("server error")

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values, { resetForm }) => {
      const form = {
        email: values.email,
        password: values.password,
        userDetails:{
          name: values.name, 
          surname: values.surname
        }
      };
      console.log(form)
      dispatch(signup(form));
      resetForm();
    },
  });
  return (
    <section className='container'>
      <div className='login-container'>
      <img src={logo} className="logo"/>
      <aside className='register-aside'>
        <p>Masz już konto TouchTalk?</p>
        <button onClick={togglePanel}>Zaloguj się</button>
      </aside>
      </div>
      <div className='register-container'>
      <h1>Załóż konto w TouchTalk</h1>
      <h3>Aby założyć konto, wypełnij poniższe pola</h3>
      <p>Twoje dane</p>
      <form className='register-form' onSubmit={formik.handleSubmit}>
        <div className='name-surname'>
          <div className='name'>
          <label htmlFor='firstname'>Imię</label>
          <input
            id='name'
            name='name'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        {formik.touched.name && formik.errors.name ? (
          <div className='form-error'>{formik.errors.name}</div>
        ) : null}
        </div>
        <div className='surname'>
        <label htmlFor='lastname'>Nazwisko</label>
        <input
          id='surname'
          name='surname'
          type='text'
          onChange={formik.handleChange}
          value={formik.values.surname}
        />
        {formik.touched.surname && formik.errors.surname ? (
          <div className='form-error'>{formik.errors.surname}</div>
        ) : null}
        </div>
        </div>

        <p>Dane konta</p>
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
        {formik.touched.password && formik.errors.password ? (
          <div className='form-error'>{formik.errors.password}</div>
        ) : null}
        <button className='register-button-signup' type='submit'>Zarejestruj</button>
      </form>
      </div>
    </section>
  );
};

export default Signup;
