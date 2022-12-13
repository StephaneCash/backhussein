module.exports = (sequelize, DataTypes) => {
    const Etudiant = sequelize.define("etudiants", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'Nom étudiant' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Nom étudiant est un champ obligatoire !" }
            }
        },
        postnom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'Postnom étudiant' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Postnom étudiant est un champ obligatoire !" }
            }
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'prenom étudiant' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Prenom étudiant est un champ obligatoire !" }
            }
        },
        sexe: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: "Le champ 'Sexe étudiant' est vide, veuillez remplir ce champ svp" },
                notNull: { msg: "Sexe étudiant est un champ obligatoire !" }
            }
        },
        matricule: {
            type: DataTypes.STRING
        }
    })

    return Etudiant
}