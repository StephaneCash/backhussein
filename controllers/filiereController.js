const db = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize');

const Filiere = db.filieres;

const addFiliere = async (req, res) => {
    try {
        let filiere = await Filiere.create(req.body);
        let message = 'Filière ajoutée avec succès';
        if (filiere) {
            res.status(201).json({ message, data: filiere })
        } else {
            return res.status(400).json({ message: "Filière non ajoué" })
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

const getAllFilieres = async (req, res) => {

    try {
        let filieres = await Filiere.findAll({
            include: [{
                model: db.etudiants,
                as: "etudiants"
            }]
        });
        let taille = filieres.length;
        let message = "La liste des filières a été bien trouvée";

        if (taille > 0) {
            res.status(200).json({ message, data: filieres, taille });
        } else {
            return res.status(400).json({ message: "Aucune filière trouvée." });
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getOneFiliere = async (req, res) => {
    let id = req.params.id;
    try {
        let filiere = await Filiere.findOne({
            where: { id: id }, include: [{
                model: db.etudiants,
                as: "etudiants"
            }]
        });

        if (filiere) {
            let message = "La filière a été trouvée avec succès";
            res.status(200).json({ message, data: filiere })
        } else {
            let message = "Aucune filière n'a été trouvée avec l'identifiant : " + id;
            return res.status(404).json({ message, data: filiere })
        }

    } catch (error) {
        return res.status(500).json({ error });
    }
}

const updateFiliere = async (req, res) => {

    let id = req.params.id;
    let data = req.body;

    try {
        let findFiliereById = await Filiere.findOne({ where: { id: id } });

        if (findFiliereById) {
            let message = "La filière a été modifiée avec succès";

            let filiereUpdated = await Filiere.update(req.body, { where: { id: id } });

            if (filiereUpdated) {
                let filiere = await Filiere.findOne({ where: { id: id } });
                res.status(200).json({ message, data: filiere });
            } else {
                res.status(301).json({ message: "Pas de mofication" });
            }

        } else {
            let message = "Aucune filière n'a été trouvée avec l'identifiant : " + id;
            return res.status(404).json({ message })
        }

    } catch (error) {
        return res.status(500).json({ error });
    }
}

const deleteFiliere = async (req, res) => {
    let id = req.params.id;

    try {
        let findFiliereById = await Filiere.findOne({ where: { id: id } });

        if (findFiliereById) {
            let filiereDeleted = await Filiere.destroy({ where: { id: id } });

            if (filiereDeleted) {
                let message = "Filière a été supprimée avec succès : ";
                return res.status(200).json({ message })
            } else {
                let message = "Filière n'a pa été supprimée ";
                return res.status(400).json({ message })
            }

        } else {
            let message = "Aucune filière n'a été trouvée avec l'identifiant : " + id;
            return res.status(400).json({ message });
        }

    } catch (error) {
        return res.status(500).json({ error: "Erreur interne" });
    }
}

module.exports = {
    addFiliere, getAllFilieres, getOneFiliere, updateFiliere, deleteFiliere
}