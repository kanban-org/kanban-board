import dotenv from 'dotenv';

export const corsConfig = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
