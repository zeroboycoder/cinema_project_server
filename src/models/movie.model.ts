
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import { sequelize } from '.'

class Movie extends Model<
  InferAttributes<Movie>,
  InferCreationAttributes<Movie>
> {
  declare id: CreationOptional<number>
  declare name: CreationOptional<string>
  declare description: CreationOptional<string>
  declare image: CreationOptional<string>
  declare duration: CreationOptional<number>

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

Movie.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: true
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
  modelName: "Movie",
  tableName: "movie",
  timestamps: true,
  paranoid: false
})


export default Movie;