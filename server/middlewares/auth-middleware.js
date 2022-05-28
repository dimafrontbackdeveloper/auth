const TokenService = require('./../service/token-service');

function authMiddleware(req, res, next) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new Error('req.headers.authorization нету');
    }

    const token = authorization.split(' ')[1];
    if (!token) {
      throw new Error('access токена нету');
    }

    const userData = TokenService.validateAccessToken(token);
    if (!userData) {
      throw new Error('access токен не прошел валидацию');
    }

    next();
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = authMiddleware;
