'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('chat', 'userId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('chat', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'user', 
        key: 'userId', 
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },
};
