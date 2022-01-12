var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'letflixcontact@gmail.com',
    pass: 'letflix123'
  }
});

let mail1 = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <title></title>
  <style>
    table, td, div, h1, p {font-family: Arial, sans-serif;}
  </style>
</head>
<body style="margin:0;padding:0;">
  <table role="presentation" style="width:100%;">
    <tr>
      <td align="center">
        <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #696860;border-spacing:0;text-align:left;">
          <tr>
            <td>
              <table role="presentation">
                    <td valign="middle" align="center" style="background-color:#696860;font-family:Avenir,sans-serif;font-size:18px;color:#272121;text-decoration:none;font-weight:normal;line-height:20px;padding:20px 10px">
                            <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">Password Change Request</h1>

                            <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">We've received a password change request for your Letflix account.

                                This link will expire in 24 hours. If you did not request a password change, please ignore this email, no changes will be made to your account. Another user may have entered your username by mistake, but we encourage you to view our tips for <u>Protecting Your Account</u> if you have any concerns.</p>
                            <div>
                          <strong style="font-size:30px;line-height:36px">`;
                          
let mail2 = `</strong><br><br>
To change your <span class="il">password</span>, click the link below: <br>
<strong><a href="`;

let mail3 = `</a> </strong><br><br>
</div>
</td>
</table>
</td>
</tr>
<tr>
<td style="padding:30px;background:#ee4c50;">
<table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
<tr>
<td style="padding:0;width:50%;" align="left">
<p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">
Letflix Inc.<br/>
</p>
</td>
<td style="padding:0;width:50%;" align="right">
<table role="presentation" style="border-collapse:collapse;border:0;border-spacing:0;">
<tr>
<td style="padding:0 0 0 10px;width:38px;">
  <a href="http://www.twitter.com/" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/tw_1.png" alt="Twitter" width="38" style="height:auto;display:block;border:0;" /></a>
</td>
<td style="padding:0 0 0 10px;width:38px;">
  <a href="http://www.facebook.com/" style="color:#ffffff;"><img src="https://assets.codepen.io/210284/fb_1.png" alt="Facebook" width="38" style="height:auto;display:block;border:0;" /></a>
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>`

let username = "Xen";
let linkref = "www.google.com.vn";

let linkhtml =  linkref +`">` + linkref;

var mailOptions = {
  from: 'letflixcontact@gmail.com',
  to: 'dinhnhan11223344@gmail.com',
  subject: 'Reset password.',
  html: mail1 + username + mail2 + linkhtml + mail3
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});