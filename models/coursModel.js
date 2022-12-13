module.exports = (sequelize, DataTypes) => {
    const Cours = sequelize.define("cours", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'Nom Cours' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "promotion est un champ obligatoire !" }
            }
        },
        cotation: {
            type: DataTypes.INTEGER
        },
        ponderation: {
            type: DataTypes.INTEGER
        },
    })

    return Cours
}