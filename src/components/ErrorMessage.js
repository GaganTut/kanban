/*jshint esversion: 6*/
import React from 'react';

const ErrorMessage = (props) => {
  return (
    <div className="error-message">
      <h1>{props.errorMessage}</h1>
      <input type="button" onClick={props.closeError}/>
    </div>
  );
};

export default ErrorMessage;