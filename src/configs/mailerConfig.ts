import nodemailer from 'nodemailer'
import { ADMIN_APP_KEY, ADMIN_EMAIL } from './severConfig';

export const mailer = nodemailer.createTransport({
    service:"Gmail",
    host:"smpt.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:ADMIN_EMAIL,
        pass:ADMIN_APP_KEY
    }
});

