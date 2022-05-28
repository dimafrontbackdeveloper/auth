const UserModel = require('../models/user-model');
const LinkModel = require('../models/link-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token-model');
const TokenService = require('./token-service');
const MailService = require('./mail-service');

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email }); // ищем пользователя
    // если такой пользователь есть в БД, то кидаем ошибку
    if (candidate) {
      throw new Error(`такой емеил: ${email} уже есть в БД`);
    }

    const hashPassword = await bcrypt.hash(password, 4); // хешируем пароль
    const user = await UserModel.create({ email, password: hashPassword }); // создаем пользователя

    const link = uuid.v4(); // примерно вот такая строка - asswqwqe-qwrt3qqqw4-qwrwrq21-qwwq4w4-wq44121
    await LinkModel.create({ userId: user._id, link });

    await MailService.sendMail(email, link); // отправка письма

    const tokens = await TokenService.createTokens(email, password); // создание токенов

    await TokenService.saveToken(user._id, tokens.refreshToken); // сохраняем refreshToken

    return {
      user: {
        email,
        password,
        isActivatedAccount: user.isActivatedAccount,
      },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  async login(email, password) {
    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        throw new Error(`пользователя с емеилом: ${email} не нашло в БД`);
      }

      // проверяем совпадение паролей
      const isPassEquals = await bcrypt.compare(password, user.password);
      if (!isPassEquals) {
        throw new Error('Пароль не верный');
      }

      const tokens = await TokenService.createTokens(email, password); // создание пары токенов
      await TokenService.saveToken(user._id, tokens.refreshToken); // сохранение refresh токена

      return {
        user: {
          email,
          password,
          isActivatedAccount: user.isActivatedAccount,
        },
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async logout(token) {
    try {
      const deletedToken = await TokenModel.deleteOne({ token });

      return deletedToken;
    } catch (e) {
      throw new Error(e);
    }
  }

  async activate(link) {
    try {
      const linkData = await LinkModel.findOne({ link });
      if (!linkData) {
        throw new Error('такой ссылки активации нету');
      }

      const user = await UserModel.findById(linkData.userId);
      if (!user) {
        throw new Error('не нашло пользователя с таким id');
      }
      user.isActivatedAccount = true;
      await user.save();

      return user;
    } catch (e) {
      throw new Error(e);
    }
  }

  async refresh(refreshToken) {
    try {
      const userData = await TokenService.validateRefreshToken(refreshToken);

      const refreshTokenData = await TokenModel.findOne({ refreshToken });
      if (!refreshTokenData || !userData) {
        throw new Error(`токена нету в бд. Токен: ${refreshToken}`);
      }
      const user = await UserModel.findById(refreshTokenData.userId);
      const { email, password, isActivatedAccount } = user;
      const tokens = await TokenService.createTokens(email, password);
      await TokenService.saveToken(user._id, tokens.refreshToken);
      return {
        email,
        password,
        isActivatedAccount,
        tokens,
      };
    } catch (e) {
      throw new Error(`Ошибка при рефреше: ${e}`);
    }
  }
}

module.exports = new UserService();
