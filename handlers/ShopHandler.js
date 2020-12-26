const ShopModel = require('../models/ShopModel');

// validators
const { addShopValidator } = require('../validators/ShopValidators');

exports.createShop = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN' && req.user.role !== 'SHOP_OWNER') {
            return res.status(403).send({ message: 'Access Denied' });
        }

        const { error } = addShopValidator.validate(req.body);

        if (error) {
            return res.status(400).send({ message: error.message });
        }

        const shop = new ShopModel();
        Object.keys(req.body).forEach((key) => {
            shop[key] = req.body[key];
        });

        shop.shopOwnerId = req.user.id;

        await shop.save();

        return res.status(200).send({ message: 'shop added successfully' });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'something went wrong' });
    }
};

exports.getShops = async (req, res) => {
    try {
        const shops = await ShopModel.find({}, 'name city openTime closeTime ratings').populate('city');

        return res.status(200).send({ shops });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'something went wrong' });
    }
};

exports.getShop = async (req, res) => {
    try {
        const shop = await ShopModel.findById(req.params.id).populate('city');
        return res.status(200).send({ shop });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'something went wrong' });
    }
};

exports.updateShop = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN' && req.user.role !== 'SHOP_OWNER') {
            return res.send(403).send({ message: 'Access Denied' });
        }

        await ShopModel.findByIdAndUpdate({ _id: req.params.id }, { ...req.body });

        return res.status(200).send({ message: 'Updated' });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'something went wrong' });
    }
};
