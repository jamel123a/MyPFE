const nodemailer =require('nodemailer');
const {google} =require('googleapis')
const {OAuth2} =google.auth;
const OAUTH_PALYGROUND ='https://developers.google.com/oauthplayground'
 const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECTRT,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS 
 }=process.env
 const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECTRT,
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PALYGROUND
 )
//send email
const sendEmail =(to,url,txt)=>{
    oauth2Client.setCredentials({
        refresh_token :MAILING_SERVICE_REFRESH_TOKEN
    })
    const accessToken =oauth2Client.getAccessToken();
    const smtpTransport=nodemailer.createTransport({
        service :'gmail',
        auth :{
            type :'OAuth2',
            user :SENDER_EMAIL_ADDRESS,
            clientId:MAILING_SERVICE_CLIENT_ID,
            clientSecret:MAILING_SERVICE_CLIENT_SECTRT,
            refreshToken :MAILING_SERVICE_REFRESH_TOKEN,
            accessToken:accessToken
        }

    })
    const mailOption ={
        from :SENDER_EMAIL_ADDRESS,
        to :to ,
        subject :"stageni",
        html:`
        <div style="max-width: 700px; margin:auto; border: 10px solid #d475; padding :50px 20px; font-size :110%">
        <h2 style="text-align;center; text-transform:uppercase; color:teal"> welcome to stageny </h2>

        <p> Congratulation ! you're almost set to start 
        just click the  button bellew to  ${txt}</p>
        <a href=${url} style="background:crimson; text-decoration:none; color:white;padding:10px 20px; margin:10px 0; display :inline-block;">${txt}</a>
        <p>If the buuton doesn't work for any  reasen , you can also click on the link bellow </p>
        <div> ${url}</div>
        </div>
        `
    }
    smtpTransport.sendMail(mailOption,(err,infer)=>{
        if (err)return err;
        return infer
    })



} 
module.exports =sendEmail