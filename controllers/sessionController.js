const db = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize');

const Session = db.sessions;

const addSession = async (req, res) => {
    try {
        let session = await Session.create(req.body);
        let message = 'session ajoutée avec succès';
        if (session) {
            res.status(201).json({ message, data: session })
        } else {
            return res.status(400).json({ message: "session non ajoutée" })
        }
    } catch (err) {
        if (err instanceof ValidationError) {
            return res.status(400).json({
                message: err
            });
        };

        if (err instanceof UniqueConstraintError) {
            return res.status(400).json({
                message: err
            });
        };
    }
}

const getAllSession = async (req, res) => {

    Session.findAll({
        include: [{
            model: db.etudiants,
            as: "etudiants"
        }, {
            model: db.cours,
            as: "cours"
        }]
    })
        .then(resp => {
            let taille = resp.length;
            const message = "La liste des sessions a été bien trouvée.";
            res.status(200).json({ message: message, data: resp, taille });
        })
        .catch(err => {
            return res.send('Erreurs :: ' + err);
        });
}

const getOneSession = async (req, res) => {
    let id = req.params.id;
    try {
        let session = await Session.findOne({
            where: { id: id }, include: [{
                model: db.cours,
                as: "cours"
            }]
        });

        if (session) {
            let message = "La session a été trouvée avec succès";
            res.status(200).json({ message, data: session })
        } else {
            let message = "Aucune session n'a été trouvée avec l'identifiant : " + id;
            return res.status(404).json({ message, data: session })
        }

    } catch (error) {
        return res.status(500).json({ error });
    }
}

const updateSession = async (req, res) => {

    let id = req.params.id;
    let data = req.body;

    try {
        let findSessionById = await Session.findOne({ where: { id: id } });

        if (findSessionById) {
            let message = "La session a été modifiée avec succès";

            let sessionUpdated = await Session.update(req.body, { where: { id: id } });

            if (sessionUpdated) {
                let session = await Session.findOne({ where: { id: id } });
                res.status(200).json({ message, data: session });
            } else {
                res.status(301).json({ message: "Pas de mofication" });
            }

        } else {
            let message = "Aucune session n'a été trouvée avec l'identifiant : " + id;
            return res.status(404).json({ message })
        }

    } catch (error) {
        return res.status(500).json({ error });
    }
}

const deleteSession = async (req, res) => {
    let id = req.params.id;

    try {
        let findCoursById = await Session.findOne({ where: { id: id } });

        if (findCoursById) {
            let coursDeleted = await Session.destroy({ where: { id: id } });

            if (coursDeleted) {
                let message = "Session a été supprimée avec succès : ";
                return res.status(200).json({ message })
            } else {
                let message = "Session n'a pa été supprimée ";
                return res.status(400).json({ message })
            }

        } else {
            let message = "Aucune session n'a été trouvée avec l'identifiant : " + id;
            return res.status(400).json({ message });
        }

    } catch (error) {
        return res.status(500).json({ error: "Erreur interne" });
    }
}

module.exports = {
    addSession, getAllSession, getOneSession, updateSession, deleteSession
}