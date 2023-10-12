const menuModel = require('../models/menuModel');

const menuController = {};

menuController.getAll = async (req, res) => {
    try {
        const menus = await menuModel.getAll();

        return res.json({
            message: 'success get all menus',
            data: menus,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

menuController.create = async (req, res) => {
    try {
        const { item, price } = req.body;

        if (!item || !price) {
            return res.status(400).json({
                message: 'item and price is required',
            });
        }

        const menus = await menuModel.create({ item, price });

        return res.json({
            message: 'success create menu',
            data: menus,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

menuController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { item, price } = req.body;

        if (!item || !price) {
            return res.status(400).json({
                message: 'item and price is required',
            });
        }

        const menus = await menuModel.update(id, { item, price });

        return res.json({
            message: 'success update menu',
            data: menus,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

menuController.delete = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: 'id is required',
            });
        }

        const menu = await menuModel.getOneById(id);

        if (!menu) {
            return res.status(404).json({
                message: 'menu not found',
                data: null,
            });
        }

        await menuModel.delete(id);

        return res.status(200).json({
            message: 'success delete menu',
        });
    } catch (err) {}
};

module.exports = menuController;
