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
const sendEmail =(email,url,txt)=>{
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
        to :email ,
        subject :"stageny",
        html:`
        <div style="max-width: 700px; margin:auto; border: 10px solid #202b3c; padding :50px 20px; font-size :110%">
        <h2 style="text-align;center; text-transform:uppercase; color:teal"> bienvenue à stageny </h2>

        <p> Félicitation ! vous êtes presque prêt à commencer
        cliquez simplement sur le bouton bellew pour  ${txt}</p>
        <a href=${url} style="background:crimson; text-decoration:none; color:white;padding:10px 20px; margin:10px 0; display :inline-block;">${txt}</a>
        <p>Si le bouton ne fonctionne pas pour une raison quelconque, vous pouvez également cliquer sur le lien ci-dessous </p>
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