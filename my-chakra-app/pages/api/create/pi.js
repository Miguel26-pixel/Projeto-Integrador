import prisma from "../../../db";

export default async (req, res) => {
    if (req.method !== 'POST'){
        return req.status(405).json({ message: 'Method not allowed'});
    }

    try{
        const piData = req.body.piData;
        const piName = piData.hostname;
        const piIP = piData.ip;
        for (var plant : piData.data){
            const editPlantID = parseInt(plant.plant);
            const plantExists = await prisma.$exists.PLANT({
                id : editPlantID;
            })
            if (!plantExists){
                // TODO: create new plant after Nuno changes the packet contents
                res.status(400).json( message: "That plant does not exist" );
            }
            
            const updatedPlant = await prisma.PLANT.update({
                where: {
                    id : editPlantID
                },
                data : {
                    
                    plantdata : {
                        create : [
                            {
                                time : plant.time,
                                temperature : plant.temperature,
                                humidity : plant.humidity,
                                // distance : plant.distance
                                plantID : editPlantID
                            }
                        ]
                    }
                }
            })

        }

        const newPi = await prisma.pi.create({
            data : {
                piName : req.body.piName,
                ip: req.body.ip
            }
        })
        console.log(newPi);
        res.redirect("/", 303).json(newPi);
    }
    catch (error) {
        res.status(400).json({ message: 'an oopsie occured' })
    }

}