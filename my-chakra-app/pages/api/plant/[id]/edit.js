import prisma from "../../../../db";
import {getPlantbyID, getPortbyID, getPIbyID, getPIbyHostname} from '../../utils.js';

export default async (req, res) => {
    if(req.method !== 'POST'){
        res.status(405).json({message: 'Not a POST request'});
    }
    else{
        try{
            const requestID = parseInt(req.query.id);

            const oldPlant = await getPlantbyID(requestID);
            if(oldPlant === null){
                res.status(400).json({ message : 'This plant does not exist' });
            }

            const oldPort = await getPortbyID(oldPlant.raspberryPiPortID);
            if(oldPort === null){
                res.status(400).json( { message : "This plant does not have a port." } );
            }

            const oldPi = await getPIbyID(oldPort.raspberryID);
            if(oldPi === null){
                res.status(400).json( { message : "Invalid old RaspberryPI." } );
            }
            
            
            let { plantName, plantInfo, raspberryPort, raspberryName, experimentID } = req.body;
            let newHostname = (raspberryName === "") ? oldPi.hostname  : raspberryName;
            let newPortName =     (raspberryPort === "") ? oldPort.port    : raspberryPort;
            
            let newPi = await getPIbyHostname(newHostname);
            if(newPi === null){
                res.status(400).json( { message : "No inputted RaspberryPI exists." } );
            }

            let portAlterations = {
                raspberryID : newPi.id,
                port : newPortName,
                plantID : requestID
            };
            
            const updatedPort = await prisma.RASPBERRYPIPORT.update({
                where : {
                    id : oldPort.id
                },
                data : portAlterations
            });

            let plantAlterations = {
                plantName    : (plantName === "")       ? oldPlant.plantName   : plantName,
                plantInfo    : (plantInfo === "")       ? oldPlant.plantInfo   : plantInfo,
                raspberryPiPortID : updatedPort.id,
                experimentID : (experimentID  === "")   ? oldPlant.plantName   : parseInt(experimentID)
            };

            let updatedPlant = await prisma.PLANT.update({
                where : {
                    id : requestID
                },
                data : plantAlterations
            })

            res.status(200).json(updatedPlant);
        }
        catch (error) {
            let errorString = "An error occured" + error;
            res.status(400).json({ message: errorString });
        }
    }
}