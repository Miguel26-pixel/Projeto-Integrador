import { NextApiRequest, NextApiResponse } from 'next';

export default function getPlantById(req, res){
    res.json({byId: req.query.id, message: 'getPlantById'});
}