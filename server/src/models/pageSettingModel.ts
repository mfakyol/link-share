import { Schema, InferSchemaType, model } from 'mongoose';

const LinkSchema = new Schema({
  title: {
    type: String,
    default: '',
  },
  url: {
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const SocialSchema = new Schema(
  {
    type: {
      type: Number,
      require: true,
    },
    url: {
      type: String,
      default: '',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
    _id : false
  },
);
const ColorSchema = new Schema({
  backgroundColor: {
    type: String,
    default: '',
  },
  fontColor: {
    type: String,
    default: '',
  },
  buttonColor: {
    type: String,
    default: '',
  },
  buttonFontColor: {
    type: String,
    default: '',
  },
  buttonShadowColor: {
    type: String,
    default: '',
  },
  gradientDirection: {
    type: String,
    default: 'up',
  },
});
const MetaSchema = new Schema({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
});

const PageSettingSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      index: true,
      unique: true,
    },
    profileImage: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    bio: {
      type: String,
      default: '',
    },
    links: {
      type: [LinkSchema],
      default: [],
    },
    socials: {
      type: [SocialSchema],
      default: [],
    },
    socialsIconStyle: {
      type: String,
      default: 'outline',
    },
    socialsIconColor: {
      type: String,
      default: '',
    },
    socialsPositon: {
      type: String,
      default: 'up',
    },
    backgroundType: {
      type: String,
      default: 'flat',
    },
    colors: {
      type: ColorSchema,
      required: true,
      default: {},
    },
    meta: {
      type: MetaSchema,
      required: true,
      default: {},
    },
    buttonStyle: {
      type: String,
      default: 'fill',
    },
    font: {
      type: Schema.Types.ObjectId,
      ref: 'Font',
      default: null,
      autopopulate: true,
    },
    sensitiveContent: {
      type: String,
      default: '',
    },
  },
  { versionKey:  false },
);

const autoPopulateFont = function (next) {
  this.populate('font');
  next();
};

PageSettingSchema.pre('find', autoPopulateFont);
PageSettingSchema.pre('findOne', autoPopulateFont);

export type IPageSetting = InferSchemaType<typeof PageSettingSchema>;

const PageSettingsModel = model('PageSetting', PageSettingSchema);

export default PageSettingsModel;
