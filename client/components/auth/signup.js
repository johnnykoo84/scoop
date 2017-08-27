import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { Container, Button, Checkbox, Form, Modal, Input, Message} from 'semantic-ui-react';

class SignUp extends Component {
  handleFormValues(values) {

    // need to do something to log user in
    this.props.signupUser(values, () => {
      this.props.history.push('/features');
    });

  }

  renderInput({
    input, label, type, placeholder,
    meta: { touched, error, warning },
    as: As = Input,
    ...props
  }) {
    return (
      <Form.Field>
        <As
          {...props}
          {...input}
          value={input.value}
          type={type}
          label={label}
          placeholder={placeholder}
        />
            {touched && ((error && <Message negative><i>{error}</i></Message>)) || (warning && <Message negative><i>{warning}</i></Message>)}
        {/* <label>{label}:</label> */}
        {/* <input type={field.type} {...field.input } /> */}
        {/* {touched && error && <span><i>{error}</i></span>} */}
      </Form.Field>
    );
  }

  renderAlert() {
    if (this.props.errorMessage) {
      console.log('herer???????')
      return (
        <Message negative>
          <Message.Header>Oops!</Message.Header>
          <p>{this.props.errorMessage}</p>;
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
            name="email"
            component={this.renderInput}
            as={Form.Input}
            type="email"
            label="Email 주소"
            placeholder="email 주소를 입력해 주세요"
          />
          <Field
            name="password"
            component={this.renderInput}
            as={Form.Input}
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해 주세요"
          />
          <Field
            name="passwordConfirm"
            component={this.renderInput}
            as={Form.Input}
            type="password"
            label="비밀번호 재확인"
            placeholder="비밀번호를 다시 입력해 주세요"
          />
          {this.renderAlert()}
          <Button primary type="submit">
            회원 가입
          </Button>
        </Form>
      </Container>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'email주소를 입력해 주세요';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = '잘못된 email 주소 형식입니다';
  }

  if (!formProps.password) {
    errors.password = '비밀번호를 입력해 주세요';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = '비밀번호를 재입력해 주세요';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = '비밀번호가 일치하지 않습니다';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'signup',
  validate
})(SignUp));
