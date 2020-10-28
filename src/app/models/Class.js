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
        day: Sequelize.STRING,
        month: Sequelize.STRING,
        entries: Sequelize.INTEGER,
        hour: Sequelize.STRING,
        class_user_id: {
          type: Sequelize.UUID,
          references: {
            model: 'class_users',
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
    this.belongsTo(models.ClassUser);
  }
}

export default Class;
