import { NextApiRequest, NextApiResponse } from 'next';

export default function getPiById(req, res){
    res.json({byId: req.query.id, message: 'getPiById'});
}