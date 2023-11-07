import { Express } from 'express';
import UserRouter from './userRouter';
import FontRouter from './fontRouter';
import AnalysisRouter from './analysisRouter';
import PageSettingRouter from './pageSettingRouter';

export default function AppRouters(app: Express) {
  const userRouter = UserRouter();
  const fontRouter = FontRouter();
  const analysisRouter = AnalysisRouter();
  const pageSettingRouter = PageSettingRouter();

  app.use(`/api${userRouter.routerPrefix}`, userRouter.route());
  app.use(`/api${fontRouter.routerPrefix}`, fontRouter.route());
  app.use(`/api${analysisRouter.routerPrefix}`, analysisRouter.route());
  app.use(`/api${pageSettingRouter.routerPrefix}`, pageSettingRouter.route());
}
