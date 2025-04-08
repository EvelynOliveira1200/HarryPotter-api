const { format } = require("@fast-csv/format");

const wizardModel = require("../models/wizardModel")
const PDFDocument = require("pdfkit")

const exportWizardCSV = async (req, res) => {
    try {
        const wizards = await wizardModel.getWizards();

        res.setHeader("Content-Disposition", "attachment; filename=wizards.csv")
        res.setHeader("Content-Type", "text-csv")

        const csvStream = format({ headers: true })
        csvStream.pipe(res);

        wizards.forEach((wizard) => {
            csvStream.write({
                Id: wizard.id,
                Nome: wizard.name,
                Casa: wizard.house_name || "Sem casa",
            })
        })

    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o CSV" })
    }
}

const exportWizardPDF = async (req, res) => {
    try {
        const wizards = await wizardModel.getWizards();

        res.setHeader("Content-Type", "application/pdf")
        res.setHeader("Content-disposition", "inline; filename=wizards.pdf")

        const doc = new PDFDocument()
        doc.pipe(res);

        //Titulo
        doc.fontSize(20).text("Relatório de Bruxos", { align: "center" });

        //Cabeçalho
        doc.fontSize(12).text("Id | Nome | Casa", { underline: true });
        doc.moveDown(0.5);

        //Conteudo
        wizards.forEach((wizard) => {
            doc.text(
                `${wizard.id} | ${wizard.name} | ${wizard.house_name || "Sem casa"}`,
                { align: "left" }
            )
        });
        doc.end();
    } catch (error) {
        res.status(500).json({ message: "Erro ao gerar o PDF" })
    }
}

module.exports = { exportWizardCSV, exportWizardPDF };