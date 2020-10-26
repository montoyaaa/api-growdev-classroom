import Sequelize, { Model } from 'sequelize';

class ClassUser extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        name: Sequelize.STRING,
        entries: Sequelize.INTEGER,
        shift: Sequelize.STRING,
        user_list: {
          type: Sequelize.UUID,
          references: {
            model: 'Users',
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

export default ClassUser;
