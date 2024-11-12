import { DataTypes, Sequelize, Model } from 'sequelize';

export class Invitation extends Model {
  public invitationId!: number;
  public userId!: string;
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
      userId: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      senderId: {
        type: DataTypes.STRING(30),
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
      engine: 'InnoDB',
      charset: 'utf8',
      freezeTableName: true,
    }
  );
}
