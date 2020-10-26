module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ClassUsers', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      entries: {
        type: Sequelize.NUMBER.INTEGER,
        allowNull: false,
      },
      shift: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_list: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
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
    await queryInterface.dropTable('ClassUsers');
  },
};
