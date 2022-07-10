import prisma from "../../../db";

export default async (req, res) => {
    if (req.method !== 'POST'){
        return req.status(405).json({ message: 'Method not allowed'});
    }

    try{
        let { plantName, piPort, piHostname, experimentID } = req.body;
        
                
        const portExists = await prisma.RASPBERRYPIPORT.count({
            where : {
                port : piPort
            }
        });

        if(!portExists){
            res.status(400).json( { message : "That port does not exist." } );
        }
                
        const raspberryPort = await prisma.RASPBERRYPIPORT.findUnique({
            where : {
                port : port
            }
        });

        const newPlant = await prisma.PLANT.create(
            { 
                data: {
                    plantName: plantName,
                    raspberryPiPortID : raspberryPort.id,
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