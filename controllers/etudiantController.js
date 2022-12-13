const db = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize');

const Etudiant = db.etudiants;

const addEtudiant = async (req, res) => {
    try {
        let etudiant = await Etudiant.create(req.body);
        let message = 'Etudiant ajouté avec succès';
        if (etudiant) {
            res.status(201).json({ message, data: etudiant })
        } else {
            return res.status(400).json({ message: "étudiant non ajoué" })
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

const getAllEtudiants = async (req, res) => {

    try {
        let etudiants = await Etudiant.findAll({
            include: [{
                model: db.filieres,
                as: "filieres"
            }, {
                model: db.sessions,
                as: "sessions"
            }]
        });
        let taille = etudiants.length;
        let message = "La liste des étudiants a été bien trouvée";

        if (taille > 0) {
            res.status(200).json({ message, data: etudiants, taille });
        } else {
            return res.status(400).json({ message: "Aucun étudiant trouvé." });
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getOneEtufiant = async (req, res) => {
    let id = req.params.id;
    try {
        let etudiant = await Etudiant.findOne({
            where: { id: id }, include: [{
                model: db.filieres,
                as: "filieres"
            }, {
                model: db.sessions,
                as: "sessions"
            }]
        });

        if (etudiant) {
            let message = "L'étudiant a été trouvé avec succès";
            res.status(200).json({ message, data: etudiant });
        } else {
            let message = "Aucun étudiant n'a été trouvé avec l'identifiant : " + id;
            return res.status(404).json({ message, data: etudiant })
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
}

const updateEtudiant = async (req, res) => {

    let id = req.params.id;
    let data = req.body;

    try {
        let findEtudiantById = await Etudiant.findOne({ where: { id: id } });

        if (findEtudiantById) {
            let message = "L'étudiant a été modifié avec succès";

            let etudiantUpdated = await Etudiant.update(data, { where: { id: id } });

            if (etudiantUpdated) {
                let etudiant = await Etudiant.findOne({ where: { id: id } });
                res.status(200).json({ message, data: etudiant });
            } else {
                res.status(301).json({ message: "Pas de mofication" });
            }
        } else {
            let message = "Aucun étudiant n'a été trouvé avec l'identifiant : " + id;
            return res.status(404).json({ message })
        }
    } catch (error) {
        return res.status(500).json({ error });
    }
}

const deleteEtudiant = async (req, res) => {
    let id = req.params.id;

    try {
        let findEtudiantById = await Etudiant.findOne({ where: { id: id } });

        if (findEtudiantById) {
            let etudiantDeleted = await Etudiant.destroy({ where: { id: id } });

            if (etudiantDeleted) {
                let message = "Etudiant a été supprimé avec succès : ";
                return res.status(200).json({ message })
            } else {
                let message = "Etudiant n'a pa été supprimé ";
                return res.status(400).json({ message })
            }
        } else {
            let message = "Aucun étudiant n'a été trouvé avec l'identifiant : " + id;
            return res.status(400).json({ message });
        }

    } catch (error) {
        return res.status(500).json({ error: "Erreur interne" });
    }
}

module.exports = {
    addEtudiant, getAllEtudiants, getOneEtufiant, updateEtudiant, deleteEtudiant
}