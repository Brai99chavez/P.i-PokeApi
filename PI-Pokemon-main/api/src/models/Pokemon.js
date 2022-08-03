const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Pokemon', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        health: {
            type: DataTypes.INTEGER,
            allowNull: false,
            valite: {
                min: 0,
                max: 255,
            },
        },
        attack: {
            type: DataTypes.INTEGER,
            allowNull: false,
            valite: {
                min: 0,
                max: 255,
            },
        },
        speed: {
            type: DataTypes.INTEGER,
            allowNull: false,
            valite: {
                min: 0,
                max: 255,
            },
        },
        spAttack: {
            type: DataTypes.INTEGER,
            allowNull: false,
            valite: {
                min: 0,
                max: 255,
            },
        },
        spDefense: {
            type: DataTypes.INTEGER,
            allowNull: false,
            valite: {
                min: 0,
                max: 255,
            },
        },
        defense: {
            type: DataTypes.INTEGER,
            allowNull: false,
            valite: {
                min: 0,
                max: 255,
            },
        },
    });
};
//asd