import { Router } from "express";
import { crearCliente } from "../controllers/clientes";

export const clienteRouter = Router();
//ruta para crear clientes
clienteRouter.route("/clientes").post(crearCliente);
