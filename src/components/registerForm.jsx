import React from "react";
import Joi from 'joi-browser';
import Form from './common/forms'

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required().email()
      .label("Username"),
    name: Joi.string()
      .required()
      .label("Name"),
    password: Joi.string().min(5)
      .required()
      .label("Password")
  };

   doSubmit = () => {
		//Call the server
		console.log('Submitted');
	}

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
					{this.renderInput('password', 'Password', 'password')}
					{this.renderInput('name', 'Name')}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
