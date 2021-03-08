import Sequelize, { Model } from 'sequelize';

class Purchase extends Model {
  static init(sequelize) {
    super.init(
      {
        code: Sequelize.STRING,
        value: Sequelize.STRING,
        date: Sequelize.DATE,
        cpf_dealer: Sequelize.STRING,
        status: Sequelize.STRING,
      },
      {
        sequelize
      }
    );

    return this;
  }
}

export default Purchase;
