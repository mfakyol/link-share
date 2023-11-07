import UserStatus from '../enums/UserStatus';
import { Schema, InferSchemaType, model } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      required: true,
      unique: true,
      index: true,
      type: String,
    },
    username: {
      required: true,
      unique: true,
      index: true,
      type: String,
    },
    hash: {
      required: true,
      type: String,
    },
    salt: {
      required: true,
      type: String,
    },
    status: {
      type: Number,
      default: UserStatus.ACTIVATED,
    },
    emailValidated: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false },
);

export type IUser = InferSchemaType<typeof UserSchema>;

const UserModel = model('User', UserSchema);

export default UserModel;
