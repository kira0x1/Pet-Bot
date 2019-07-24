module.exports = (sequelize, DataTypes) => {
    return sequelize.define('pet_shop', {
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
        cost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
            timestamps: false,
        });
};