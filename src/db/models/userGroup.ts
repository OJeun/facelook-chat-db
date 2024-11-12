import { DataTypes, Sequelize, Model } from 'sequelize';

export class UserGroup extends Model {
  public id!: number;
  public userId!: string;
  public groupId!: number;
  public userSentimentScore!: number;
}

export function initUserGroup(sequelize: Sequelize): void {
  UserGroup.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userSentimentScore: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: 'userGroup',
      engine: 'InnoDB',
      charset: 'utf8',
      freezeTableName: true,
    }
  );
}