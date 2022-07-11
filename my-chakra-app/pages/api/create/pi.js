import prisma from "../../../db";
import pusher from "../../../pusher"

export default async (req, res) => {
    if (req.method !== 'POST'){
        return req.status(405).json({ message: 'Method not allowed'});
    }

    try{
        const piData = req.body;
        const piHostname = piData.hostname;
        console.log(piData)

        const newPi = await prisma.RASPBERRYPI.upsert({
            where : {
                hostname : piHostname
            },
            update : {

            },
            create : {
                hostname : piHostname
            }
        });

        const plantToData = await prisma.$transaction(async(prisma) => {
            const plantsData = piData.data;
            let plantToData = {}

            for (let i = 0; i < plantsData.length; i++){
                const plant = plantsData[i];
                const port = plant.plant;
                plant.time = new Date(plant.time * 1000)
                
                const raspberryPort = await prisma.RASPBERRYPIPORT.upsert({
                    where : {
                        raspberryID_port: {raspberryID: newPi.id, port},
                    },
                    update : {},
                    create : {
                        raspberryID : newPi.id,
                        plantID : 0,
                        port : port
                    }
                });
                console.log(raspberryPort)
                
                const plantExists = await prisma.PLANT.count({
                    where: {
                        raspberryPiPortID : raspberryPort.id
                    }
                });
    
                if (plantExists < 1){
                    //res.status(400).json( { message : "That plant does not exist" } );
                    continue;
                }
                
                const updatedPlant = await prisma.PLANT.update({
                    where: {
                        raspberryPiPortID: port
                    },
                    data : {
                        plantdata : {
                            create : [
                                {
                                    time : plant.time,
                                    temperature : parseFloat(plant.temperature),
                                    humidity : parseFloat(plant.humidity),
                                    distance : parseFloat(plant.distance),
                                }
                            ]
                        }
                    }
                });

                await prisma.RASPBERRYPIPORT.update({
                    where : {
                        id: raspberryPort.id
                    },
                    update : {
                        plantID: updatedPlant.id
                    }
                });

                if(!plantToData.hasOwnProperty(updatedPlant.id)) {
                    plantToData[updatedPlant.id] = []
                }
                plantToData[updatedPlant.id].push({...plant})
            }

            return plantToData;
        })
        
        for (const [key, value] of Object.entries(plantToData)) {
            pusher.trigger("plant-channel-" + key, "new-data", value).catch((r) => console.log(r));
        }
        res.status(200).end();
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ message: 'an oopsie occured' })
    }

}