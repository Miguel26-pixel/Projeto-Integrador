import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client'

export default async function getAllPis (req, res) {
    if(req.method !== 'GET'){
        res.status(405).json({message: 'Not a GET request'});
    }
    else{
        try{
            const prisma = new PrismaClient()

            let allPis = await prisma.RASPBERRYPI.findMany();
            res.status(200).json(allPis);
        }
        catch (error) {
            let errorString = "An error occured" + error;
            res.status(400).json({ message: errorString });
        }
    }
}