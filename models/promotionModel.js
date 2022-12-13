module.exports = (sequelize, DataTypes) => {
    const Promotion = sequelize.define("promotions", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'Nom promotion' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "promotion est un champ obligatoire !" }
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'description' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Description est un champ obligatoire !" }
            }
        },
    })

    return Promotion
}