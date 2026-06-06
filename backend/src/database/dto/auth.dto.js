// DTO stubs: để team biết contract request/response

const AuthLoginDto = {
  // email/password
  email: 'string',
  password: 'string',
};

const AuthRegisterDto = {
  // email/password/fullName
  email: 'string',
  password: 'string',
  fullName: 'string',
};

module.exports = { AuthLoginDto, AuthRegisterDto };

