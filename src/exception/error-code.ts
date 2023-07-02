export const BEACH_EXCEPTION = {
  BEACH_NOT_FOUND: {
    code: 'BEACH_NOT_FOUND',
    message: '존재하는 해수욕장이 없습니다.',
  },
};

export const USER_EXCEPTION = {
  USER_NOT_FOUND: {
    code: 'USER_NOT_FOUND',
    message: '존재하는 유저가 없습니다.',
  },
};

export const AUTH_EXCEPTION = {
  AUTH_CODE_EXPIRED: {
    code: 'AUTH_CODE_EXPIRED',
    message: 'Expired authentication code',
  },
  AUTH_CODE_INVALID: {
    code: 'AUTH_CODE_INVALID',
    message: 'Invalid authentication code',
  },
  AUTH_FAIL_VALIDATE: {
    code: 'AUTH_FAIL_VALIDATE',
    message: '아이디/비밀번호가 일치하지 않습니다',
  },
};