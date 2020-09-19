import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  api: {
    port: process.env.PORT || 3000,
    cors: process.env.CORS || '*',
  },
};
