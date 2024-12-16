import { ADMIN_EMAIL } from "../configs/severConfig";

// interface IEmailData{
//     from?:string
//     to:string
//     subject:string
//     text:string
//     html:string
// }

export const mailObjectValidation = (toEmail:string,otp:number) => {
    return {
        from: 'Nestify <no-reply@nestify.com>',
        to: toEmail,
        subject: 'Nestify - authentication email',
        text: `Your Code is: ${otp}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
                <header style="background-color: #007BFF; color: #fff; padding: 15px; text-align: center;">
                    <h2 style="margin: 0;">Nestify Verification</h2>
                </header>
                <p style="font-size: 18px; text-align: center; margin: 30px;">Your Code is: <strong style="color: #007BFF">${otp}</strong></p>
                <footer style="font-size: 12px; color: #777; text-align: center;">
                    <p>© Nestify, All rights reserved.</p>
                </footer>
            </div>
            `
    }
}