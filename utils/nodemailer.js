//Import------------------------------------------------------------------------------------------------
import nodemailer from 'nodemailer'
import fs from 'fs';
import path from 'path';
//END---------------------------------------------------------------------------------------------------

/**
 * FUNCTION STARTS FROM HERE
 */

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "testing.flexsin@gmail.com",
    pass: "qzkgxkyayqeszfpm",
  },
});
const sendEmail = async (email , subject, name) => {
  

  let HTML = `<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width">

    <title>PGPT</title>

    <style type="text/css">

        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap'); 

        @media only screen and (max-width: 599px) {
            .tableCon {
                width: 100% !important;
            }

            .midText {padding: 15px !important; font-size: 16px !important; line-height: 26px !important;}

            .serviceCon {padding: 0 15px 15px 15px !important;}

            .serviceHd {font-size: 26px !important;}

            .serviceSubHd {font-size: 20px !important;}

        }

    </style>

</head>

 

<body style="margin:10px; background:#fff;">

    <table border="0" cellspacing="0" cellpadding="0" class="tableCon" width="800" align="center"

        style="font-family: 'Roboto', sans-serif; color: #000; border: 1px solid #eeeeee;">

        <tr>

            <td bgcolor="#404B60" align="center"><br></td>

        </tr>

      

        <tr>

            <td class="midText" style="padding: 35px; font-family: 'Roboto', sans-serif; color: #404B60; font-size: 20px; line-height: 30px;">

               

            Dear Mr. ${name}<br><br>

            Your Form Successfully Submitted.<br><br>          
                      
            Best regards,<br>
             Ankit Chauhan       
            </td>

        </tr>       

        <tr>

            <td bgcolor="#BA424D" style="padding: 20px 0;">

                <table width="100%" border="0" cellspacing="0" cellpadding="0">

                    <tr>

                        <td align="center" style="padding-bottom: 10px;"><a href="#" style="font-family: 'Roboto', sans-serif; color: #fff; font-size: 16px; text-decoration: none;">Privacy Policy</a></td>

                    </tr>

                    <tr>

                        <td align="center" style="font-family: 'Roboto', sa" ns-serif; color: #fff; font-size: 16px;">Copyright &copy; 2023 MBTS</td>

                    </tr>

                </table>

 

                

            </td>

        </tr>

    </table>

 

</body>

 

</html>`;

  const mailOptions = {
    from: "testing.flexsin@gmail.com",
    to: email,
    subject: subject,
    html: HTML,
  };

  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('errors in sending email', error);
    } else {
      console.log('response of email : ' + info.response);
    }
    return info;
  });
};

export default {
  sendEmail,
};
