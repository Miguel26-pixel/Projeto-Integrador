import prisma from "../../../db";
import pusher from "../../../pusher"

export default async (req, res) => {
    if (req.method !== 'PATCH'){
        return res.status(405).json({ message: 'Method not allowed'});
    }

    try{
        const piData = req.body;
        const piHostname = piData.hostname;
        console.log(piData);

        const piExists = await prisma.RASPBERRYPI.count({
            where: {
                hostname : piHostname
            }
        });

        if(piExists < 1){
            res.status(400).json( { message : "That raspberry pi does not exist" } );
        }

        const raspberry = await prisma.RASPBERRYPI.findUnique({
            where : {
                hostname: piHostname
            }
        });

        const plantToData = await prisma.$transaction(async(prisma) => {
            const plantsData = piData.data;
            let plantToData = {}

            for (let i = 0; i < plantsData.length; i++){
                const plant = plantsData[i];
                const port = plant.plant;
                plant.time = new Date(plant.time * 1000)
                
                const portExists = await prisma.RASPBERRYPIPORT.count({
                    where : {
                        port : port
                    }
                });

                if(!portExists){
                    res.status(400).json( { message : "That port does not exist." } );
                }
                
                const raspberryPort = await prisma.RASPBERRYPIPORT.findUnique({
                    where : {
                        raspberryID_port: {raspberryID: raspberry.id, port},
                    }
                });
                console.log(raspberryPort)
    
                const plantExists = await prisma.PLANT.count({
                    where: {
                        raspberryPiPortID : raspberryPort.id
                    }
                });
    
                if (plantExists < 1){
                    // TODO: we might want to create a new plant here
                    //res.status(400).json( { message : "That plant does not exist" } );
                    continue;
                }
                console.log("hello")
                
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