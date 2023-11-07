import { Schema, InferSchemaType, model } from 'mongoose';

const FontSchema = new Schema({
  fontFamily: {
    type: String,
    default: '',
  },
   fontCode: {
    type:  String ,
    required: true,
  },
  titleFontSize: {
    type: String,
    default: '',
  },
  titleFontWeight: {
    type: String,
    default: '',
  },
  descriptionFontSize: {
    type: String,
    default: '',
  },
  descriptionFontWeight: {
    type: String,
    default: '',
  },
  buttonFontSize: {
    type: String,
    default: '',
  },
  buttonFontWeight: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},{versionKey:false});

export type IFont = InferSchemaType<typeof FontSchema>;

const FontModel = model('Font', FontSchema);

export default FontModel;
