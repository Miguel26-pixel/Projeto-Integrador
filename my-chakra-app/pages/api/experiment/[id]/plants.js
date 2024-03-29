import prisma from "../../../../db";

export default async function getExperiencePlants (req, res) {
    if(req.method !== 'GET'){
        res.status(405).json({message: 'Not a GET request'});
    }
    else{
        try{
            let plants = await prisma.PLANT.findMany({
                where: {
                    experimentID : parseInt(req.query.id)
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