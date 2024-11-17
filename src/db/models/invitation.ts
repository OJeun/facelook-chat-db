import { DataTypes, Sequelize, Model } from 'sequelize';

export class Invitation extends Model {
  public invitationId!: number;
  public receiverId!: string;
  public senderId!: string;
  public groupId!: number;
}

export function initInvitation(sequelize: Sequelize): void {
  Invitation.init(
    {
      invitationId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'invitation',
      timestamps: false,
      engine: 'InnoDB',
      charset: 'utf8',
      freezeTableName: true,
    }
  );
}
