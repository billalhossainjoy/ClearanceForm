import app from "./app";
import { config } from "./config/config";
import connectMongo from "./db";

connectMongo().then(() => {
    
  app.listen(config.PORT, () => {
    console.log(`server running on port http://${"localhost"}:${config.PORT}`);
  });
}).catch(err => {
    console.error("server is not connected");
})
