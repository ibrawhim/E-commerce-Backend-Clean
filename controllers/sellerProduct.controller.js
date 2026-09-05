const sellerProductModel = require("../models/sellerProduct.model");

/**
 * Create a seller product
 * POST /seller/products
 */
const createSellerProduct = async (req, res) => {
    try {
        const sellerId = req.user.id;

        const {
            title,
            description,
            category,
            brand,
            price,
            stock,
            image
        } = req.body;

        if (!title || !description || !category || price === undefined) {
            return res.status(400).json({
                success: false,
                message: "Title, description, category and price are required."
            });
        }

        const product = await sellerProductModel.create({
            sellerId,
            title,
            description,
            category,
            brand,
            price,
            stock,
            image
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully.",
            data: product
        });

    } catch (err) {
        console.error("Create seller product error:", err);

        return res.status(500).json({
            success: false,
            message: "Unable to create product."
        });
    }
};


/**
 * Get all products belonging to logged-in seller
 * GET /seller/products
 */
const getSellerProducts = async (req, res) => {
    try {
        const sellerId = req.user.id;

        const products = await sellerProductModel
            .find({ sellerId })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Seller products retrieved successfully.",
            totalProducts: products.length,
            data: products
        });

    } catch (err) {
        console.error("Get seller products error:", err);

        return res.status(500).json({
            success: false,
            message: "Unable to retrieve products."
        });
    }
};


/**
 * Get one seller product
 * GET /seller/products/:productId
 */
const getSellerProduct = async (req, res) => {
    try {
        const sellerId = req.user.id;
        const { productId } = req.params;

        const product = await sellerProductModel.findOne({
            _id: productId,
            sellerId
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product retrieved successfully.",
            data: product
        });

    } catch (err) {
        console.error("Get seller product error:", err);

        return res.status(500).json({
            success: false,
            message: "Unable to retrieve product."
        });
    }
};


/**
 * Update seller product
 * PATCH /seller/products/:productId
 */
const updateSellerProduct = async (req, res) => {
    try {
        const sellerId = req.user.id;
        const { productId } = req.params;

        const {
            title,
            description,
            category,
            brand,
            price,
            stock,
            image
        } = req.body;

        const updateData = {};

        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (category !== undefined) updateData.category = category;
        if (brand !== undefined) updateData.brand = brand;
        if (price !== undefined) updateData.price = price;
        if (stock !== undefined) updateData.stock = stock;
        if (image !== undefined) updateData.image = image;

        const product = await sellerProductModel.findOneAndUpdate(
            {
                _id: productId,
                sellerId
            },
            {
                $set: updateData
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
            data: product
        });

    } catch (err) {
        console.error("Update seller product error:", err);

        return res.status(500).json({
            success: false,
            message: "Unable to update product."
        });
    }
};


/**
 * Delete seller product
 * DELETE /seller/products/:productId
 */
const deleteSellerProduct = async (req, res) => {
    try {
        const sellerId = req.user.id;
        const { productId } = req.params;

        const product = await sellerProductModel.findOneAndDelete({
            _id: productId,
            sellerId
        });

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
        console.error("Delete seller product error:", err);

        return res.status(500).json({
            success: false,
            message: "Unable to delete product."
        });
    }
};


module.exports = {
    createSellerProduct,
    getSellerProducts,
    getSellerProduct,
    updateSellerProduct,
    deleteSellerProduct
};