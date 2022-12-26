'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Track extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // many-to-one relationship between track and board
      this.belongsTo(models.Board, {
        foreignKey: 'boardId',
      });

      // one-to-many relationship between track and tasks
      this.hasMany(models.Task, {
        foreignKey: 'trackId',
      });
    }
  }
  Track.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      trackName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      colorCode: {
        type: DataTypes.STRING,
        defaultValue: '#aksbcls',
      },
    },
    {
      sequelize,
      modelName: 'Track',
    }
  );
  return Track;
};
