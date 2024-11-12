import { DataTypes, Sequelize, Model } from 'sequelize';
import bcrypt from 'bcrypt';

export class User extends Model {
  public id!: number;
  public userId!: string;
  public email!: string;
  public password!: string;
  public name!: string;
  public achievementPoint!: number;
}

export function initUser(sequelize:
    Sequelize): void {
    User.init(
        {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        achievementPoint: {
            type: DataTypes.NUMBER,
            allowNull: false,
            defaultValue: 0,
        },
        },
    {
      sequelize,
      tableName: 'user',
      engine: 'InnoDB',
      charset: 'utf8',
      freezeTableName: true,
      indexes: [{ fields: ['user_id'] }],
      hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        },
      },
    }
  );
}
