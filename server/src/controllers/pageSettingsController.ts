import { Request, Response } from 'express';
import PageSettingModel from '../models/pageSettingModel';
import errorMessageResponse from '../responses/errorMessageResponse';
import intervalServerErrorResponse from '../responses/intervalServerErrorResponse';
import dataResponse from '../responses/dataResponse';
import badRequestResponse from '../responses/badRequestResponse';
import { isValidHexColor } from '../utils/validators';
import FontModel from '../models/fontModel';
import fs from 'fs';
import { v4 as uuid } from 'uuid';
import UserModel from '../models/userModel';
import SocialTypes from '../enums/SocialTypes';

async function getPageSetting(req: Request, res: Response) {
  try {
    const pageSetting = await PageSettingModel.findOne({ userId: req.session.userId });

    if (!pageSetting) return errorMessageResponse(req, res, 'page_setting_not_found');
    return dataResponse(req, res, pageSetting);
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}
async function getPageSettingByUsername(req: Request, res: Response) {
  const { username } = req.params;
  if (!username) return badRequestResponse(req, res);

  try {
    const user = await UserModel.findOne({ username });
    if (!user) return errorMessageResponse(req, res, 'user_not_found');
    const pageSetting = await PageSettingModel.findOne({ userId: user._id });
    if (!pageSetting) return errorMessageResponse(req, res, 'page_setting_not_found');
    return dataResponse(req, res, pageSetting);
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

async function uploadProfileImage(req: Request, res: Response) {
  const file = req.file;
  if (!file) return badRequestResponse(req, res);
  const filename = `${uuid()}.${file.mimetype.split('/')[1]}`;
  try {
    if (!fs.existsSync('public/profileImage')) fs.mkdirSync('public/profileImage', { recursive: true });
    fs.writeFileSync(`public/profileImage/${filename}`, file.buffer, 'binary');

    const pageSetting = await PageSettingModel.findOne({ userId: req.session.userId });
    if (!pageSetting) return errorMessageResponse(req, res, 'page_setting_not_found');

    pageSetting.profileImage = filename;
    await pageSetting.save();

    return dataResponse(req, res, pageSetting);
  } catch (err) {
    fs.unlinkSync(filename);
    return intervalServerErrorResponse(req, res, err);
  }
}

async function addLink(req: Request, res: Response) {
  try {
    const { title, url } = req.body;
    if (!title || !url || typeof title !== 'string' || typeof url !== 'string') return badRequestResponse(req, res);

    const pageSetting = await PageSettingModel.findOne({ userId: req.session.userId });
    if (!pageSetting) return errorMessageResponse(req, res, 'page_setting_not_found');

    pageSetting.links.push({ title, url });
    await pageSetting.save();

    return dataResponse(req, res, pageSetting);
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

async function updateLink(req: Request, res: Response) {
  try {
    const { id, title, url, isActive } = req.body;
    if (
      !id ||
      !title ||
      !url ||
      typeof id !== 'string' ||
      typeof title !== 'string' ||
      typeof url !== 'string' ||
      typeof isActive !== 'boolean'
    )
      return badRequestResponse(req, res);

    const pageSetting = await PageSettingModel.findOne({ userId: req.session.userId, 'links._id': id });
    if (!pageSetting) return errorMessageResponse(req, res, 'page_setting_not_found');

    const link = pageSetting.links.find((l) => l._id?.equals(id));
    if (!link) return errorMessageResponse(req, res, 'link_not_found');

    link.url = url;
    link.title = title;
    link.isActive = isActive;

    await pageSetting.save();

    return dataResponse(req, res, pageSetting);
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

async function deleteLink(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) return badRequestResponse(req, res);

    const pageSetting = await PageSettingModel.findOne({ userId: req.session.userId });

    if (!pageSetting) return errorMessageResponse(req, res, 'page_setting_not_found');

    pageSetting.links.pull(id);

    await pageSetting.save();

    return dataResponse(req, res, pageSetting);
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

async function sortLink(req: Request, res: Response) {
  try {
    const { activeId, overId } = req.body;
    if (!activeId || !overId) return badRequestResponse(req, res);
    if (activeId === overId) return errorMessageResponse(req, res, 'link_cannot_replace_itself');

    const pageSetting = await PageSettingModel.findOne({ userId: req.session.userId });

    if (!pageSetting) return errorMessageResponse(req, res, 'page_setting_not_found');

    const oldIndex = pageSetting.links.findIndex((l) => l._id?.equals(activeId));
    const newIndex = pageSetting.links.findIndex((l) => l._id?.equals(overId));

    if (oldIndex === -1 || newIndex === -1) return errorMessageResponse(req, res, 'links_not_found');

    const tempLink = pageSetting.links[oldIndex];
    pageSetting.links.splice(oldIndex, 1);
    pageSetting.links.splice(newIndex, 0, tempLink);

    await pageSetting.save();

    return dataResponse(req, res, pageSetting);
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

async function updateTitle(req: Request, res: Response) {
  try {
    let { title } = req.body;
    if (!title) return badRequestResponse(req, res);

    title = new String(title).trim();
    if (title.length > 50) return errorMessageResponse(req, res, 'max_title_length_must_be_50_character');

    const pageSetting = await PageSettingModel.findOne({ userId: req.session.userId });

    if (!pageSetting) return errorMessageResponse(req, res, 'page_setting_not_found');

    pageSetting.title = title;

    await pageSetting.save();

    return dataResponse(req, res, pageSetting);
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

async function updateBio(req: Request, res: Response) {
  try {
    let { bio } = req.body;
    if (!bio) return badRequestResponse(req, res);

    bio = new String(bio).trim();

    if (bio.length > 100) return errorMessageResponse(req, res, 'max_bio_length_must_be_100_character');

    const pageSetting = await PageSettingModel.findOne({ userId: req.session.userId });

    if (!pageSetting) return errorMessageResponse(req, res, 'page_setting_not_found');

    pageSetting.bio = bio;

    await pageSetting.save();

    return dataResponse(req, res, pageSetting);
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}
async function updateColor(req: Request, res: Response) {
  try {
    const { backgroundColor, fontColor, buttonColor, buttonFontColor, buttonShadowColor, gradientDirection } = req.body;
    if (!(backgroundColor || fontColor || buttonColor || buttonFontColor || buttonShadowColor || gradientDirection))
      return badRequestResponse(req, res);

    const pageSetting = await PageSettingModel.findOne({ userId: req.session.userId });

    if (!pageSetting) return errorMessageResponse(req, res, 'page_setting_not_found');

    if (backgroundColor && isValidHexColor(backgroundColor)) pageSetting.colors.backgroundColor = backgroundColor;
    if (fontColor && isValidHexColor(fontColor)) pageSetting.colors.fontColor = fontColor;
    if (buttonColor && isValidHexColor(buttonColor)) pageSetting.colors.buttonColor = buttonColor;
    if (buttonFontColor && isValidHexColor(buttonFontColor)) pageSetting.colors.buttonFontColor = buttonFontColor;
    if (buttonShadowColor && isValidHexColor(buttonShadowColor))
      pageSetting.colors.buttonShadowColor = buttonShadowColor;
    if (gradientDirection) pageSetting.colors.gradientDirection = gradientDirection;

    await pageSetting.save();

    return dataResponse(req, res, pageSetting);
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

async function updateButtonStyle(req: Request, res: Response) {
  try {
    const { buttonStyle } = req.body;
    if (!buttonStyle) return badRequestResponse(req, res);

    const pageSetting = await PageSettingModel.findOne({ userId: req.session.userId });

    if (!pageSetting) return errorMessageResponse(req, res, 'page_setting_not_found');

    pageSetting.buttonStyle = buttonStyle;

    await pageSetting.save();

    return dataResponse(req, res, pageSetting);
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

async function updateFont(req: Request, res: Response) {
  try {
    const { id } = req.body;
    if (!id) return badRequestResponse(req, res);

    const font = await FontModel.findById(id);
    if (!font) return errorMessageResponse(req, res, 'font_not_found');

    const pageSetting = await PageSettingModel.findOne({ userId: req.session.userId });

    if (!pageSetting) return errorMessageResponse(req, res, 'page_setting_not_found');

    pageSetting.font = id;

    await (await pageSetting.save()).populate('font');

    return dataResponse(req, res, pageSetting);
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

async function updateBackgroundType(req: Request, res: Response) {
  try {
    const { backgroundType } = req.body;
    if (!backgroundType) return badRequestResponse(req, res);

    const pageSetting = await PageSettingModel.findOne({ userId: req.session.userId });

    if (!pageSetting) return errorMessageResponse(req, res, 'page_setting_not_found');

    pageSetting.backgroundType = backgroundType;

    await pageSetting.save();

    return dataResponse(req, res, pageSetting);
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

async function updateOrCreateSocial(req: Request, res: Response) {
  try {
    const { type, url, isActive } = req.body;
    if (!type || !url) return badRequestResponse(req, res);

    const pageSetting = await PageSettingModel.findOne({ userId: req.session.userId });

    if (!pageSetting) return errorMessageResponse(req, res, 'page_setting_not_found');

    const social = pageSetting.socials.find((sl) => sl.type == type);

    if (social) {
      social.url = url;
      social.isActive = !!isActive;
    } else pageSetting.socials.push({ type, url, isActive: !!isActive });

    await pageSetting.save();

    return dataResponse(req, res, pageSetting);
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

async function deleteSocial(req: Request, res: Response) {
  try {
    const type = Number.parseInt(req.params.type);

    if (!type || !Object.values(SocialTypes).some((st) => st == type)) return badRequestResponse(req, res);

    const pageSetting = await PageSettingModel.findOne({ userId: req.session.userId });

    if (!pageSetting) return errorMessageResponse(req, res, 'page_setting_not_found');

    const social = pageSetting.socials.find((sl) => sl.type == type);

    if (social) pageSetting.socials.pull(social);

    await pageSetting.save();

    return dataResponse(req, res, pageSetting);
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

async function sortSocials(req: Request, res: Response) {
  try {
    const { activeId, overId } = req.body;
    if (!activeId || !overId) return badRequestResponse(req, res);
    if (activeId === overId) return errorMessageResponse(req, res, 'social_link_cannot_replace_itself');

    const pageSetting = await PageSettingModel.findOne({ userId: req.session.userId });

    if (!pageSetting) return errorMessageResponse(req, res, 'page_setting_not_found');

    const oldIndex = pageSetting.socials.findIndex((sl) => sl.type === activeId);
    const newIndex = pageSetting.socials.findIndex((sl) => sl.type === overId);

    if (oldIndex === -1 || newIndex === -1) return errorMessageResponse(req, res, 'social_links_not_found');

    const tempLink = pageSetting.socials[oldIndex];
    pageSetting.socials.splice(oldIndex, 1);
    pageSetting.socials.splice(newIndex, 0, tempLink);

    await pageSetting.save();

    return dataResponse(req, res, pageSetting);
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

async function updateSocialsPosition(req: Request, res: Response) {
  try {
    const { position } = req.body;
    if (!position) return badRequestResponse(req, res);

    const pageSetting = await PageSettingModel.findOne({ userId: req.session.userId });

    if (!pageSetting) return errorMessageResponse(req, res, 'page_setting_not_found');

    pageSetting.socialsPositon = position;

    await pageSetting.save();

    return dataResponse(req, res, pageSetting);
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

async function updateSocialsStyle(req: Request, res: Response) {
  try {
    const { style } = req.body;
    if (!style) return badRequestResponse(req, res);

    const pageSetting = await PageSettingModel.findOne({ userId: req.session.userId });

    if (!pageSetting) return errorMessageResponse(req, res, 'page_setting_not_found');

    pageSetting.socialsIconStyle = style;

    await pageSetting.save();

    return dataResponse(req, res, pageSetting);
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

async function updateSocialsIconColor(req: Request, res: Response) {
  try {
    const { color } = req.body;
    if (!color) return badRequestResponse(req, res);

    const pageSetting = await PageSettingModel.findOne({ userId: req.session.userId });

    if (!pageSetting) return errorMessageResponse(req, res, 'page_setting_not_found');

    pageSetting.socialsIconColor = color;

    await pageSetting.save();

    return dataResponse(req, res, pageSetting);
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

async function updateSensitiveContent(req: Request, res: Response) {
  try {
    const { sensitiveContent } = req.body;

    const pageSetting = await PageSettingModel.findOne({ userId: req.session.userId });

    if (!pageSetting) return errorMessageResponse(req, res, 'page_setting_not_found');

    pageSetting.sensitiveContent = sensitiveContent;

    await pageSetting.save();

    return dataResponse(req, res, pageSetting);
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

async function updateMeta(req: Request, res: Response) {
  try {
    const { title, description } = req.body;
    console.log(req.body);

    if (!(typeof title === 'string' || typeof description === 'string')) return badRequestResponse(req, res);

    const pageSetting = await PageSettingModel.findOne({ userId: req.session.userId });

    if (!pageSetting) return errorMessageResponse(req, res, 'page_setting_not_found');

    if (typeof title === 'string') pageSetting.meta.title = title;
    if (typeof description === 'string') pageSetting.meta.description = description;

    await pageSetting.save();

    return dataResponse(req, res, pageSetting);
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

const pageSettingsController = {
  getPageSetting,
  getPageSettingByUsername,
  uploadProfileImage,
  addLink,
  updateLink,
  deleteLink,
  sortLink,
  updateTitle,
  updateBio,
  updateColor,
  updateButtonStyle,
  updateFont,
  updateBackgroundType,
  updateOrCreateSocial,
  deleteSocial,
  sortSocials,
  updateSocialsPosition,
  updateSocialsStyle,
  updateSocialsIconColor,
  updateSensitiveContent,
  updateMeta,
};

export default pageSettingsController;
