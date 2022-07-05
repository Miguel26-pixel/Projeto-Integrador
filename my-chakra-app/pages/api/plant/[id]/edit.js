import prisma from "../../../../db";

export default async function getPiPlants (req, res) {
    if(req.method !== 'GET'){
        res.status(405).json({message: 'Not a GET request'});
    }
    else{
        try{
            const plantID = parseInt(req.query.id);
            res.status(400).json(req.body);

            let plantExists = await prisma.$exists.PLANT({
                id : plantID
            });
            if(!plantExists){
                // TODO: possibly upsert to create and update
                res.status(400).json({ message : 'that plant does not exist' });
            }

            let oldPlant = await prisma.PLANT.findUnique({
                where : {
                    id : plantID
                }
            });

            let { reqName, reqHostname, reqPort, reqExperiment } = req.body;
            let alterations = {
                plantname : (reqName === null)       ? oldPlant.plantName   : reqName,
                plantname : (reqHostname === null)   ? oldPlant.piHostname  : reqHostname,
                plantname : (reqPort === null)       ? oldPlant.piPort      : parseInt(reqPort),
                plantname : (reqExperiment === null) ? oldPlant.plantName   : parseInt(reqExperiment)
            }
            
            let updatedPlant = await prisma.PLANT.update({
                where : {
                    id : plantID
                },
                data : alterations
            })

            res.status(200).json(updatedPlant);
        }
        catch (error) {
            let errorString = "An error occured" + error;
            res.status(400).json({ message: errorString });
        }
    }
}