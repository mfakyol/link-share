import express from 'express';
import jsonParserMiddleware from '../middlewares/jsonParserMiddleware';
import userController from '../controllers/userController';

function UserRouter() {
  const route = () => {
    const router = express.Router();
    router.post('/login', jsonParserMiddleware, userController.login);
    router.post('/logout', userController.logout);
    router.post('/register', jsonParserMiddleware, userController.register);
    router.get('/isEmailExist', jsonParserMiddleware, userController.isEmailExist);
    router.get('/isUsernameExist', jsonParserMiddleware, userController.isUsernameExist);

    return router;
  };
  return {
    route,
    routerPrefix: `/user`,
  };
}
export default UserRouter;
