import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

export const generateSecret = () => {
    const randomElement = arr => {
        return arr[Math.floor(Math.random() * arr.length)];
    };
    return `${randomElement(adjectives)} ${randomElement(nouns)}`;
};

const sendMail = email => {
    const options = {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD
        }
    };
    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email);
};

export const sendSecretMail = (adress, secret) => {
    const email = {
        from: "dnfvnsxn@prismagram.com",
        to: adress,
        subject: "🔒Login Secret for Prismagram🔒",
        html: `Hello! Your login secret it ${secret}.<br/>Copy paste on the app/website to log in`
    };
    return sendMail(email);
};
