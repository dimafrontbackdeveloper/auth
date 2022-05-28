const UserModel = require('../models/user-model');
const LinkModel = require('../models/link-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token-model');
const UserService = require('../service/user-service');
const userService = require('../service/user-service');
const tokenService = require('../service/token-service');

class UserController {
  async registration(req, res) {
    try {
      const { email, password } = req.body;

      const userData = await UserService.registration(email, password);

      res.cookie('token', userData.refreshToken); // передаем в куках рефреш токен юзеру
      res.json(userData);
    } catch (e) {
      throw new Error(e);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.login(email, password);

      res.cookie('token', userData.refreshToken);
      res.json(userData);
    } catch (e) {
      throw new Error(e);
    }
  }

  async logout(req, res) {
    try {
      const { token } = req.cookies;
      const deletedToken = await UserService.logout(token);
      res.clearCookie('token');

      res.json({ deletedToken });
    } catch (e) {
      throw new Error(e);
    }
  }

  async activate(req, res) {
    try {
      const { link } = req.params;

      const user = userService.activate(link);

      res.json({ user });
    } catch (e) {
      throw new Error(e);
    }
  }

  async refresh(req, res) {
    try {
      const { token } = req.cookies;
      if (!token) {
        throw new Error('нету токена в куках');
      }

      const { email, password, tokens, isActivatedAccount } = await UserService.refresh(token);
      res.cookie('token', tokens.refreshToken);
      res.json({
        user: { email, password, isActivatedAccount },
        ...tokens,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  async users(req, res) {
    try {
      const users = await UserModel.find();
      res.json(users);
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = new UserController();
