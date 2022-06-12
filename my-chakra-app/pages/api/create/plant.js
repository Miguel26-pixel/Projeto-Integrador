import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
    if (req.method !== 'POST'){
        return req.status(405).json({ message: 'Method not allowed'});
    }

    try{
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
        res.status(200).json(req.body);
    }
    catch (error) {
        const errorString = "An error occured: " + error;
        res.status(400).json({ message: errorString })
    }
}