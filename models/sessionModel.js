module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define("sessions", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'Nom Session' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Session est un champ obligatoire !" }
            }
        },
        mention: {
            type: DataTypes.STRING,
        },
        resultat: {
            type: DataTypes.INTEGER,
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

    return Session
}