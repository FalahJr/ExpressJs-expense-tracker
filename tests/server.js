import express from "express";
import cors from "cors";
import { port_test } from "../config";
import routes from "../routes/index";

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);
// routes(app);

app.listen(port_test, () => {
  console.log(`PORT listen to ${port_test}`);
});

module.exports = app;
