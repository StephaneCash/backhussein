const db = require('../models');
const { ValidationError, UniqueConstraintError } = require('sequelize');

const Promotion = db.promotions;

const addPromotion = async (req, res) => {
    try {
        let promotion = await Promotion.create(req.body);
        let taille = promotion.length;
        let message = 'Promotion ajoutée avec succès';
        if (promotion) {
            res.status(201).json({ message, data: promotion, taille: taille })
        } else {
            return res.status(400).json({ message: "promotion non ajoutée" })
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

const getAllPromotions = async (req, res) => {

    try {
        let promotions = await Promotion.findAll({
            include: [{
                model: db.filieres,
                as: "filieres"
            }]
        });
        let taille = promotions.length;
        let message = "La liste des promotions a été bien trouvée";

        if (taille > 0) {
            res.status(200).json({ message, data: promotions, taille });
        } else {
            return res.status(400).json({ message: "Aucune promotion trouvée." });
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

const getOnePromotion = async (req, res) => {
    let id = req.params.id;
    try {
        let promotion = await Promotion.findOne({ where: { id: id } });

        if (promotion) {
            let message = "La promotion a été trouvée avec succès";
            res.status(200).json({ message, data: promotion })
        } else {
            let message = "Aucune promotion n'a été trouvée avec l'identifiant : " + id;
            return res.status(404).json({ message, data: promotion })
        }

    } catch (error) {
        return res.status(500).json({ error });
    }
}

const updatePromotion = async (req, res) => {

    let id = req.params.id;
    let data = req.body;

    try {
        let findPromotionById = await Promotion.findOne({ where: { id: id } });

        if (findPromotionById) {
            let message = "La promotion a été modifiée avec succès";

            let promotionUpdated = await Promotion.update(req.body, { where: { id: id } });

            if (promotionUpdated) {
                let promotion = await Promotion.findOne({ where: { id: id } });
                res.status(200).json({ message, data: promotion });
            } else {
                res.status(301).json({ message: "Pas de mofication" });
            }

        } else {
            let message = "Aucune promotion n'a été trouvée avec l'identifiant : " + id;
            return res.status(404).json({ message })
        }

    } catch (error) {
        return res.status(500).json({ error });
    }
}

const deletePromotion = async (req, res) => {
    let id = req.params.id;

    try {
        let findPromotionById = await Promotion.findOne({ where: { id: id } });

        if (findPromotionById) {
            let filiereDeleted = await Promotion.destroy({ where: { id: id } });

            if (filiereDeleted) {
                let message = "Promotion a été supprimée avec succès : ";
                return res.status(200).json({ message })
            } else {
                let message = "Promotion n'a pa été supprimée ";
                return res.status(400).json({ message })
            }

        } else {
            let message = "Aucune promotion n'a été trouvée avec l'identifiant : " + id;
            return res.status(400).json({ message });
        }

    } catch (error) {
        return res.status(500).json({ error: "Erreur interne" });
    }
}

module.exports = {
    addPromotion, getAllPromotions, getOnePromotion, updatePromotion, deletePromotion
}