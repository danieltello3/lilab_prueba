import { Router } from "express";
import {
   crearPrestamo,
   listarPrestamos,
   obtenerPrestamo,
   updatePrestamoStatus,
} from "../controllers/prestamos";

export const prestamoRouter = Router();
//rutas para crear prestamos y listar todos los prestamos
prestamoRouter.route("/prestamos").post(crearPrestamo).get(listarPrestamos);
//ruta para obtener el detalle de un prestamo
prestamoRouter.get("/prestamo/:id", obtenerPrestamo);
//ruta para actualizar el estado de un prestamo, luego de su revision el estado cambia a aprobado o denegado
prestamoRouter.patch("/prestamo/:id", updatePrestamoStatus);
