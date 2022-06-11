// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Pusher from 'pusher-js';

export default function handler(req, res) {
  pusher.trigger("my-channel", "my-event", {
    message: "hello world"
  });
  res.status(200).json({ name: 'John Doe' });
}

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
  encrypted: true
});






