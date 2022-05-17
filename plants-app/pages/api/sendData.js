// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { cors } from "../../middleware/cors"
import { runMiddleware } from "../../middleware/middleware"

export default async function handler(req, res) {
    // Run the middleware
    await runMiddleware(req, res, cors)

    if(req.method === "POST") {
        console.log(req.body)
        res.status(200).json()
    } else {
        res.status(404)
    }
}
