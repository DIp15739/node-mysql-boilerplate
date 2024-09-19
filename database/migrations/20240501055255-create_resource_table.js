'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('resource', {
      id: {
        type: Sequelize.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      title: Sequelize.DataTypes.STRING(45),
      description: Sequelize.DataTypes.TEXT('long'),
      createdAt: {
        type: Sequelize.DataTypes.DATE(6),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP(6)'),
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE(6),
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)'
        ),
      },
      isActive: { type: Sequelize.DataTypes.TINYINT, defaultValue: 1 },
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
}
