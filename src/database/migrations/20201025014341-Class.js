module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Class', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      day: {
        type: Sequelize.NUMBER.INTEGER,
        allowNull: false,
      },
      month: {
        type: Sequelize.NUMBER.INTEGER,
        allowNull: false,
      },
      entries: {
        type: Sequelize.NUMBER.INTEGER,
        allowNull: false,
      },
      hour: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'ClassUsers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Class');
  },
};
