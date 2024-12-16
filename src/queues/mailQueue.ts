import Queue from 'bull'
import { redisConfig } from '../configs/redisConfig'
import { mailer } from '../configs/mailerConfig';

interface IEmailData{
    from:string | undefined
    to:string
    subject:string
    text:string
    html:string
}

const mailQueue = new Queue('mailQueue',{
    redis:redisConfig
})

mailQueue.process(async(job)=>{
    try {
        const data = job.data;
        console.log("email is ready...");
        const response = await mailer.sendMail(data);
        console.log("added to queue", response)
    } catch (error) {
        console.log("error ", error)
    }
});

export const addEmailToQueue  = async (emailData:IEmailData)=>{
    try {
        await mailQueue.add(emailData);
        console.log("mail added to queue")
    } catch (error) {
        console.log('mail not added to queue ',error)
    }
}