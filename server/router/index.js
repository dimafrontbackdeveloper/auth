const express = require('express');
const authMiddleware = require('../middlewares/auth-middleware');
const UserController = require('./../controller/user-controller');

const router = express.Router();

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.post('/refresh', UserController.refresh);
router.get('/users', authMiddleware, UserController.users);

module.exports = router;
