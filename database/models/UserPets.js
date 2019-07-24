module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user_pets', {
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false,
        },

        pet_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },

    },
        {
            timestamps: false
        })
}