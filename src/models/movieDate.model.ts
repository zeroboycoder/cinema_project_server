
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import { sequelize } from '.'
import MovieModel from './movie.model';

class MovieDate extends Model<
  InferAttributes<MovieDate>,
  InferCreationAttributes<MovieDate>
> {
  declare id: CreationOptional<number>
  declare date: CreationOptional<Date>
  declare movie_id: CreationOptional<number>

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

MovieDate.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  movie_id: {
    type: DataTypes.INTEGER,
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
  modelName: "MovieDate",
  tableName: "movie_date",
  timestamps: true,
  paranoid: false
})

MovieModel.hasMany(MovieDate, {
  foreignKey: 'movie_id',
  sourceKey: 'id',
  as: 'movie_dates'
})

MovieDate.belongsTo(MovieModel, {
  foreignKey: 'movie_id',
  targetKey: 'id',
  as: 'movie'
})

export default MovieDate;