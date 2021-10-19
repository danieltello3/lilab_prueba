import express, { json } from "express";
import exphbs from "express-handlebars";
import { connection } from "./sequelize";
import path from "path";
import { clienteRouter } from "../routes/clientes";
import { prestamoRouter } from "../routes/prestamos";
export class Server {
   constructor() {
      this.app = express();
      this.port = process.env.PORT || 8000;
      this.config();
      this.routes();
   }

   config() {
      this.app.use(json());
      this.app.set("views", path.join(path.resolve(__dirname, ".."), "views"));
      this.app.engine("handlebars", exphbs());
      this.app.set("view engine", "handlebars");
   }

   routes() {
      this.app.get("/", (req, res) => {
         res.render("home");
      });
      this.app.use("/api", clienteRouter, prestamoRouter);
   }
   start() {
      this.app.listen(this.port, async () => {
         console.log(`Server running on port ${this.port}`);
         try {
            await connection.sync();
            console.log("Base de datos sincronizada correctamente");
         } catch (error) {
            console.error(error);
         }
      });
   }
}
