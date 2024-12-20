import React, { useState } from "react";
import "../Style/login.css";
import { useNavigate } from "react-router-dom";
import { getLogin } from "../Controller/apiServices";

const Login = () =>
{
  const [ username, setUsername ] = useState( "admin" );
  const [ password, setPassword ] = useState( "admin123" );
  const navigate = useNavigate();

  const handleSubmit = async ( e ) =>
  {
    e.preventDefault();

    const response = await getLogin( username, password );
    if ( response.status === 200 || response.status === 201 )
    {
      localStorage.setItem( "account", JSON.stringify( response.data ) );
      navigate( "/starter" );
      window.location.reload();
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Account Login</h2>
        <form onSubmit={ handleSubmit }>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="username"
              name="username"
              value={ username }
              onChange={ ( e ) => setUsername( e.target.value ) }
              placeholder="Enter your username/email"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={ password }
              onChange={ ( e ) => setPassword( e.target.value ) }
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
