import { Express } from 'express';
import UserRouter from './userRouter';
import FontRouter from './fontRouter';
import AnalyticsRouter from './analyticsRouter';
import PageSettingRouter from './pageSettingRouter';

export default function AppRouters(app: Express) {
  const userRouter = UserRouter();
  const fontRouter = FontRouter();
  const analyticsRouter = AnalyticsRouter();
  const pageSettingRouter = PageSettingRouter();

  app.use(`/api${userRouter.routerPrefix}`, userRouter.route());
  app.use(`/api${fontRouter.routerPrefix}`, fontRouter.route());
  app.use(`/api${analyticsRouter.routerPrefix}`, analyticsRouter.route());
  app.use(`/api${pageSettingRouter.routerPrefix}`, pageSettingRouter.route());
}
