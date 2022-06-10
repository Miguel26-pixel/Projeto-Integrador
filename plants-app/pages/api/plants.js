import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function getAllPlants (req, res){
    if(req.method !== 'GET'){
        res.status(405).json({message: 'Not a GET request'});
    }
    else{
        try{
            let allPlants = await prisma.plant.findMany();
            res.status(200).json(allPlants);
        }
        catch (error) {
            res.status(400).json({ message: 'an oopsie occured' })
        }
    }
}