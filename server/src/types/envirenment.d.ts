declare namespace NodeJS {
  export interface ProcessEnv {
    PROTOCOL: "http" | "https"
    PORT: string;
    NODE_ENV: 'development' | 'production';
    SESSION_SECRET: string
  }
}
