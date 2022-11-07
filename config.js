import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;

const port_test = process.env.PORT_TEST;

const db = process.env.DATABASE_URL;

const jwt_secret = process.env.JWT_SECRET;

export { port, port_test, db, jwt_secret };
