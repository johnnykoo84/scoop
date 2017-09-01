import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Container, Button, Form, Message } from 'semantic-ui-react';
import * as actions from '../../actions';
import FormField from '../../containers/formfield';
import { validate } from '../utils/validate';

class Signin extends Component {
  handleFormValues(values) {
    // console.log(values);
    // need to do something to log user in
    this.props.signinUser(values, () => {
      this.props.history.push('/features');
    });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <Message negative>
          <Message.Header>0ops!</Message.Header>
          <p>{this.props.errorMessage}</p>
        </Message>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Container>
        <h1>로그인</h1>
        <Form onSubmit={handleSubmit(this.handleFormValues.bind(this))}>
          <Field
            name="email"
            component={FormField}
            label="Email"
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
        </Form>
      </Container>
    );
  }
}


function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'signin',
  validate,
})(Signin));
