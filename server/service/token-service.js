const UserModel = require('../models/user-model');
const LinkModel = require('../models/link-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token-model');

class TokenService {
  async createTokens(email, password) {
    try {
      // создание пары токенов
      const accessToken = jwt.sign({ email, password }, process.env.ACCESS_KEY, {
        expiresIn: '15m',
      });
      const refreshToken = jwt.sign({ email, password }, process.env.REFRESH_KEY, {
        expiresIn: '30d',
      });

      return {
        accessToken,
        refreshToken,
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ userId });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const token = await TokenModel.create({ userId, refreshToken });
    return token;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.ACCESS_KEY);
      return userData;
    } catch (e) {
      throw new Error(e);
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.REFRESH_KEY);
      return userData;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = new TokenService();
