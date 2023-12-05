import express from 'express';
import analyticsController from '../controllers/analyticsController';
import jsonParser from '../middlewares/jsonParserMiddleware';
import isAuth from '../middlewares/isAuthMiddleware';

function analysisRouter() {
  const route = () => {
    const router = express.Router();

    router.post('/event', jsonParser, analyticsController.addEventLog);
    router.get('/range', isAuth, analyticsController.getRangeAnalytics);
    router.get('/lifeTime', isAuth, analyticsController.getLifeTimeAnalytics);
    return router;
  };
  return {
    route,
    routerPrefix: `/analytics`,
  };
}
export default analysisRouter;
