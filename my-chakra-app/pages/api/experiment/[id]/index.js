import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function getPi (req, res) {
    if(req.method !== 'GET'){
        res.status(405).json({message: 'Not a GET request'});
    }
    else{
        try{
            let experiment = await prisma.EXPERIMENT.findUnique({
                where: {
                    id: parseInt(req.query.id)
                }
            })
            res.status(200).json(experiment);
        }
        catch (error) {
            let errorString = "An error occured" + error;
            res.status(400).json({ message: errorString });
        }
    }
}