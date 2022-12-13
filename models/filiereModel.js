module.exports = (sequelize, DataTypes) => {
    const Filiere = sequelize.define("filieres", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'Nom filière' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Filière manip est un champ obligatoire !" }
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

    return Filiere
}