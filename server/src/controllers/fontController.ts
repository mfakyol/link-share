import { Request, Response } from 'express';
import FontModel from '../models/fontModel';
import dataResponse from '../responses/dataResponse';
import listResponse from '../responses/listResponse';
import badRequestResponse from '../responses/badRequestResponse';
import intervalServerErrorResponse from '../responses/intervalServerErrorResponse';

async function addFont(req: Request, res: Response) {
  const {
    fontFamily,
    fontCode,
    titleFontSize,
    titleFontWeight,
    descriptionFontSize,
    descriptionFontWeight,
    buttonFontSize,
    buttonFontWeight,
  } = req.body;

  if (
    !fontFamily ||
    !fontCode ||
    !titleFontSize ||
    !titleFontWeight ||
    !descriptionFontSize ||
    !descriptionFontWeight ||
    !buttonFontSize ||
    !buttonFontWeight
  ) {
    return badRequestResponse(req, res);
  }

  try {
    const font = await FontModel.create({
      fontFamily,
      fontCode,
      titleFontSize,
      titleFontWeight,
      descriptionFontSize,
      descriptionFontWeight,
      buttonFontSize,
      buttonFontWeight,
    });

    return dataResponse(req, res, font);
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

async function getFonts(req: Request, res: Response) {
  try {
    const fonts = await FontModel.find({}, 'fontFamily');
    return listResponse(req, res, fonts);
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

const fontController = {
  addFont,
  getFonts,
};

export default fontController;
