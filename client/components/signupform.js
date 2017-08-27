import React, { Component } from 'react';
import { Container, Button, Checkbox, Form, Modal, Header } from 'semantic-ui-react';

class SignupForm extends Component {
  render() {
    return (
      <Container>
          <h1>회원 가입</h1>
          <p>30일 무료 체험으로 scoop을 사용해 보세요</p>
        <br />
        <Form>
          <Form.Field>
            <label>Email*</label>
            <input type="email" />
          </Form.Field>
          <Form.Field>
            <label>Password*</label>
            <input type="password" />
          </Form.Field>
          <br />
          <Form.Field>
            <Checkbox label="scoop 서비스 약관에 동의합니다" />
            <Modal trigger={<Button>scoop 서비스 약관 보기</Button>}>
              <Modal.Header>scoop 이용 약관</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Header>scoop Beta 서비스</Header>
                  <p>scoop 베타 서비스는 회원 고유정보를 외부로 유출하지 않는다.</p>
                  <p>scoop 베타 서비스는 회원 고유정보를 외부로 유출하지 않는다.</p>
                  <p>scoop 베타 서비스는 회원 고유정보를 외부로 유출하지 않는다.</p>
                  <p>scoop 베타 서비스는 회원 고유정보를 외부로 유출하지 않는다.</p>
                </Modal.Description>
              </Modal.Content>
            </Modal>
          </Form.Field>
          <br />
          <Button type="submit">가입하기</Button>
        </Form>
      </Container>
    );
  }
}

export default SignupForm;
