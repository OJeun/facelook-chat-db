import { DataTypes, Sequelize, Model } from 'sequelize';

export class Group extends Model {
  public groupId!: number;
  public groupName!: string;
}

export function initGroup(sequelize: Sequelize): void {
  Group.init(
    {
      groupId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      groupName: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'group',
      engine: 'InnoDB',
      charset: 'utf8',
      freezeTableName: true,
    }
  );
}
