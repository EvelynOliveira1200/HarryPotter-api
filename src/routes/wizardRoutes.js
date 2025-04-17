const express = require("express");
const router = express.Router();
const wizardController = require("../controllers/wizardController");
const upload = require("../config/upload.js"); // importe a upload.js

/**
 * @swagger
 * tags:
 *  name: Wizards
 *  description: Gerenciamento de bruxos
 */

/**
 * @swagger
 * /api/wizards:
 *   get:
 *     summary: Lista todos os bruxos
 *     tags: [Wizards]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtro por nome
 *     responses:
 *       200:
 *         description: Lista de bruxos
 */

router.get("/", wizardController.getAllWizards);

/**
 * @swagger
 * /api/wizards:
 *   post:
 *     summary: Cria um novo bruxo
 *     tags: [Wizards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               house_id:
 *                 type: number
 *               photo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Casa criada com sucesso
 */

router.post("/wizards", upload.single("photo"), wizardController.createWizard);

router.get("/:id", wizardController.getWizard);
router.put("/:id", wizardController.updateWizard);
router.delete("/:id", wizardController.deleteWizard);

module.exports = router;
