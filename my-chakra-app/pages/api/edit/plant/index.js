// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { cors } from "../../../../middleware/cors"
import { runMiddleware } from "../../../../middleware/middleware"
import pusher from "../../../../pusher"

export default async function handler(req, res) {
    // Run the middleware
    await runMiddleware(req, res, cors)

    if (req.method === 'POST') {
        let plantToData = {}

        req.body.data.forEach((value) => {
            if(!plantToData.hasOwnProperty(value.plant)) {
                plantToData[value.plant] = []
            }
            plantToData[value.plant].push({...value})
        })

        for (const [key, value] of Object.entries(plantToData)) {
            pusher.trigger("plant-channel-" + key, "new-data", value).catch((r) => console.log(r));
        }          


        return res.status(200).end();
    }

    return res.status(404).end();
}






