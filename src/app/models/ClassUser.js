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
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Class, { as: 'class', foreignKey: 'class_user_id' });
    this.hasMany(models.User, { as: 'users', foreignKey: 'class_user_id' });
  }
}

export default ClassUser;
