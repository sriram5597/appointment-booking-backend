/* eslint-disable consistent-return */
const OfferModel = require('../models/OfferModel');
const ShopModel = require('../models/ShopModel');

const { addOfferValidator } = require('../validators/OfferValidators');

const populateServices = (offers, shop) => {
    const result = offers.map((offer) => {
        const temp = {
            ...offer,
        };
        temp.services = offer.services.map((service) => shop.services.id(service));

        return offer;
    });

    return result;
};

exports.addOffer = async (req, res) => {
    try {
        if (req.user.role !== 'SHOP_OWNER') {
            return res.status(403).send({ message: 'Access Denied' });
        }

        const shopId = req.params.id;

        const { error } = addOfferValidator.validate(req.body);

        if (error) {
            return res.status(400).send({ message: error.message });
        }

        const offer = new OfferModel();
        offer.offer = req.body.offer;
        offer.services = req.body.services;
        offer.expireDate = new Date(req.body.date);
        offer.promoCode = req.body.promoCode;
        offer.shopId = shopId;

        await offer.save();

        return res.status(201).send({ message: 'Offer added' });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'something went wrong' });
    }
};

exports.getOffers = async (req, res) => {
    try {
        const offers = await OfferModel.find();
        const shop = await ShopModel.findById(req.params.id);

        const result = populateServices(offers, shop);

        return res.status(200).send({ offers: result });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: 'something went wrong ' });
    }
};

exports.updateOffer = async (req, res) => {
    try {
        if (req.user.role !== 'SHOP_OWNER') {
            return res.status(403).send({ message: 'Access Denied' });
        }

        const offer = await OfferModel.findById(req.params.id);
        const shop = await ShopModel.findById(offer.shopId);

        Object.keys(req.body).forEach((key) => {
            offer[key] = req.body[key];
        });

        await offer.save();

        const result = populateServices([offer], shop);

        return res.status(200).send({ offer: result[0] });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ message: 'something went wrong ' });
    }
};

exports.deleteOffer = async (req, res) => {
    try {
        if (req.user.role !== 'SHOP_OWNER') {
            return res.status(403).send({ message: 'Access Denied' });
        }

        await OfferModel.findByIdAndDelete(req.params.id);

        return res.status(200).send({ message: 'Offer deleted' });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'something went wrong ' });
    }
};

exports.offers = async (req, res) => {
    try {
        const offers = await OfferModel.find({}).select('offer shopId expireDate').populate('shopId');

        return res.status(200).send({ offers });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ message: 'something went wrong' });
    }
};
