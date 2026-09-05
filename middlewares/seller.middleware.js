const requireSeller = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: "Authentication required."
        });
    }

    if (req.user.role !== "Seller") {
        return res.status(403).json({
            success: false,
            message: "Only sellers can access this resource."
        });
    }

    next();
};

module.exports = requireSeller;