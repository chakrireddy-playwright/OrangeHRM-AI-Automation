import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
    BASE_URL: process.env.BASE_URL!,
    USERNAME: process.env.HRM_USERNAME!,
    PASSWORD: process.env.HRM_PASSWORD!
};