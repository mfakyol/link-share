import express from 'express';
import isAuth from '../middlewares/isAuthMiddleware';
import pageSettingsController from '../controllers/pageSettingsController';
import jsonParser from '../middlewares/jsonParserMiddleware';
import uploadFileMiddleware from '../middlewares/uploadFileMiddleware';

const uploadProfileImage = uploadFileMiddleware('profileImage', false, undefined, {
  limits: { fileSize: 512000 },
  fileFilter: (_req, file, callback) => {
    const mimetype = file.mimetype;
    const [type, extention] = mimetype.split('/');
    if (type !== 'image' || !['jpg', 'png', 'jpeg'].some((ext) => ext === extention)) {
      return callback(new Error('LIMIT_FILE_TYPE'));
    }
    return callback(null, true);
  },
});

function UserRouter() {
  const route = () => {
    const router = express.Router();
    router.get('/', isAuth, pageSettingsController.getPageSetting);

    router.get('/byUsername/:username', pageSettingsController.getPageSettingByUsername);

    router.post('/profileImage', isAuth, uploadProfileImage, pageSettingsController.uploadProfileImage);

    router.put('/title', isAuth, jsonParser, pageSettingsController.updateTitle);

    router.put('/bio', isAuth, jsonParser, pageSettingsController.updateBio);

    router.delete('/link/:id', isAuth, pageSettingsController.deleteLink);
    router.post('/link', isAuth, jsonParser, pageSettingsController.addLink);
    router.put('/link', isAuth, jsonParser, pageSettingsController.updateLink);
    router.put('/link/sort', isAuth, jsonParser, pageSettingsController.sortLink);

    router.put('/appearance/color', isAuth, jsonParser, pageSettingsController.updateColor);
    router.put('/appearance/buttonStyle', isAuth, jsonParser, pageSettingsController.updateButtonStyle);
    router.put('/appearance/font', isAuth, jsonParser, pageSettingsController.updateFont);
    router.put('/appearance/backgroundType', isAuth, jsonParser, pageSettingsController.updateBackgroundType);

    router.post('/socials', isAuth, jsonParser, pageSettingsController.updateOrCreateSocial);
    router.delete('/socials/:type', isAuth, pageSettingsController.deleteSocial);
    router.put('/socials/sort', isAuth, jsonParser, pageSettingsController.sortSocials);
    router.put('/socials/position', isAuth, jsonParser, pageSettingsController.updateSocialsPosition);
    router.put('/socials/style', isAuth, jsonParser, pageSettingsController.updateSocialsStyle);
    router.put('/socials/color', isAuth, jsonParser, pageSettingsController.updateSocialsIconColor);
    router.put('/sensitiveContent', isAuth, jsonParser, pageSettingsController.updateSensitiveContent);
    router.put('/meta', isAuth, jsonParser, pageSettingsController.updateMeta);

    return router;
  };
  return {
    route,
    routerPrefix: `/pageSetting`,
  };
}
export default UserRouter;
