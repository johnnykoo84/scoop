import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Container, Button, Form, Message } from 'semantic-ui-react';
import * as actions from '../actions';
import FormField from '../containers/form_field';
import { validateNewSpace } from './utils/validate';

class AddSpace extends Component {
  handleFormValues(value) {
    // console.log(values);
    // need to do something to log user in
    this.props.addSpace(value.name, () => {
      console.log('space added successfully')
      this.props.history.push('/selectspace');
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
        <h1>지점 추가</h1>
        <Form
          name="addSpaceForm"
          onSubmit={handleSubmit(this.handleFormValues.bind(this))}
        >
          <Field
            name="name"
            component={FormField}
            as={Form.Input}
            type="text"
            label="지점 이름"
            placeholder="새로운 지점 이름을 입력해 주세요"
          />
          {this.renderAlert()}
          <br />
          <Button primary type="submit">
            추가
          </Button>
        </Form>
      </Container>
    );
  }
}


function mapStateToProps(state) {
  return { errorMessage: state.spacelist.error };
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'add_space',
  validate: validateNewSpace,
})(AddSpace));
