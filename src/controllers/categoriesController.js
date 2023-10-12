const categoryModel = require('../models/categoriesModel');

const categoriesController = {};

categoriesController.getAll = async (req, res) => {
    try {
        const categories = await categoryModel.getAll();

        return res.json({
            message: 'success get all categories',
            data: categories,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

categoriesController.create = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                message: 'name is required',
            });
        }

        const categories = await categoryModel.create({ name });

        return res.json({
            message: 'success create category',
            data: categories,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

categoriesController.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                message: 'name is required',
            });
        }

        const categories = await categoryModel.update(id, { name });

        return res.json({
            message: 'success update category',
            data: categories,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};

categoriesController.delete = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                message: 'id is required',
            });
        }

        const menu = await categoryModel.getOneById(id);

        if (!menu) {
            return res.status(404).json({
                message: 'menu not found',
                data: null,
            });
        }

        await categoryModel.delete(id);

        return res.status(200).json({
            message: 'success delete menu',
        });
    } catch (err) {}
};

module.exports = categoriesController;
