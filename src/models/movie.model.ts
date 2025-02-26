
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import { sequelize } from '.'
import GenreModel from './genre.model'

class Movie extends Model<
  InferAttributes<Movie>,
  InferCreationAttributes<Movie>
> {
  declare id: CreationOptional<number>
  declare name: CreationOptional<string>
  declare description: CreationOptional<string>
  declare image: CreationOptional<string>
  declare duration: CreationOptional<number>
  declare genres: CreationOptional<object>

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
    type: DataTypes.TEXT,
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
  genres: {
    type: DataTypes.JSON,
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

GenreModel.hasMany(Movie, {
  foreignKey: 'genre_id',
  sourceKey: 'id',
  as: 'movies'
})

Movie.belongsTo(GenreModel, {
  foreignKey: 'genre_id',
  targetKey: 'id',
  as: 'genre'
})

export default Movie;