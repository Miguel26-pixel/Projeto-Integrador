import prisma from "../../../db";

export default async (req, res) => {
    if (req.method !== 'POST'){
        return res.status(405).json({ message: 'Method not allowed'});
    }

    try{
        const newExperiment = await prisma.EXPERIMENT.create(
            {
                data: {
                    name: req.body.experimentName,
                    image: req.body.experimentImage,
                    info: req.body.experimentInfo
                },
            }
        );
        res.redirect("/experimentsList", 303).end();
    }
    catch (error) {
        const errorString = "An error occured: " + error;
        res.status(400).json({ message: errorString })
    }
}