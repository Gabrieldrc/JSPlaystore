const express = require('express');
const usersController = express.Router();
const userService = require('../services/userService');
const jwtService = require('../services/jwtService');
const ac = require('../config/ac.config');

usersController.post('/signup', async (req, res) => {
  const permission = ac.can(req.session.user.role).createAny('user');
  const {user_name, user_password} = req.body;
  const resObject = {
    status: 'Access Denied',
    message: '',
  };
  if (!permission.granted) {
    resObject.message = 'You are not authorized to access this resource';

    return res.status(403).json(resObject);

  }
  if (!user_name || !user_password) {
    resObject.message = `Send 'user_name' and 'password'`;

    return res.status(400).json(resObject);

  }
  const userData = {
    user_name: user_name,
    password: user_password,
  }
  const result = await userService.createUser(userData);

  if (!result.ok) {
    resObject.message = result.message;

    return res.status(400).send(resObject);

  }
  resObject.status = 'ok';
  resObject.message = `user created: @${user_name}`;
  return res.status(201).send(resObject);

});

usersController.post('/signin', async (req, res) => {
  const {user_name, user_password} = req.body;
  let resObject = {
    status: 'Access Denied',
    message: "",
  };
  if (!user_name || !user_password) {
    resObject.message = `Send 'user_name' and 'password'`;

    return res.status(400).json(resObject);

  }
  let userData = {
    user_name: user_name,
    role: 'user'
  }
  const result = await userService.loginUser({...userData, password: user_password});
  if (!result.ok) {
    resObject.message = result.message;

    return res.status(400).json(resObject);

  }
  const token = jwtService.generateToken(userData);
  req.session.auth = true;
  userData.accessToken = token;

  return res.status(201).json(userData);

});

usersController.get('/logout', (req, res) => {
  let resObject = {
    status: 'Access Denied',
    message: '',
  };
  
  req.session.destroy(error => {
    if (error) {
      return res.status(400).json(error);
    }

    resObject.status = 'OK';
    resObject.message = 'log out succesfully'
    return res.status(200).json(resObject);

  });
});

module.exports = usersController;