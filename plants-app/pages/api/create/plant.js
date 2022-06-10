import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
    if (req.method !== 'POST'){
        return req.status(405).json({ message: 'Method not allowed'});
    }

    try{
        const { newPlant } = req.body;
        const newPlant = await prisma.plant.create({
            data : pi
        })
        res.status(200).json(newPlant);
    }
    catch (error) {
        res.status(400).json({ message: 'an oopsie occured' })
    }

}