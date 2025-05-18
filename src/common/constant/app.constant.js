import 'dotenv/config'

export const DATABASE_URL = process.env.DATABASE_URL;

export const TOKEN_SECRET = process.env.TOKEN_SECRET;
export const EXPRIRES_IN = process.env.EXPRIRES_IN;

console.log({DATABASE_URL, TOKEN_SECRET, EXPRIRES_IN});


