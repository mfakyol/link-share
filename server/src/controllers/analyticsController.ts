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
import PageSettingModel from '../models/pageSettingModel';
import { isDate } from 'util/types';

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

async function getLifeTimeAnalytics(req: Request, res: Response) {
  const pageSetting = await PageSettingModel.findOne({ userId: req.session.userId }, 'username');

  if (!pageSetting) return errorMessageResponse(req, res, 'page_not_found');

  try {
    const matchStage = {
      $match: {
        page: pageSetting.username,
      },
    };

    const viewList = await PageLoadedLogModel.aggregate([
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
          uniqueCount: { $size: '$uniquePages' },
          count: 1,
        },
      },
    ]);

    const linkClickList = await LinkClickedLogModel.aggregate([
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
          uniqueCount: { $size: '$uniquePages' },
          count: 1,
        },
      },
    ]);

    const socialClickList = await SocialClickedLogModel.aggregate([
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
          uniqueCount: { $size: '$uniquePages' },
          count: 1,
        },
      },
    ]);

    const view = {
      total: viewList?.[0]?.count || 0,
      unique: viewList?.[0]?.uniqueCount || 0,
    };
    const linkClick = {
      total: linkClickList?.[0]?.count || 0,
      unique: linkClickList?.[0]?.uniqueCount || 0,
    };

    const socialClick = {
      total: socialClickList?.[0]?.count || 0,
      unique: socialClickList?.[0]?.uniqueCount || 0,
    };

    return dataResponse(req, res, {
      view,
      linkClick,
      socialClick,
    });
  } catch (err) {
    return intervalServerErrorResponse(req, res, err);
  }
}

async function getRangeAnalytics(req: Request, res: Response) {
  const { startDate, endDate } = req.query;

  const formattedStartDate = new Date(Number.parseInt(startDate as string));
  const formattedEndDate = new Date(Number.parseInt(endDate as string));

  if (!isDate(formattedStartDate) || !isDate(formattedEndDate))
    return errorMessageResponse(req, res, 'date_filter_not_valid');

  try {
    const pageSetting = await PageSettingModel.findOne({ userId: req.session.userId }, 'username');

    if (!pageSetting) return errorMessageResponse(req, res, 'page_not_found');

    type MatchStage = { $match: { page: string; createdAt?: { $gte: Date; $lte: Date } } };
    const matchStage: MatchStage = {
      $match: {
        page: pageSetting.username,
        createdAt: {
          $gte: new Date(Number.parseInt(startDate as string)),
          $lte: new Date(Number.parseInt(endDate as string)),
        },
      },
    };

    const viewList = await PageLoadedLogModel.aggregate([
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
          uniqueCount: { $size: '$uniquePages' },
          count: 1,
        },
      },
    ]);

    const linkClickList = await LinkClickedLogModel.aggregate([
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
          uniqueCount: { $size: '$uniquePages' },
          count: 1,
        },
      },
    ]);

    const socialClickList = await SocialClickedLogModel.aggregate([
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
          uniqueCount: { $size: '$uniquePages' },
          count: 1,
        },
      },
    ]);

    const view = {
      total: viewList?.[0]?.count || 0,
      unique: viewList?.[0]?.uniqueCount || 0,
    };
    const linkClick = {
      total: linkClickList?.[0]?.count || 0,
      unique: linkClickList?.[0]?.uniqueCount || 0,
    };

    const socialClick = {
      total: socialClickList?.[0]?.count || 0,
      unique: socialClickList?.[0]?.uniqueCount || 0,
    };

    return dataResponse(req, res, {
      view,
      linkClick,
      socialClick,
    });
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
    const pageSetting = await PageSettingModel.findOne({ userId: req.session.userId }, 'username');

    if (!pageSetting) return errorMessageResponse(req, res, 'page_setting_not_found');

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

const analyticsController = {
  addEventLog,
  getLifeTimeAnalytics,
  getRangeAnalytics,
};

export default analyticsController;
