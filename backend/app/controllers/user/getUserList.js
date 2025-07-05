const sequelize = require("../../../sequelize/config/sequelize");
const User = require("../../../sequelize/models/user");

const getUserList = (req, res) => {
    try {
        User.findAll({
            where: {
                isActive: true
            },
            attributes: {
                include: [
                    "firstName",
                    "lastName",
                    [sequelize.fn("concat", sequelize.col("firstName"), ' ', sequelize.col("lastName")), "fullName"],
                ],
                exclude: ["password", "email", "token", "phone", "createdAt", "updatedAt", "firstName", "lastName"]
            }
        }).then((data) => {
            return res.status(200).send({
                success: true,
                message: "User List Loaded",
                data,
            });
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error, while getting user list",
            error
        });
    }
};

module.exports = getUserList;
