import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
  handleFormValues(values) {
    // console.log(values);
    // need to do something to log user in
    this.props.signinUser(values, () => {
      this.props.history.push('/features');
    });

  }

  renderInput({ label, ...field }) {
    return (
      <fieldset className="form-group">
        <label>{label}:</label>
        <input type={field.input.name} {...field.input } className="form-control" />
      </fieldset>
    );
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>0ops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormValues.bind(this))}>
        <Field name="email" component={this.renderInput} label="Email" />
        <Field name="password" component={this.renderInput} label="Password" />
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(reduxForm({
      form: 'signin'
    })(Signin));
