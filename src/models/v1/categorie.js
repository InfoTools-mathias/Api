const { Model, DataTypes } = require('sequelize');
const database = require('../../config/database');

class Categorie extends Model {}

Categorie.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING(25)
        }
    },
    {
        modelName: "categorie",
        sequelize: database
    }
)

Categorie.sync();

module.exports = Categorie;