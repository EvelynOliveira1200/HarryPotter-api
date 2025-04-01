const houseModel = require("../models/houseModel");

const getAllHouses = async (req, res) => {
    try {
        const houses = await houseModel.getHouses();
        res.json(houses);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar casas." });
    }
};

const getHouse = async (req, res) => {
    try {
        const house = await houseModel.getHouseById(req.params.id);
        if (!house) {
            return res.status(404).json({ message: "Casa não encontrada." });
        }
        res.json(house);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar casa." });
    }
};

const createHouse = async (req, res) => {
    try {
        const { name, founder } = req.body;
        const newHouse = await houseModel.createHouse(name, founder);
        res.status(201).json(newHouse);
        
    } catch (error) {
        res.status(404).json({ message: "Erro ao criar casa." });
    }
}

const updateHouse = async (req, res) => {
    try {
        const houseId = req.params.id;
        const { name, founder } = req.body;
        const updateHouse = await houseModel.updateHouse(houseId, name, founder);
        
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar casa." });
    }
    res.status(200).json({ message: "Casa atualizada com sucesso." });
}

const deleteHouse = async (req, res) => {
    try {
        const houseId = req.params.id;
        await houseModel.deleteHouse(houseId);
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar casa." });
    }
    res.status(200).json({ message: "Casa deletada com sucesso." });
}

module.exports = { getAllHouses, getHouse, createHouse, updateHouse, deleteHouse };

