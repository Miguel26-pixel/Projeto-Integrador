import { NextApiRequest, NextApiResponse } from 'next';

export default function getAllPlants(req, res){
    if(req.method !== 'GET'){
        res.status(500).json({message: 'Not a GET request'});
    }
    else{
        res.json({hello:'world', method: req.method});
    }
}