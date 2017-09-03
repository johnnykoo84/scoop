import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Container, Button, Form, Message } from 'semantic-ui-react';
import * as actions from '../../actions';
import FormField from '../../containers/formfield';
import { validateSignin } from '../utils/validate';

class Signin extends Component {
  handleFormValues(values) {
    // console.log(values);
    // need to do something to log user in
    this.props.signinUser(values, () => {
      this.props.history.push('/');
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
        <Form
          name="signinForm"
          onSubmit={handleSubmit(this.handleFormValues.bind(this))}
        >
          <Field
            name="email"
            component={FormField}
            as={Form.Input}
            type="email"
            label="Email 주소"
            placeholder="email 주소를 입력해 주세요"
          />
          <br />
          <Field
            name="password"
            component={FormField}
            as={Form.Input}
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해 주세요"
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
  validate: validateSignin,
})(Signin));
