import express from 'express';
import analysisController from '../controllers/analysisController';
import jsonParser from '../middlewares/jsonParserMiddleware';
import isAuth from '../middlewares/isAuthMiddleware';

function analysisRouter() {
  const route = () => {
    const router = express.Router();

    router.post('/event', jsonParser, analysisController.addEventLog);
    router.get('/page/:page', isAuth, analysisController.getPageAnalysis);
    router.get('/links/:linkId', isAuth, analysisController.getClickedLinkAnalysis);
    router.get('/socials/:socialType', isAuth, analysisController.getClickedSocialAnalysis);

    return router;
  };
  return {
    route,
    routerPrefix: `/analysis`,
  };
}
export default analysisRouter;
