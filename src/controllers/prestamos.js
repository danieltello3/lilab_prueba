import { Cliente } from "../models/clientes";
import { Prestamo } from "../models/prestamos";

function numeroRandom(max) {
   return Math.floor(Math.random() * max);
}

export const crearPrestamo = async (req, res) => {
   try {
      const nuevoPrestamo = await Prestamo.create(req.body);
      return res.status(201).json({
         success: true,
         content: nuevoPrestamo,
         message: "se creo prestamo exitosamente",
      });
   } catch (error) {
      console.log(error);
      return res.status(400).json({
         success: false,
         content: error,
         message: "error al crear el prestamo",
      });
   }
};

export const listarPrestamos = async (req, res) => {
   const prestamos = await Prestamo.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: { model: Cliente },
   });
   const prestamosJson = prestamos.map((prestamo) => prestamo.toJSON());
   //filtrar los prestamos que puede revisar maria : iguales o menores a 50000
   const prestamosMaria = prestamosJson.filter(
      (prestamo) => prestamo.prestamoMonto <= 50000
   );
   return res.render("prestamos/prestamos", { prestamosMaria });
};

export const obtenerPrestamo = async (req, res) => {
   const { id } = req.params;
   try {
      const prestamo = await Prestamo.findByPk(id, {
         include: { model: Cliente },
      });
      //se ejecuta las funciones que determinan la deuda registrada, el indicador sentinel y el algoritmo de IA y agrega el resultado al prestamo
      const montoSBS = numeroRandom(10000);
      let indSentinel = "";
      const randomInt = numeroRandom(3);
      switch (randomInt) {
         case 0:
            indSentinel = "malo";
            break;
         case 1:
            indSentinel = "regular";
            break;
         case 2:
            indSentinel = "bueno";
            break;
      }
      const algoritmoIA = numeroRandom(10) + 1;

      const prestamoProcesado = {
         ...prestamo.toJSON(),
         montoSBS,
         indSentinel,
         algoritmoIA,
      };
      return res.render("prestamos/presDetalle", { prestamoProcesado });
   } catch (error) {
      return res.status(400).json({
         success: false,
         content: error.message,
         message: "error al obtener el prestamo",
      });
   }
};

export const updatePrestamoStatus = async (req, res) => {
   const { id } = req.params;
   const { estado } = req.body;
   try {
      const prestamo = await Prestamo.findByPk(id);
      prestamo.prestamoEstado = estado;
      await prestamo.save();
      return res.status(200).json({
         success: true,
         content: prestamo,
         message: "se actualizo el estado con exito",
      });
   } catch (error) {
      return res.status(400).json({
         success: false,
         message: error.message,
      });
   }
};
