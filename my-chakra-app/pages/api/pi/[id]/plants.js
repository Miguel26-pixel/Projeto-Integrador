import prisma from "../../../../db";

export default async function getPiPlants (req, res) {
    if(req.method !== 'GET'){
        res.status(405).json({message: 'Not a GET request'});
    }
    else{
        try{
            let thisPi = await prisma.RASPBERRYPI.findUnique({
                where : {
                    id : parseInt(req.query.id)
                }
            });

            let ports = await prisma.RASPBERRYPIPORT.findMany({
                where: {
                    raspberryID: thisPi.id
                }
            });

            let plants = [];
            for (let i = 0; i < ports.length; i++){
                let port = ports[i];
                let plant = await prisma.PLANT.findUnique({
                    where: {
                        raspberryPiPortID: port.id
                    }
                });
                plants.push(plant);
            }
            
            res.status(200).json(plants);
        }
        catch (error) {
            let errorString = "An error occured" + error;
            res.status(400).json({ message: errorString });
        }
    }
}