import Pusher from "pusher";

let pusher;

if (process.env.NODE_ENV === "production") {
    pusher = new Pusher({
      appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
      key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
      secret: process.env.PUSHER_APP_SECRET,
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
      useTLS: false,
    });
  } else {
    if (!global.pusher) {
        global.pusher = new Pusher({
          appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID,
          key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
          secret: process.env.PUSHER_APP_SECRET,
          cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
          useTLS: false
      });
    }
  
    pusher = global.pusher;
  }
  
  export default pusher;
  