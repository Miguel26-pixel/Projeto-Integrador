import prisma from "../../../db";

export default async (req, res) => {
    if (req.method !== 'POST'){
        return req.status(405).json({ message: 'Method not allowed'});
    }

    try{
        let { plantName, piPort, piHostname, experimentID } = req.body;
        const newPlant = await prisma.PLANT.create(
            { 
                data: {
                    plantName: plantName,
                    piPort : piPort,
                    piHostname : piHostname,
                    experimentID: parseInt(experimentID),
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