import express from 'express';
import fontController from '../controllers/fontController';
import jsonParserMiddleware from '../middlewares/jsonParserMiddleware';

function fontRouter() {
  const route = () => {
    const router = express.Router();
    router.get('/', jsonParserMiddleware, fontController.getFonts);
    router.post('/', jsonParserMiddleware, fontController.addFont);
 
    return router;
  };
  return {
    route,
    routerPrefix: `/font`,
  };
}
export default fontRouter;
