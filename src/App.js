import React, { Component } from 'react';
import FormValidator from './FormValidator';
import './App.css';
class App extends Component {
  constructor() {
    super();
    this.validator = new FormValidator([{
      field: 'company_name',
      method: 'isEmpty',
      validWhen: false,
      message: 'Enter company name.'
    }, {
      field: 'email',
      method: 'isEmpty',
      validWhen: false,
      message: 'Enter your email address.'
    }, {
      field: 'email',
      method: 'isEmail',
      validWhen: true,
      message: 'Enter valid email address.'
    }, {
      field: 'password',
      method: 'isEmpty',
      validWhen: false,
      message: 'Enter password.'
    }]);
    this.state = {
      company_name: '',
      email: '',
      password: '',
      validation: this.validator.valid(),
    }
    this.submitted = false;
  }
  passwordMatch = (confirmation, state) => (state.password === confirmation)
  handleInputChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  handleFormSubmit = event => {
    event.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({
      validation
    });
    this.submitted = true;
    if (validation.isValid) {
      //reaches here if form validates successfully...
    }
  }
  render() {
    let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <form className="registrationForm">
              <h2>Sign Up</h2>
              <p>No credit card required</p>
              <div className={validation.email.isInvalid && 'has-error'}>
                <input type="email" className="form-control" name="email" placeholder="Email address" onChange={this.handleInputChange} /> <span className="help-block">{validation.email.message}</span> </div>
              <div className={validation.email.isInvalid && 'has-error'}>
                <input type="string" className="form-control" name="company_name" placeholder="Company Name" onChange={this.handleInputChange} /> <span className="help-block">{validation.company_name.message}</span> </div>
              <div className={validation.password.isInvalid && 'has-error'}>
                <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.handleInputChange} /> <span className="help-block">{validation.password.message}</span> </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                  <label class="form-check-label" for="invalidCheck">
                    Agree to terms and conditions
                  </label>
              </div>
              <button onClick={this.handleFormSubmit} className="btn btn-danger">Get Started</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default App;