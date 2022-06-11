import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client'
// TODO: remove unneeded import maybe and clean up code
//import getPi from './index.js'

const prisma = new PrismaClient()

export default async function getPiPlants (req, res) {
    if(req.method !== 'GET'){
        res.status(405).json({message: 'Not a GET request'});
    }
    else{
        try{
            // let pi = getPi();
            let plants = await prisma.PLANT.findMany({
                where: {
                   piId : req.query.id
                }
            });
            res.status(200).json(plants);
        }
        catch (error) {
            res.status(400).json({ message: 'an oopsie occured' })
        }
    }
}