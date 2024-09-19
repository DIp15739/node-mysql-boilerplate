module.exports = (sequelize, DataTypes) => {
  const resource = sequelize.define('resource', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    title: DataTypes.STRING(45),
    description: DataTypes.TEXT('long'),
    isActive: {
      type: DataTypes.ENUM(0, 1),
      defaultValue: 1,
      comment: '0-NO, 1-YES',
    },
    createdAt: DataTypes.DATE(6),
    updatedAt: DataTypes.DATE(6),
  })
  return resource
}
