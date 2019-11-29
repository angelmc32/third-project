import React from 'react';                        // Import React
import { NavLink } from 'react-router-dom';       // Import NavLink for "navigation"

// Declare AuthForm functional component, receives action variable for conditional rendering,
// email, password and confpassword variables from form state variable, and submit and handleChange functions
const AuthForm = ( { submit, action, usertype, email = '', password = '', confpassword = '', handleChange } ) => (

  usertype === "Patient" ? (
    <div>
    
      <div className="uk-margin-bottom">

        <h2>{action === "signup" ? "Registro" : "Inicia Sesión"}</h2>
    
        { action === "signup" ? (
          <h5>¿Ya tienes cuenta? 
            <NavLink to="/login" className="uk-margin-small-left">
              Accede aquí
            </NavLink>
          </h5>
          ) : (
          <h5>¿Primera vez? 
            <NavLink to="/signup" className="uk-margin-small-left">
              Regístrate aquí
            </NavLink>
          </h5>
          )
        }

      </div>

      <div className="uk-margin-top">

        <form className="uk-form-stacked uk-margin" onSubmit={submit}>
          
          <div className="uk-margin">
            <label className="uk-form-label">Correo Electrónico:</label>
            <div className="uk-inline">
              <span className="uk-form-icon" uk-icon="icon: user"></span>
              <input onChange={handleChange} name="email" value={email} className="uk-input" type="email" />
            </div>
          </div>

          <div className="uk-margin">
            <label className="uk-form-label">Contraseña:</label>
            <div className="uk-inline">
              <span className="uk-form-icon" uk-icon="icon: lock"></span>
              <input
                onChange={handleChange}
                name="password"
                value={password}
                className="uk-input"
                type="password"
              />
            </div>
          </div>

          { action === "signup" ? (
            <div className="uk-margin">
              <label className="uk-form-label">Confirma tu contraseña:</label>
              <div className="uk-inline">
                <span className="uk-form-icon" uk-icon="icon: lock"></span>
                <input
                  onChange={handleChange}
                  name="confpassword"
                  value={confpassword}
                  className="uk-input"
                  type="password"
                />
              </div>
            </div>
            ) : null }

          <div className="uk-margin">
            <label className="uk-form-label uk-margin">
              <input onChange={handleChange} className="uk-checkbox" type="checkbox" name="usertype" value={usertype}/> Soy paciente
            </label>
          </div>

          <button className="uk-button uk-button-primary uk-border-pill" type="submit">
            {action === "signup" ? "Registrar" : "Entrar"}
          </button>

        </form>

      </div>
    </div>
  ) : (
    <div>

      <div className="uk-margin-bottom">

        <h2>{action === "signup" ? "Registro Doctores" : "Inicio de Sesión Doctores"}</h2>
        
        {action === "signup" ? (
          <h5>¿Ya tienes cuenta? 
            <NavLink to="/doctor-login" className="uk-margin-small-left">
              Accede aquí
            </NavLink>
          </h5>
          ) : (
          <h5>¿Primera vez? 
            <NavLink to="/doctor-signup" className="uk-margin-small-left">
              Regístrate aquí
            </NavLink>
          </h5>
          )}

      </div>

      <div className="uk-margin-top">

        <form className="uk-form-stacked uk-margin" onSubmit={submit}>
          
          <div className="uk-margin">
            <label className="uk-form-label">Correo Electrónico:</label>
            <div className="uk-inline">
              <span className="uk-form-icon" uk-icon="icon: user"></span>
              <input onChange={handleChange} name="email" value={email} className="uk-input" type="email" />
            </div>
          </div>

          <div className="uk-margin">
            <label className="uk-form-label">Contraseña:</label>
            <div className="uk-inline">
              <span className="uk-form-icon" uk-icon="icon: lock"></span>
              <input
                onChange={handleChange}
                name="password"
                value={password}
                className="uk-input"
                type="password"
              />
            </div>
          </div>

          {action === "signup" ? (
            <div className="uk-margin">
              <label className="uk-form-label">Confirma tu contraseña:</label>
              <div className="uk-inline">
                <span className="uk-form-icon" uk-icon="icon: lock"></span>
                <input
                  onChange={handleChange}
                  name="confpassword"
                  value={confpassword}
                  className="uk-input"
                  type="password"
                />
              </div>
            </div>
          ) : null}
          <div className="uk-margin">
            <label className="uk-form-label uk-margin">
              <input onChange={handleChange} className="uk-checkbox" type="checkbox" name="usertype" value={usertype}/> Soy {usertype}
            </label>
          </div>
              
          <button className="uk-button uk-button-primary uk-border-pill" type="submit">
            {action === "signup" ? "Registrar" : "Entrar"}
          </button>

        </form>

      </div>
    </div>
  )
);

export default AuthForm;