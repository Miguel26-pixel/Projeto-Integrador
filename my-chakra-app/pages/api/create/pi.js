import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client'


export default async (req, res) => {
    if (req.method !== 'POST'){
        return req.status(405).json({ message: 'Method not allowed'});
    }

    try{
        const prisma = new PrismaClient()

        const newPi = await prisma.pi.create({
            data : {
                piName : req.body.piName,
                ip: req.body.ip
            }
        })
        console.log(newPi);
        res.redirect("/", 303).json(newPi);
    }
    catch (error) {
        res.status(400).json({ message: 'an oopsie occured' })
    }

}