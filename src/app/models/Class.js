import Sequelize, { Model } from 'sequelize';

class Class extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        title: Sequelize.STRING,
        day: Sequelize.INTEGER,
        month: Sequelize.INTEGER,
        entries: Sequelize.INTEGER,
        hour: Sequelize.STRING,
        user_id: {
          type: Sequelize.UUID,
          references: {
            model: 'ClassUsers',
            key: 'id',
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User);
  }
}

export default Class;
