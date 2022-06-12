import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client'

export default async (req, res) => {
    if (req.method !== 'POST'){
        return req.status(405).json({ message: 'Method not allowed'});
    }

    try{
        const prisma = new PrismaClient()

        const newPlant = await prisma.PLANT.create(
            { 
                data: {
                    plantName: req.body.plantName,
                    piID: parseInt(req.body.piID),
                    experimentID: parseInt(req.body.experimentID),
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