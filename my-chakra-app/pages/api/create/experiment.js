import prisma from "../../../db";

export default async (req, res) => {
    if (req.method !== 'POST'){
        return req.status(405).json({ message: 'Method not allowed'});
    }

    try{
        const newExperiment = await prisma.EXPERIMENT.create(
            {
                data: {
                    name: req.body.experimentName,
                    // image: req.body.experimentImage,
                    image: './placeholder.png',
                    info: req.body.experimentInfo
                },
            }
        );
        console.log(newExperiment);
        res.redirect("/", 303).json(newPlant);
    }
    catch (error) {
        const errorString = "An error occured: " + error;
        res.status(400).json({ message: errorString })
    }
}