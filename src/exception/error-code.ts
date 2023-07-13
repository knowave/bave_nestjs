export const BEACH_EXCEPTION = {
  BEACH_NOT_FOUND: {
    code: 'BEACH_NOT_FOUND',
    message: '존재하는 해수욕장이 없습니다.',
  },
};

export const USER_EXCEPTION = {
  EXIST_USER: {
    code: 'EXIST_USER',
    message: '이미 존재하는 유저입니다.',
  },
  USER_NOT_FOUND: {
    code: 'USER_NOT_FOUND',
    message: '존재하는 유저가 없습니다.',
  },
  EXIST_USERNAME: {
    code: 'EXIST_USERNAME',
    message: '이미 존재하는 닉네임입니다.',
  },

  NOT_MATCH_PASSWORD: {
    code: 'NOT_MATCH_PASSWORD',
    message: '비밀번호가 일치하지 않습니다.',
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

export const FEED_EXCEPTION = {
  FEED_NOT_FOUND: {
    code: 'FEED_NOT_FOUND',
    message: '존재하는 피드가 없습니다.',
  },
};

export const LIKE_EXCEPTION = {
  LIKE_FAIL: {
    code: 'LIKE_FAIL',
    message: '좋아요 기능이 실패하였습니다.',
  },
};
