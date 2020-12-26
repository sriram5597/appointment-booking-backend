const ShopModel = require('../models/ShopModel');

exports.addService = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN' && req.user.role !== 'SHOP_OWNER') {
            return res.status(403).send({ message: 'Access Denied' });
        }

        const shopId = req.params.id;
        const { service } = req.body;

        const shop = await ShopModel.findById(shopId);
        shop.services.push(service);

        await shop.save();

        return res.status(200).send({ shop });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'something went wrong' });
    }
};

exports.deleteService = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN' && req.user.role !== 'SHOP_OWNER') {
            return res.status(403).send({ message: 'Access Denied' });
        }

        const shopId = req.params.id;
        const { index } = req.query;

        const shop = await ShopModel.findById(shopId);

        shop.services = shop.services.filter((service, ind) => ind !== index);

        await shop.save();

        return res.status(200).send({ shop });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'something went wrong' });
    }
};

exports.updateService = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN' && req.user.role !== 'SHOP_OWNER') {
            return res.status(403).send({ message: 'Access Denied' });
        }

        const shopId = req.params.id;
        const { index } = req.query;
        const { service } = req.body;

        const shop = await ShopModel.findById(shopId);
        shop.services[index] = service;

        await shop.save();

        return res.status(200).send({ shop });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'something went wrong' });
    }
};
