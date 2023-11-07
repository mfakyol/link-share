import logger from '../utils/logger';
import { Request, Response } from 'express';
import { isObjectIdOrHexString } from 'mongoose';
import successResponse from '../responses/successResponse';
import PageLoadedLogModel from '../models/PageLoadedLogModel';
import LinkClickedLogModel from '../models/LinkClickedLogModel';
import badRequestResponse from '../responses/badRequestResponse';
import SocialClickedLogModel from '../models/SocialClickedLogModel';
import intervalServerErrorResponse from '../responses/intervalServerErrorResponse';
import errorMessageResponse from '../responses/errorMessageResponse';
import dataResponse from '../responses/dataResponse';
import PageSettingsModel from '../models/pageSettingModel';

async function addEventLog(req: Request, res: Response) {
  try {
    const { type, page, browserId, payload } = req.body;

    if (!type || !page || !browserId) return badRequestResponse(req, res);

    if (type === 'pageLoaded') {
      PageLoadedLogModel.create({ page, browserId });
    } else if (type === 'linkClicked') {
      if (payload.linkId && isObjectIdOrHexString(payload.linkId))
        LinkClickedLogModel.create({ page, browserId, linkId: payload.linkId });
    } else if (type === 'socialClicked') {
      const socialType = Number.parseInt(payload.socialType);
      if (socialType) SocialClickedLogModel.create({ page, browserId, socialType: socialType });
    } else {
      logger.error(`addEventLog:${JSON.stringify(req.body)}`);
    }

    return successResponse(req, res);
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

async function getPageAnalysis(req: Request, res: Response) {
  const { page } = req.params;
  const { startDate, endDate } = req.query;

  try {
    // const page = (await PageSettingsModel.findById(req.session.userId, 'username'))?.username;

    // if (!page) return errorMessageResponse(req, res, 'page_setting_not_found');
    type MatchStage = { $match: { page: string; createdAt?: { $gte: string; $lte: string } } };
    const matchStage: MatchStage = {
      $match: {
        page: page.toString(),
      },
    };

    if (startDate && endDate) {
      matchStage.$match.createdAt = {
        $gte: startDate.toString(),
        $lte: endDate.toString(),
      };
    }

    const dataList = await PageLoadedLogModel.aggregate([
      matchStage,
      {
        $group: {
          _id: { page: '$page', browserId: '$browserId' },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: '$_id.page',
          uniquePages: { $addToSet: '$_id.browserId' },
          count: { $sum: '$count' },
        },
      },
      {
        $project: {
          _id: 0,
          linkId: '$_id',
          uniqueCount: { $size: '$uniquePages' },
          count: 1,
        },
      },
    ]);
    if (dataList.length !== 1) return errorMessageResponse(req, res, 'analysis_not_found');

    return dataResponse(req, res, dataList[0]);
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

async function getClickedLinkAnalysis(req: Request, res: Response) {
  const { linkId } = req.params;
  const { startDate, endDate } = req.query;

  try {
    // const page = (await PageSettingsModel.findById(req.session.userId, 'username'))?.username;

    // if (!page) return errorMessageResponse(req, res, 'page_setting_not_found');
    type MatchStage = { $match: { linkId: string; createdAt?: { $gte: string; $lte: string } } };
    const matchStage: MatchStage = { $match: { linkId: linkId.toString() } };

    if (startDate && endDate) {
      matchStage.$match.createdAt = {
        $gte: startDate.toString(),
        $lte: endDate.toString(),
      };
    }

    const dataList = await LinkClickedLogModel.aggregate([
      matchStage,
      {
        $group: {
          _id: { linkId: '$linkId', browserId: '$browserId' },
          linkCount: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: '$_id.linkId',
          uniqueLinks: { $addToSet: '$_id.browserId' },
          count: { $sum: '$linkCount' },
        },
      },
      {
        $project: {
          _id: 0,
          linkId: '$_id',
          uniqueCount: { $size: '$uniqueLinks' },
          count: 1,
        },
      },
    ]);

    if (dataList.length !== 1) return errorMessageResponse(req, res, 'analysis_not_found');

    return dataResponse(req, res, dataList[0]);
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

async function getClickedSocialAnalysis(req: Request, res: Response) {
  const { socialType } = req.params;
  const { startDate, endDate } = req.query;

  const socialTypeNumber = Number.parseInt(socialType);
  if (!socialTypeNumber) return badRequestResponse(req, res);

  try {
    const page = (await PageSettingsModel.findById(req.session.userId, 'username'))?.username;
    
    if (!page) return errorMessageResponse(req, res, 'page_setting_not_found');

    type MatchStage = { $match: { socialType: number; createdAt?: { $gte: string; $lte: string } } };
    const matchStage: MatchStage = { $match: { socialType: socialTypeNumber } };

    if (startDate && endDate) {
      matchStage.$match.createdAt = {
        $gte: startDate.toString(),
        $lte: endDate.toString(),
      };
    }

    const dataList = await SocialClickedLogModel.aggregate([
      matchStage,
      {
        $group: {
          _id: { socialType: '$socialType', browserId: '$browserId' },
          socialCount: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: '$_id.socialType',
          uniqueSocials: { $addToSet: '$_id.browserId' },
          count: { $sum: '$socialCount' },
        },
      },
      {
        $project: {
          _id: 0,
          socialType: '$_id',
          uniqueCount: { $size: '$uniqueSocials' },
          count: 1,
        },
      },
    ]);

    if (dataList.length !== 1) return errorMessageResponse(req, res, 'analysis_not_found');

    return dataResponse(req, res, dataList[0]);
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

const analysisController = {
  addEventLog,
  getPageAnalysis,
  getClickedLinkAnalysis,
  getClickedSocialAnalysis,
};

export default analysisController;
