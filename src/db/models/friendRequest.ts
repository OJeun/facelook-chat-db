import { DataTypes, Sequelize, Model } from 'sequelize';

export class FriendRequest extends Model {
  public requestId!: number;
  public senderId!: number;
  public receiverId!: number;
  public status!: string;
}

export function initFriendRequest(sequelize: Sequelize): void {
  FriendRequest.init(
    {
      requestId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
      },
    },
    {
      sequelize,
      tableName: 'friendRequest',
      timestamps: false,
      freezeTableName: true,
    }
  );
}
