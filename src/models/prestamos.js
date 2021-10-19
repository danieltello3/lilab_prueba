import { connection } from "../config/sequelize";
import { DataTypes } from "sequelize";
import { Cliente } from "./clientes";

const prestamoModel = () =>
   connection.define(
      "prestamo",
      {
         prestamoId: {
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            allowNull: false,
            field: "id",
            type: DataTypes.INTEGER,
         },
         prestamoMonto: {
            type: DataTypes.INTEGER,
            field: "monto",
            allowNull: false,
         },
         prestamoEstado: {
            type: DataTypes.STRING,
            field: "estado",
            values: ["aprobado", "denegado", "pendiente"],
            defaultValue: "pendiente",
         },
      },
      {
         tableName: "prestamos",
      }
   );

export const Prestamo = prestamoModel();

Cliente.hasMany(Prestamo, {
   foreignKey: { name: "clienteId", allowNull: false, field: "cliente_id" },
});
Prestamo.belongsTo(Cliente, {
   foreignKey: { name: "clienteId", allowNull: false, field: "cliente_id" },
});
