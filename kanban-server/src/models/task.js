'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // many-to-one relationship between task and track
      this.belongsTo(models.Track, {
        foreignKey: 'trackId',
      });

      // one-to-many relationship between task and subtasks
      this.hasMany(models.Subtask, {
        foreignKey: 'taskId',
      });
    }
  }
  Task.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      taskTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      taskDesc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dueDate: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'Task',
    }
  );
  return Task;
};
