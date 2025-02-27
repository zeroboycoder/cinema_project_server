import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import { sequelize } from '.'

class Admin extends Model<
  InferAttributes<Admin>,
  InferCreationAttributes<Admin>
> {
  declare id: CreationOptional<number>
  declare email: CreationOptional<string>
  declare password: CreationOptional<string>
  declare status: CreationOptional<boolean>

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

Admin.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },

  createdAt: {
    type: DataTypes.DATE(6),
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE(6),
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: "Admin",
  tableName: "admin",
  timestamps: true,
  paranoid: false
})


export default Admin;