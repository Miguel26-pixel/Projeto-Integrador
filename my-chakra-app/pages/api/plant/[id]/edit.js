import prisma from "../../../../db";

export default async (req, res) => {
    if(req.method !== 'POST'){
        res.status(405).json({message: 'Not a POST request'});
    }
    else{
        try{
            const plantID = parseInt(req.query.id);
            // res.status(405).json(req.body);

            let plantExists = await prisma.PLANT.count({
                where : {
                    id : plantID
                }
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

            let { plantName, plantInfo, raspberryPort, raspberryName, experimentID } = req.body;
            let alterations = {
                plantName    : (plantName === "")       ? oldPlant.plantName   : plantName,
                plantInfo    : (plantInfo === "")       ? oldPlant.plantInfo   : plantInfo,
                piHostname   : (raspberryName === "")   ? oldPlant.piHostname  : raspberryName,
                piPort       : (raspberryPort === "")   ? oldPlant.piPort      : raspberryPort,
                experimentID : (experimentID  === "")   ? oldPlant.plantName   : parseInt(experimentID)
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