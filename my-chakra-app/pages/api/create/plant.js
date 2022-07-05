import prisma from "../../../db";

export default async (req, res) => {
    if (req.method !== 'POST'){
        return req.status(405).json({ message: 'Method not allowed'});
    }

    try{
        let { reqName, reqHostname, reqPort, reqExperiment } = req.body;
        const newPlant = await prisma.PLANT.create(
            { 
                data: {
                    plantName: reqName,
                    piHostname : reqHostname,
                    piPort : reqPort,
                    experimentID: parseInt(reqExperiment),
                },
            }
        );
        console.log(newPlant);
        res.redirect("/experiment/" + req.body.experimentID, 303).json(newPlant);
    }
    catch (error) {
        const errorString = "An error occured: " + error;
        res.status(400).json({ message: errorString })
    }
}