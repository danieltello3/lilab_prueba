import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const connection = new Sequelize(process.env.URL_DB, {
   dialect: "mysql",
   timezone: "-05:00",
});
