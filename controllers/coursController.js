const db = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize');

const Cours = db.cours;

const addCours = async (req, res) => {
    try {
        let cours = await Cours.create(req.body);
        let message = 'Cours ajouté avec succès';
        if (cours) {
            res.status(201).json({ message, data: cours })
        } else {
            return res.status(400).json({ message: "Cours non ajouté" })
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

const getAllCours = async (req, res) => {

    try {
        let cours = await Cours.findAll();
        let taille = cours.length;
        let message = "La liste des cours a été bien trouvée";

        if (taille > 0) {
            res.status(200).json({ message, data: cours, taille });
        } else {
            return res.status(400).json({ message: "Aucun cours trouvé." });
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getOneCours = async (req, res) => {
    let id = req.params.id;
    try {
        let cours = await Cours.findOne({ where: { id: id } });

        if (cours) {
            let message = "Le cours a été trouvé avec succès";
            res.status(200).json({ message, data: cours })
        } else {
            let message = "Aucun cours n'a été trouvé avec l'identifiant : " + id;
            return res.status(404).json({ message, data: filiere })
        }

    } catch (error) {
        return res.status(500).json({ error });
    }
}

const updateCours = async (req, res) => {

    let id = req.params.id;
    let data = req.body;

    try {
        let findCoursById = await Cours.findOne({ where: { id: id } });

        if (findCoursById) {
            let message = "Le cours a été modifié avec succès";

            let coursUpdated = await Cours.update(req.body, { where: { id: id } });

            if (coursUpdated) {
                let cours = await Cours.findOne({ where: { id: id } });
                res.status(200).json({ message, data: cours });
            } else {
                res.status(301).json({ message: "Pas de mofication" });
            }

        } else {
            let message = "Aucun cours n'a été trouvé avec l'identifiant : " + id;
            return res.status(404).json({ message })
        }

    } catch (error) {
        return res.status(500).json({ error });
    }
}

const deleteCours = async (req, res) => {
    let id = req.params.id;

    try {
        let findCoursById = await Cours.findOne({ where: { id: id } });

        if (findCoursById) {
            let coursDeleted = await Cours.destroy({ where: { id: id } });

            if (coursDeleted) {
                let message = "Cours a été supprimé avec succès : ";
                return res.status(200).json({ message })
            } else {
                let message = "Cours n'a pa été supprimé ";
                return res.status(400).json({ message })
            }

        } else {
            let message = "Aucun cours n'a été trouvé avec l'identifiant : " + id;
            return res.status(400).json({ message });
        }

    } catch (error) {
        return res.status(500).json({ error: "Erreur interne" });
    }
}

module.exports = {
    addCours, getAllCours, getOneCours, updateCours, deleteCours
}