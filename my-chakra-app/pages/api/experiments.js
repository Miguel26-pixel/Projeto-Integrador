import prisma from "../../db";

export default async function getAllExperiments (req, res) {
    if(req.method !== 'GET'){
        res.status(405).json({message: 'Not a GET request'});
    }
    else{
        try{
            let allExp = await prisma.EXPERIMENT.findMany();
            res.status(200).json(allExp);
        }
        catch (error) {
            let errorString = "An error occured" + error;
            res.status(400).json({ message: errorString });
        }
    }
}