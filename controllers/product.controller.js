const Product = require("../models/product.model");

/**
 * Get All Products
 * GET /products
 */
const getProducts = async (req, res) => {
    try {

        const products = await Product.find({
            status: "Active"
        }).sort({
            createdAt: -1
        });

        return res.status(200).json({
            success: true,
            totalProducts: products.length,
            products
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

/**
 * Get One Product
 * GET /products/:productId
 */
const getProduct = async (req, res) => {
    try {

        const { productId } = req.params;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        return res.status(200).json({
            success: true,
            product
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

/**
 * Create Product
 * POST /products
 */
const createProduct = async (req, res) => {
    try {

        const existingProduct = await Product.findOne({
            sku: req.body.sku
        });

        if (existingProduct) {
            return res.status(409).json({
                success: false,
                message: "A product with this SKU already exists."
            });
        }

        const product = await Product.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Product created successfully.",
            product
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

/**
 * Update Product
 * PATCH /products/:productId
 */
const updateProduct = async (req, res) => {
    try {

        const { productId } = req.params;

        const product = await Product.findByIdAndUpdate(
            productId,
            {
                $set: req.body
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            product
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};

/**
 * Delete Product (Soft Delete)
 * DELETE /products/:productId
 */
const deleteProduct = async (req, res) => {
    try {

        const { productId } = req.params;

        const product = await Product.findByIdAndUpdate(
            productId,
            {
                status: "Inactive"
            },
            {
                new: true
            }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully."
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }
};


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};