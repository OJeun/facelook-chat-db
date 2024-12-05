import { DataTypes, Sequelize, Model } from 'sequelize';

export class Chat extends Model {
  public chatId!: number;
  public groupId!: number;
  public senderId!: string;
  public senderName!: string;
  public message!: string;
  public createdAt!: Date;
}

export function initChat(sequelize: Sequelize): void {
  Chat.init(
    {
      chatId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      senderId: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      senderName: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'chat',
      timestamps: false,
      engine: 'InnoDB',
      charset: 'utf8',
      freezeTableName: true,
      indexes: [
        {
          fields: ['groupId', 'createdAt'],
        },
      ],
    }
  );
}

