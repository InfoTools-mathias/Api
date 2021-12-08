const { Model, DataTypes } = require("sequelize");
const database = require("../../config/database");

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING(25)
        },
        surname: {
            type: DataTypes.STRING(25)
        },
        mail: {
            type: DataTypes.STRING(254),
            unique: true
        },
        type: {
            type: DataTypes.SMALLINT
        },
        password: {
            type: DataTypes.STRING(255)
        },
    },
    {
        modelName: "user",
        sequelize: database
    }
)

User.sync();

module.exports = User;