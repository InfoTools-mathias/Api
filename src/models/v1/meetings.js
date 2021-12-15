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
            defaultValue: null
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: null
        },
        postal_code: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        adresse: {
            type: DataTypes.STRING,
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