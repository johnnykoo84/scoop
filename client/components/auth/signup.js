import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Container, Button, Form, Message } from 'semantic-ui-react';
import * as actions from '../../actions';
import FormField from '../../containers/formfield';
import { validateSignup } from '../utils/validate';

class SignUp extends Component {
  handleFormValues(values) {
    // need to do something to log user in
    this.props.signupUser(values, () => {
      this.props.history.push('/');
    });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <Message negative>
          <Message.Header>Oops!</Message.Header>
          <p>{this.props.errorMessage.error}</p>
        </Message>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Container>
        <h1>회원 가입</h1>
        <p>30일 무료 체험으로 scoop을 사용해 보세요</p>
        <br />
        <Form
          name="signupForm"
          onSubmit={handleSubmit(this.handleFormValues.bind(this))}
        >
          <Field
            name="company"
            component={FormField}
            as={Form.Input}
            type="text"
            label="회사명"
            placeholder="회사 이름을 입력해 주세요"
          />
          <Field
            name="email"
            component={FormField}
            as={Form.Input}
            type="email"
            label="Email 주소"
            placeholder="email 주소를 입력해 주세요"
          />
          <Field
            name="password"
            component={FormField}
            as={Form.Input}
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해 주세요"
          />
          <Field
            name="passwordConfirm"
            component={FormField}
            as={Form.Input}
            type="password"
            label="비밀번호 재확인"
            placeholder="비밀번호를 다시 입력해 주세요"
          />
          {this.renderAlert()}
          <br />
          <Button primary type="submit">
            회원 가입
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
  form: 'signup',
  validate: validateSignup,
})(SignUp));
