// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Pusher from 'pusher';
import { cors } from "../../../../middleware/cors"
import { runMiddleware } from "../../../../middleware/middleware"

export default async function handler(req, res) {
    // Run the middleware
    await runMiddleware(req, res, cors)

    if (req.method === 'POST') {
        const pusher = new Pusher({
            appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
            key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
            secret: process.env.PUSHER_APP_SECRET,
            cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
            useTLS: false
        });
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






