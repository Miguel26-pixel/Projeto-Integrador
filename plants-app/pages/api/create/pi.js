import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
    if (req.method !== 'POST'){
        return req.status(405).json({ message: 'Method not allowed'});
    }

    try{
        const { pi } = req.body;
        const newPi = await prisma.pi.create({
            data : pi
        })
        res.status(200).json(newPi);
    }
    catch (error) {
        res.status(400).json({ message: 'an oopsie occured' })
    }

}