import React from "react";
import useFormValidation from './useFormValidation';
import validateLogin from './validateLogin';

import firebase from '../../firebase';

const INITIAL_STATE = {
  name: "",
  email: "",
  password: ""
}

//register form
//login form
function Login(props) {
  const {handleChange, handleBlur, handleSubmit, values, errors, isSubmitting} = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);
  const [login, setLogin] = React.useState(true);
  const [firebaseError, setFirebaseError] = React.useState(null);

  async function authenticateUser() {
    const {name, email, password} = values;
    try {
      login 
      ? await firebase.login(email, password) 
      : await firebase.register(name, email, password);
    } catch(err) {
      console.log("auth err", err);
      setFirebaseError(err.message);
    }
  
  }
  return (
  <div>
    <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>

    <form onSubmit={handleSubmit} className="flex flex-column">
      {!login &&
           <input 
           type="text"
           name="name"
           value={values.name}
           placeholder="your name"
           autoComplete="off"
           onChange={handleChange}
         />
      }
     
      <input 
        type="email"
        name="email"
        value={values.email}
        onBlur={handleBlur}
        placeholder="your email"
        className={errors.email && 'error-input'}
        autoComplete="off"
        onChange={handleChange}
      />
      {errors.email && <p className="errors-text">{errors.email}</p>}
       <input 
        type="password"
        name="password"
        value={values.password}
        className={errors.password && 'error-input'}
        onBlur={handleBlur}
        placeholder="super secret password"
        onChange={handleChange}
      />
{errors.password && <p className="errors-text">{errors.password}</p>}
  {firebaseError && <p className="error-text">{firebaseError}</p>}
      <div className="flex mt3">
        <button type="submit" className="button pointer mr3" disabled={isSubmitting} style={{background : isSubmitting ? 'grey' : 'orange'}}>
          Submit
        </button>
        <button type="button" className="button pointer" onClick={() => setLogin(prevLogin => !prevLogin)}>
          {login ? "Need An Account?" : "Already have an account?"}
        </button>
      </div>
    </form>
  </div>
  );
}

export default Login;
