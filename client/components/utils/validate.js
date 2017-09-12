export const validateSignup = (formProps) => {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'email주소를 입력해 주세요';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = '잘못된 email 주소 형식입니다';
  }

  if (!formProps.company) {
    errors.company = '회사 이름을 입력해 주세요';
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

export const validateSignin = (formProps) => {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'email주소를 입력해 주세요';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
    errors.email = '잘못된 email 주소 형식입니다';
  }

  if (!formProps.password) {
    errors.password = '비밀번호를 입력해 주세요';
  }

  return errors;
}

export const validateNewSpace = (formProps) => {
  const errors = {};

  if (!formProps.name) {
    errors.name = '새로운 지점 이름을 입력해 주세요';
  }
}
