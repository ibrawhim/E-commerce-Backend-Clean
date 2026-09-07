const sellerProductModel = require("../models/sellerProduct.model");
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "seller-products",
                resource_type: "image"
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        uploadStream.end(file.buffer);
    });
};

const uploadImages = async (files) => {
    if (!files || files.length === 0) {
        return [];
    }

    const results = await Promise.all(
        files.map((file) => uploadToCloudinary(file))
    );

    return results.map((result) => result.secure_url);
};

const createSellerProduct = async (req, res) => {
    try {
        const sellerId = req.user.id;

        const {
            title,
            description,
            category,
            price,
            stock,
            brand,
            sku,
            weight,
            dimensions,
            tags,
            warrantyInformation,
            shippingInformation,
            returnPolicy,
            minimumOrderQuantity
        } = req.body;

        if (!title || !description || !category || price === undefined) {
            return res.status(400).json({
                success: false,
                message: "Title, description, category and price are required."
            });
        }

        let parsedDimensions = {
            width: 0,
            height: 0,
            depth: 0
        };

        let parsedTags = [];

        try {
            if (dimensions) {
                parsedDimensions = JSON.parse(dimensions);
            }

            if (tags) {
                parsedTags = JSON.parse(tags);
            }
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Invalid dimensions or tags format."
            });
        }

        const imageUrls = await uploadImages(req.files);

        const product = await sellerProductModel.create({
            sellerId,
            title,
            description,
            category,
            price,
            stock,
            brand,
            sku,
            weight,
            dimensions: parsedDimensions,
            tags: parsedTags,
            warrantyInformation,
            shippingInformation,
            returnPolicy,
            minimumOrderQuantity,
            images: imageUrls,
            thumbnail: imageUrls.length > 0 ? imageUrls[0] : ""
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

const updateSellerProduct = async (req, res) => {
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

        const {
            title,
            description,
            category,
            price,
            stock,
            brand,
            sku,
            weight,
            dimensions,
            tags,
            warrantyInformation,
            shippingInformation,
            returnPolicy,
            minimumOrderQuantity
        } = req.body;

        const updateData = {};

        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (category !== undefined) updateData.category = category;
        if (price !== undefined) updateData.price = price;
        if (stock !== undefined) updateData.stock = stock;
        if (brand !== undefined) updateData.brand = brand;
        if (sku !== undefined) updateData.sku = sku;
        if (weight !== undefined) updateData.weight = weight;
        if (warrantyInformation !== undefined) {
            updateData.warrantyInformation = warrantyInformation;
        }
        if (shippingInformation !== undefined) {
            updateData.shippingInformation = shippingInformation;
        }
        if (returnPolicy !== undefined) {
            updateData.returnPolicy = returnPolicy;
        }
        if (minimumOrderQuantity !== undefined) {
            updateData.minimumOrderQuantity = minimumOrderQuantity;
        }

        if (dimensions !== undefined) {
            try {
                updateData.dimensions = JSON.parse(dimensions);
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid dimensions format."
                });
            }
        }

        if (tags !== undefined) {
            try {
                updateData.tags = JSON.parse(tags);
            } catch (error) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid tags format."
                });
            }
        }

        if (req.files && req.files.length > 0) {
            const imageUrls = await uploadImages(req.files);

            updateData.images = imageUrls;
            updateData.thumbnail = imageUrls[0];
        }

        const updatedProduct = await sellerProductModel.findOneAndUpdate(
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

        return res.status(200).json({
            success: true,
            message: "Product updated successfully.",
            data: updatedProduct
        });

    } catch (err) {
        console.error("Update seller product error:", err);

        return res.status(500).json({
            success: false,
            message: "Unable to update product."
        });
    }
};

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

