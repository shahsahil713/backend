/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import config from './config';
import winston from 'winston';
import { MongoDB } from "winston-mongodb";
require("winston-mongodb").MongoDB;

let transports: any = [
    new winston.transports.Console({
        stderrLevels: ['error'],
        handleExceptions: true
    }),
];


const enumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});

if (config.env === 'production') {
    transports.push(
        new winston.transports.MongoDB({
            level: 'error',
            db: config.mongoose.url,
            options: { useUnifiedTopology: true },
            collection: 'logs',
        }))
}

const logger = winston.createLogger({
    level: config.env === 'development' ? 'debug' : 'info',
    format: winston.format.combine(
        enumerateErrorFormat(),
        config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
        winston.format.splat(),
        winston.format.printf(({ level, message }) => `${level}: ${message}`),
    ),
    transports: transports,
});


export default logger;
