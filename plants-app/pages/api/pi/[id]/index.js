import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function getPi (req, res) {
    if(req.method !== 'GET'){
        res.status(405).json({message: 'Not a GET request'});
    }
    else{
        try{
            let pi = await prisma.rasperryPI.findUnique({
                where: {
                    id: req.query.id
                }
            })
            res.status(200).json(pi);
        }
        catch (error) {
            res.status(400).json({ message: 'an oopsie occured' })
        }
    }
}