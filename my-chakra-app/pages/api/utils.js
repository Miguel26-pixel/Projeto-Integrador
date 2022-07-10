import prisma from "../../db";


async function getPIbyID(id){
    const piExists = await prisma.RASPBERRYPI.count({
        where: {
            id: id
        }
    });

    if(!piExists){
        return null;
    }

    const raspberryPI = await prisma.RASPBERRYPI.findUnique({
        where: {
          id : id,
        },
    })

    return raspberryPI;
}

async function getPIbyHostname(hostname){
    const piExists = await prisma.RASPBERRYPI.count({
        where: {
            hostname: hostname
        }
    });

    if(!piExists){
        return null;
    }

    const raspberryPI = await prisma.RASPBERRYPI.findUnique({
        where: {
            hostname: hostname
        }
    });

    return raspberryPI;
}

async function getPlantbyID(id){
    let plantExists = await prisma.PLANT.count({
        where : {
            id : id
        }
    });
    if(!plantExists){
        return null
    }

    let plant = await prisma.PLANT.findUnique({
        where : {
            id : id
        }
    });

    return plant;
}

async function getPortbyID(id){
    let portExists = await prisma.RASPBERRYPIPORT.count({
        where : {
            id : id
        }
    });
    if(!portExists){
        return null;
    }

    let port = await prisma.RASPBERRYPIPORT.findUnique({
        where : {
            id : id
        }
    });

    return port;
}

async function getPortbyNameAndRaspberryID(portName, raspberryID){
    let portExists = await prisma.RASPBERRYPIPORT.count({
        where : {
            raspberryID : raspberryID,
            port : portName
        }
    });
    if(!portExists){
        return null;
    }

    let port = await prisma.RASPBERRYPIPORT.findUnique({
        where : {
            raspberryID_port : { raspberryID, portName }
        }
    });

    return port;
}

export {
    getPIbyID,
    getPIbyHostname,
    getPlantbyID,
    getPortbyID,
    getPortbyNameAndRaspberryID
}