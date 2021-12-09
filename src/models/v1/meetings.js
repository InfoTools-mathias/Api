const { Model, DataTypes } = require("sequelize");
const database = require("../../config/database");

class Meeting extends Model {}

Meeting.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        request_user: {
            type: DataTypes.INTEGER,
        },
        target_user: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        postal_code: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        adresse: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        }
    },
    {
        modelName: "meeting",
        sequelize: database
    }
)

Meeting.sync();

module.exports = Meeting;