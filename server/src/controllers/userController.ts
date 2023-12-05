import { Request, Response } from 'express';
import UserModel from '../models/userModel';
import badRequestResponse from '../responses/badRequestResponse';
import PageSettingsModel from '../models/pageSettingModel';
import intervalServerErrorResponse from '../responses/intervalServerErrorResponse';
import { isValidEmail, isValidUsername } from '../utils/validators';
import { compareHashAndPassword, createHash } from '../utils/hash-password';
import dataResponse from '../responses/dataResponse';

async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  if (!username || !password) return badRequestResponse(req, res);

  try {
    const user = await UserModel.findOne({ username });
    if (!user) return res.send({ status: false, message: 'user_not_found' });
    const isValidPassword = compareHashAndPassword(user.hash, password);

    if (isValidPassword) {
      req.session.authenticated = true;
      req.session.userId = user._id.toString();
      return res.send({ status: true });
    }
    return res.send({ status: false, message: 'email_or_password_wrong' });
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

async function register(req: Request, res: Response) {
  const { email, password, username } = req.body;
  if (!email || !password || !username) return badRequestResponse(req, res);

  if (!isValidEmail(email)) return res.send({ status: false, message: 'email_not_valid' });
  if (!isValidUsername(username)) return res.send({ status: false, message: 'username_not_valid' });

  try {
    const { salt, hash } = createHash(password);
    const user = await UserModel.create({
      email,
      username,
      salt,
      hash,
    });

    await PageSettingsModel.create([
      {
        userId: user._id,
        username,
      },
    ]);

    req.session.authenticated = true;
    req.session.userId = user._id.toString();
    return res.send({ status: true });
  } catch (err) {
    if (err.code === 11000) {
      if (err.keyPattern.email == 1) {
        return res.send({ status: false, message: 'email_already_registered' });
      }
      if (err.keyPattern.username == 1) {
        return res.send({ status: false, message: 'username_already_registered' });
      }
    }

    return intervalServerErrorResponse(req, res, err);
  }
}

async function logout(req: Request, res: Response) {
  req.session.destroy(async function (err) {
    if (err) return intervalServerErrorResponse(req, res, err);
    else {
      try {
        return res.clearCookie('connect.sid').send({ status: true });
      } catch (err) {
        return intervalServerErrorResponse(req, res, err);
      }
    }
  });
}

async function isUsernameExist(req: Request, res: Response) {
  const { username } = req.query;

  if (!username) return res.send({ status: false, message: 'bad_request' });

  try {
    const user = await UserModel.findOne({ username });

    if (user) return res.send({ status: true, isExist: true });
    return res.send({ status: true, isExist: false });
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

async function isEmailExist(req: Request, res: Response) {
  const { email } = req.query;

  if (!email) return res.send({ status: false, message: 'bad_request' });

  try {
    const user = await UserModel.findOne({ email });

    if (user) return res.send({ status: true, isExist: true });
    return res.send({ status: true, isExist: false });
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

async function changePassword(req: Request, res: Response) {
  const userId = req.session.userId;
  const { newPassword, oldPassword } = req.body;

  if (!newPassword || !oldPassword) return badRequestResponse(req, res);
  try {
    const user = await UserModel.findById(userId);
    if (!user) return res.send({ status: false, message: 'user_not_found' });

    const isOldPasswordValid = compareHashAndPassword(user.hash, oldPassword);
    if (!isOldPasswordValid) return res.send({ status: false, message: 'old_password_invalid' });

    const { salt, hash } = createHash(newPassword);
    user.hash = hash;
    user.salt = salt;

    await user.save();
    return res.send({ status: true });
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}
async function getAccountData(req: Request, res: Response) {
  try {
    const user = await UserModel.findById(req.session.userId, '-_id username email');
    if (!user) return res.send({ status: false, message: 'user_not_found' });
    return dataResponse(req, res, user);
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

const userController = {
  login,
  register,
  logout,
  isUsernameExist,
  isEmailExist,
  changePassword,
  getAccountData,
};

export default userController;
