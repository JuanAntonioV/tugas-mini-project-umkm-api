const customerModel = require('../models/customerModel');

const customerController = {};

customerController.getAll = async (req, res) => {
    try {
        const customer = await customerModel.getAll();

        return res.json({
            message: 'success get all customer',
            data: customer,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

customerController.create = async (req, res) => {
    try {
        const { name, address, email } = req.body;

        if (!name || !address || !email) {
            return res.status(400).json({
                message: 'name, address and email is required',
            });
        }

        const customer = await customerModel.create({ name, address, email });

        return res.json({
            message: 'success create customer',
            data: customer,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

customerController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, email } = req.body;

        if (!name || !address || !email) {
            return res.status(400).json({
                message: 'name, address and email is required',
            });
        }

        const customer = await customerModel.update(id, {
            name,
            address,
            email,
        });

        return res.json({
            message: 'success update customer',
            data: customer,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

customerController.delete = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: 'id is required',
            });
        }

        const menu = await customerModel.getOneById(id);

        if (!menu) {
            return res.status(404).json({
                message: 'menu not found',
                data: null,
            });
        }

        await customerModel.delete(id);

        return res.status(200).json({
            message: 'success delete menu',
        });
    } catch (err) {}
};

module.exports = customerController;
