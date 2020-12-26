/* eslint-disable no-console */
const AdminModel = require('../models/AdminModel');
const { hashPassword, verifyHash } = require('../utils/PasswordHash');
const { generateToken } = require('../utils/JwtProvider');

exports.createAdmin = async (req, res) => {
    try {
        const name = 'admin';
        const password = await hashPassword('Admin123');

        const admin = new AdminModel();
        admin.username = name;
        admin.password = password;
        admin.email = 'admin@example.com';

        await admin.save();

        const a = await AdminModel.find();
        console.log(a);

        return res.status(200).send({ message: 'Admin Created' });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'Something went wrong' });
    }
};

exports.adminLogin = async (req, res) => {
    try {
        const admin = await AdminModel.findOne({ username: req.body.username });

        const isValid = await verifyHash(req.body.password, admin.password);

        if (!isValid || !admin) {
            return res.status(403).send({ message: 'Invalid Credentials' });
        }

        const token = generateToken(admin, 'ADMIN');
        return res.status(200).send({ accessToken: token });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'Something went wrong' });
    }
};
