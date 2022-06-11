// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Pusher from 'pusher';
import { cors } from "../../middleware/cors"
import { runMiddleware } from "../../middleware/middleware"

const pusher = new Pusher({
    appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
    key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
    useTLS: false
});

export default async function handler(req, res) {
    // Run the middleware
    await runMiddleware(req, res, cors)
    
    if (req.method === 'POST') {
        pusher.trigger("plant-channel", "new-data", req.body).catch((r) => console.log(r));

        return res.status(200).end();
    }

    return res.status(404).end();
}






