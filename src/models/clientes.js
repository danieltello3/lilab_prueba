import { connection } from "../config/sequelize";
import { DataTypes } from "sequelize";

const clienteModel = () =>
   connection.define(
      "cliente",
      {
         clienteId: {
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            allowNull: false,
            field: "id",
            type: DataTypes.INTEGER,
         },
         clienteNombre: {
            type: DataTypes.STRING,
            field: "nombre",
            allowNull: false,
         },
         clienteApellido: {
            type: DataTypes.STRING,
            field: "apellido",
            allowNull: false,
         },
      },
      {
         tableName: "clientes",
      }
   );

export const Cliente = clienteModel();
