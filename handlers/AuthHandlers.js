/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const uuid = require('uuid');

const { getUrl, getCredentials } = require('../oauth/googleConfig');
const { generateToken } = require('../utils/JwtProvider');
const { hashPassword, verifyHash } = require('../utils/PasswordHash');
const { registrationConfirmation, verificationMail } = require('./MailHandler');

// models
const UserModel = require('../models/UserModel');
const TokenModel = require('../models/TokenModel');

// validators
const { LoginValidator } = require('../validators/AuthValidators');

const saveUser = async (cred) => {
    try {
        let user = await UserModel.find({ email: cred.details.email });

        if (user.length === 0) {
            user = UserModel();
            user.firstName = cred.details.given_name;
            user.lastName = cred.details.family_name;
            user.email = cred.details.email;
            user.verified = cred.details.verified_email;
            user.role = 'USER';
            user.passwordReset = true;

            await user.save();
        }
    } catch (err) {
        console.log(err);
    }
};

exports.authGreet = (req, res) => {
    const msg = {
        message: 'Hello World',
    };

    return res.status(200).json(msg);
};

exports.signUpWithGoogle = (req, res) => {
    const url = getUrl();
    res.redirect(url);
};

exports.signInWithGoogle = (req, res) => {
    const url = getUrl();
    res.redirect(url);
};

exports.googleHandler = async (req, res) => {
    const { code } = req.query;
    try {
        if (code) {
            const cred = await getCredentials(code);

            saveUser(cred);

            const token = generateToken(cred.details, 'USER');

            return res.status(200).send({ access_token: token });
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'something went wrong' });
    }
};

exports.signUp = async (req, res) => {
    try {
        const userData = req.body;
        const user = new UserModel();

        Object.keys(userData).forEach((key) => {
            user[key] = userData[key];
        });

        user.password = await hashPassword(user.password);
        await user.save();

        const activateToken = new TokenModel();
        activateToken.userId = user._id;
        activateToken.token = uuid.v4();

        await activateToken.save();

        const token = generateToken(user, req.body.role);

        await registrationConfirmation(user, activateToken);

        return res.status(201).send({ access_token: token });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'something went wrong' });
    }
};

exports.login = async (req, res) => {
    try {
        const { error } = LoginValidator.validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.message });
        }

        const user = await UserModel.findOne({ email: req.body.email });

        console.log(user);
        if (!user) {
            return res.status(400).send({ message: `${req.body.email} is not registered` });
        }

        const isVerified = await verifyHash(req.body.password, user.password);
        if (!isVerified) {
            return res.status(403).send({ message: 'Invalid Password' });
        }

        const userDetails = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            verified: user.verified,
            passwordReset: user.passwordReset,
            email: user.email,
            role: user.role,
        };

        const token = generateToken(userDetails);

        return res.status(200).send({ token, user: userDetails });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'something went wrong' });
    }
};

exports.activateUser = async (req, res) => {
    try {
        const { userId, accessId } = req.query;
        const user = await UserModel.findOne({ _id: userId });

        const token = await TokenModel.findOne({ userId });

        if (token.token === accessId && token.createdAt + token.expiresIn * 1000 > Date.now()) {
            user.verified = true;
            await user.save();
            await TokenModel.deleteOne({ _id: token._id });

            await verificationMail(user);

            return res.status(200).send({ message: 'Verification Successfull' });
        }

        await TokenModel.deleteOne({ _id: token._id });

        return res.status(400).send({ message: 'Verification Failed' });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'Something went wrong' });
    }
};
