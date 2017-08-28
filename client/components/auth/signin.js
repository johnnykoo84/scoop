import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { Container, Button, Form, Message } from 'semantic-ui-react';
import FormField from '../../containers/formfield';

class Signin extends Component {
  handleFormValues(values) {
    // console.log(values);
    // need to do something to log user in
    this.props.signinUser(values, () => {
      this.props.history.push('/features');
    });
  }

  // renderInput({ label, ...field }) {
  //   return (
  //     <fieldset className="form-group">
  //       <label>{label}:</label>
  //       <input type={field.input.name} {...field.input } className="form-control" />
  //     </fieldset>
  //   );
  // }

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
      <Container>
        <h1>로그인</h1>
        <form onSubmit={handleSubmit(this.handleFormValues.bind(this))}>
          <Field
            name="email"
            component={FormField}
            label="Email 주소"
          />
          <br />
          <Field
            name="password"
            component={FormField}
            label="비밀번호"
          />
          {this.renderAlert()}
          <br />
          <Button primary type="submit">
            로그인
          </Button>
        </form>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(reduxForm({
      form: 'signin'
    })(Signin));
