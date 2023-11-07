import dotenv from 'dotenv';

dotenv.config({ path: './local.env' });

const env = process.env;

const { MONGO_URI = '', PORT = '', BUILD = '', HOST = '', PROTOCOL = '', SESSION_SECRET = '' } = env;
const variables = {
  MONGO_URI,
  PORT,
  BUILD,
  HOST,
  PROTOCOL,
  SESSION_SECRET,
};

type VariableKey = keyof typeof variables;

export class Config {
  static instance: typeof variables;
  static throwVariableNullError(variable: string) {
    throw Error(`please add ${variable} variable in .env file.`);
  }
  static throwVariableMustBeError(variable: string, values: string[]) {
    throw Error(`${variable} variable in .env file must be one of ${values.toString()}`);
  }

  static getInstance() {
    if (!['development', 'production'].some((s) => s == BUILD))
      this.throwVariableMustBeError('BUILD', ['development', 'production']);
    if (!['http', 'https'].some((s) => s == PROTOCOL)) this.throwVariableMustBeError('PROTOCOL', ['http', 'https']);
    Object.keys(variables).forEach((k) => {
      if (!variables[k as VariableKey]) this.throwVariableNullError(k);
    });

    this.instance = {
      PORT,
      BUILD,
      HOST,
      PROTOCOL,
      SESSION_SECRET,
      MONGO_URI,
    };
    return this.instance;
  }
}

const config = Object.freeze(Config.getInstance());

export default config;
