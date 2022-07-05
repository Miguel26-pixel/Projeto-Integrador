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

            let plants = await prisma.PLANT.findMany({
                where: {
                   piHostname : thisPi.hostname
                }
            });
            res.status(200).json(plants);
        }
        catch (error) {
            let errorString = "An error occured" + error;
            res.status(400).json({ message: errorString });
        }
    }
}