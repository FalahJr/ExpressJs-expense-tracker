import express from "express";
import cors from "cors";
import { port } from "./config.js";
import routes from "./routes/index.js";

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);
// routes(app);

app.listen(port, () => {
  console.log(`PORT listen to ${port}`);
});

export default app;
