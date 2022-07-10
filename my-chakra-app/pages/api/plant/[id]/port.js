import prisma from "../../../../db";

export default async function getPiPlants (req, res) {
    if(req.method !== 'GET'){
        res.status(405).json({message: 'Not a GET request'});
    }
    else{
        try{
            let plantPort = await prisma.RASPBERRYPIPORT.findUnique({
                where: {
                    plantID: parseInt(req.query.id)
                }
            })
            res.status(200).json(plantPort);
        }
        catch (error) {
            let errorString = "An error occured" + error;
            res.status(400).json({ message: errorString });
        }
    }
}