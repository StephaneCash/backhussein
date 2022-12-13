const dbConfig = require('../config/dbConfig.js');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        }
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Connexion réussie à la base de données');
    }).catch((err) => {
        console.log("Erreur : ", err);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModel.js")(sequelize, DataTypes);
db.etudiants = require('./etudiantModel')(sequelize, DataTypes);
db.filieres = require('./filiereModel')(sequelize, DataTypes);
db.promotions = require("./promotionModel")(sequelize, DataTypes);
db.sessions = require('./sessionModel')(sequelize, DataTypes);
db.cours = require("./coursModel")(sequelize, DataTypes);

// RELATION ETUDIANT FILIERRE 1-N
db.filieres.hasMany(db.etudiants, {
    as: "etudiants"
});

db.etudiants.belongsTo(db.filieres, {
    foreignKey: "filiereId",
    as: "filieres"
});

// RELATION PROMOTION FILIERE 1-N
db.promotions.hasMany(db.filieres, {
    as: "filieres"
});

db.filieres.belongsTo(db.promotions, {
    foreignKey: "promotionId",
    as: "promotions"
});

// RELATION SESSION COURS N-N
db.sessions.hasMany(db.cours, {
    as: "cours",
});

db.cours.belongsTo(db.sessions, {
    as: "sessions",
    foreignKey: "sessionId"
});

// RELATION SESSION ETUDIANT N-N
db.etudiants.hasMany(db.sessions, {
    as: "sessions",
});

db.sessions.belongsTo(db.etudiants, {
    as: "etudiants",
    foreignKey: "etudiantId"
});

// RELATION ETUDIANT COURS N-N
db.etudiants.hasMany(db.cours, {
    as: "cours",
});

db.cours.belongsTo(db.etudiants, {
    as: "etudiants",
    foreignKey: "etudiantId"
});



db.sequelize.sync({ force: false }).then(() => {
    console.log('Mdels synchronisés ')
});

module.exports = db;