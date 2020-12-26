/* eslint-disable no-underscore-dangle */
const NodeMailer = require('nodemailer');

const mailConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'porter.haley@ethereal.email',
        pass: 'xEP9huTF94cFMCQCjY',
    },
    secure: false,
};

const userName = 'Porter Haley';

const transporter = NodeMailer.createTransport(mailConfig);

exports.registrationConfirmation = (user, activateToken) => new Promise((resolve, reject) => {
    transporter.sendMail({
        from: `"${userName}" <${mailConfig.auth.user}>`,
        to: `"${user.firstName}" <${user.email}>`,
        subject: 'Registration Successfull',
        html: `<h1>Welcome</h1><p>Hello ${user.firstName}, Your registration is successfull. You are one
            step away from booking appointments. Click this  given
             <a href="http://localhost:8080/auth/activate-user/?userId=${user._id}&accessId=${activateToken.token}">
              verificaion link</a> to activate your account</p>
              <p>The link expires in ${new Date(activateToken.createdAt + 43200 * 1000)}
            <p>regards, <br/>Admin</p>
            `,
    },
    (err, info) => {
        if (err) {
            reject(err);
        }
        console.log(NodeMailer.getTestMessageUrl(info));
        resolve(info);
    });
});

exports.verificationMail = (user) => new Promise((resolve, reject) => {
    transporter.sendMail({
        from: `"${userName}" <${mailConfig.auth.user}>`,
        to: `"${user.firstName}" <${user.email}>`,
        subject: 'Registration Successfull',
        html: `<h1>Welcome</h1><p>Hello ${user.firstName}, your account is activated. Enjoy booking appointments with
            your favourite beatuy saloon!! Have a nice day!!</p>
            <p>regards, <br/>Admin</p>
            `,
    },
    (err, info) => {
        if (err) {
            reject(err);
        }
        console.log(NodeMailer.getTestMessageUrl(info));
        resolve(info);
    });
});
