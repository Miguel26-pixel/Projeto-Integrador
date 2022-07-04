import prisma from "../../../db";

export default async (req, res) => {
    if (req.method !== 'POST'){
        return req.status(405).json({ message: 'Method not allowed'});
    }

    try{
        const piData = req.body.piData;
        const piHostname = piData.hostname;

        const newPi = await prisma.pi.create({
            data : {
                hostname : piHostname
            }
        });
        
        const plantsData = piData.data;
        for (let i = 0; i < plantsData.length(); i++){
            const plant = plantsData[i];
            const piPort = parseInt(plant.plant);

            const plantExists = await prisma.$exists.PLANT({
                piHostname : piHostname,
                piPort : piPort
            });

            if (!plantExists){
                // TODO: we might want to create a new plant here
                res.status(400).json( { message : "That plant does not exist" } );
            }
            
            const updatedPlant = await prisma.PLANT.update({
                where: {
                    piHostname : piHostname,
                    piPort : piPort
                },
                data : {
                    plantdata : {
                        create : [
                            {
                                time : plant.time,
                                temperature : plant.temperature,
                                humidity : plant.humidity,
                                distance : plant.distance,
                                plantID : editPlantID
                            }
                        ]
                    }
                }
            });

            const updatedPi = await prisma.RASPBERRYPI.update({
                where : {
                    id : newPi.id
                },
                data : {
                    plant
                }
            });

        }
        res.redirect("/", 303).json(newPi);
    }
    catch (error) {
        res.status(400).json({ message: 'an oopsie occured' })
    }

}