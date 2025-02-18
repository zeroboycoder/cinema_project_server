import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import { sequelize } from '.'

class Genre extends Model<
  InferAttributes<Genre>,
  InferCreationAttributes<Genre>
> {
  declare id: CreationOptional<number>
  declare name: CreationOptional<string>

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

Genre.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
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
  modelName: "Genre",
  tableName: "genre",
  timestamps: true,
  paranoid: false
})


export default Genre;