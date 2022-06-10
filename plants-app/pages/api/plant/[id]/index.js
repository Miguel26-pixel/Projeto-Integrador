import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function getPlant (req, res) {
    if(req.method !== 'GET'){
        res.status(405).json({message: 'Not a GET request'});
    }
    else{
        try{
            let plant= await prisma.plant.findUnique({
                where: {
                    id: req.query.id
                }
            })
            res.status(200).json(plant);
        }
        catch (error) {
            res.status(400).json({ message: 'an oopsie occured' })
        }
    }
}