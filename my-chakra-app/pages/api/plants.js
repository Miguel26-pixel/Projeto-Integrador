    import prisma from "../../db";

export default async function getAllPlants (req, res){
    if(req.method !== 'GET'){
        res.status(405).json({message: 'Not a GET request'});
    }
    else{
        try{
            let allPlants = await prisma.PLANT.findMany();
            res.status(200).json(allPlants);
        }
        catch (error) {
            let errorString = "An error occured" + error;
            res.status(400).json({ message: errorString });
        }
    }
}