import dotenv from 'dotenv';
dotenv.config();
const env = process.env
//console.log(process.env);
export const config = {PORT : env.PORT || 3000,
    DB_DATABASE: env.DB_DATABASE,
    DB_USER : env.DB_USER,
    DB_PASS: env.DB_PASS,
    DB_HOST: env.DB_HOST,
    EMAIL_SEND: env.EMAIL_SEND,
    PASS_APP_EMAIL: env.PASS_APP_EMAIL }