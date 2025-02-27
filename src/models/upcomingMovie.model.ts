
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import { sequelize } from '.'
import MovieModel from './movie.model';

class UpcomingMovie extends Model<
  InferAttributes<UpcomingMovie>,
  InferCreationAttributes<UpcomingMovie>
> {
  declare id: CreationOptional<number>
  declare name: CreationOptional<Date>
  declare description: CreationOptional<number>
  declare image: CreationOptional<string>
  declare duration: CreationOptional<number>
  declare genres: CreationOptional<object>
  declare date: CreationOptional<Date>

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

UpcomingMovie.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  genres: {
    type: DataTypes.JSON,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE(6),
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
  modelName: "UpcomingMovie",
  tableName: "upcoming_movie",
  timestamps: true,
  paranoid: false
})

export default UpcomingMovie;