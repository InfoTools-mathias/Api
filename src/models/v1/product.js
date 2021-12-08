const { Model, DataTypes } = require("sequelize");
const database = require("../../config/database");

class Product extends Model {}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING(50)
        },
        price: {
            type: DataTypes.NUMBER
        },
        quantity: {
            type: DataTypes.INTEGER
        },
        type: {
            type: DataTypes.TINYINT
        },
        description: {
            type: DataTypes.TEXT
        },
        image: {
            type: DataTypes.STRING(25),
            defaultValue: null
        }
    },
    {
        modelName: "product",
        sequelize: database
    }
)

Product.sync();

module.exports = Product;