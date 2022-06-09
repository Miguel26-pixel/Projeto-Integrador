import { cors } from "../../middleware/cors"
import { runMiddleware } from "../../middleware/middleware"

export default async function handler(req, res) {
    // Run the middleware
    await runMiddleware(req, res, cors);
    console.log("hello");
    res.status(200).json();
}