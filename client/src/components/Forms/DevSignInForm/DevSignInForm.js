import React, { useState } from 'react';
import {
  Redirect, useHistory
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { signin } from '../../../redux/reducers/isLogged.reducer';
import { newUser } from '../../../redux/reducers/currentUser.reducer';
import DevService from '../../../services/dev.service';
import '../SignForm.css';

function DevSignInForm() {
  const [error, setError] = useState(' ');
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();


  function handleClick(event) {

    event.preventDefault();

    const form = document.getElementById('dev_log_in_form');
    const formData = new FormData(form);

    DevService.signin(formData)
    .then(response => {
      dispatch(signin());
      dispatch(newUser())
      setRedirect(true);
    })
    .catch((error) => {
      setError(error.response.data.message);
    });
  }

  function ifRedirect() {
    if (redirect) {
      if (history.location.state) {
        return <Redirect to={history.location.state.referrer} />
      }
      return <Redirect to='/dev/dashboard' />;
    }
    return(
      <>
        <form className="form" id="dev_log_in_form">
          <label> Username
            <input className="inputStyle" type="text" name="user_name" required/>
          </label>
          <label> Password
            <input className="inputStyle" type="password" name="password" required/>
          </label>
          <button className="primary_color_bg" type="submit" onClick={event => handleClick(event)}>Submit</button>
          <label className="styleError">{error}</label>
        </form>
      </>
    );
  }

  return ifRedirect();
}


  
export default DevSignInForm;