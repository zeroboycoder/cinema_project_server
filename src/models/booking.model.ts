
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import { sequelize } from '.'
import UserModel from './user.model';
import MovieModel from './movie.model';

class Booking extends Model<
  InferAttributes<Booking>,
  InferCreationAttributes<Booking>
> {
  declare id: CreationOptional<number>
  declare user_id: CreationOptional<number>
  declare seat_number: CreationOptional<string>
  declare movie_id: CreationOptional<number>
  declare date: CreationOptional<Date>
  declare time: CreationOptional<string>
  declare card_number: CreationOptional<string>
  declare mmyy: CreationOptional<string>
  declare cvv: CreationOptional<string>

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

Booking.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  seat_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  movie_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false
  },
  card_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mmyy: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cvv: {
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
  modelName: "Booking",
  tableName: "booking",
  timestamps: true,
  paranoid: false
})

UserModel.hasMany(Booking, {
  foreignKey: 'user_id',
  sourceKey: 'id',
  as: 'bookings'
})

Booking.belongsTo(UserModel, {
  foreignKey: 'user_id',
  targetKey: 'id',
  as: 'user'
})

MovieModel.hasMany(Booking, {
  foreignKey: 'movie_id',
  sourceKey: 'id',
  as: 'bookings'
})

Booking.belongsTo(MovieModel, {
  foreignKey: 'movie_id',
  targetKey: 'id',
  as: 'movie'
})

export default Booking;