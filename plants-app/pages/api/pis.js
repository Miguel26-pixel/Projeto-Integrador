import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function getAllPis (req, res) {
    if(req.method !== 'GET'){
        res.status(405).json({message: 'Not a GET request'});
    }
    else{
        try{
            let allPis = await prisma.rasperryPI.findMany();
            res.status(200).json(allPis);
        }
        catch (error) {
            res.status(400).json({ message: 'an oopsie occured' })
        }
    }
}