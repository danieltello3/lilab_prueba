import { Cliente } from "../models/clientes";

export const crearCliente = async (req, res) => {
   try {
      const nuevoCliente = await Cliente.create(req.body);
      return res.status(201).json({
         success: true,
         content: nuevoCliente,
         message: "nuevo cliente creado exitosamente",
      });
   } catch (error) {
      return res.status(400).json({
         success: false,
         content: error,
         message: "error al crear el cliente",
      });
   }
};
