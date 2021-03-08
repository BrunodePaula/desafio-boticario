import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Dealer extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        cpf: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize
      }
    );

    this.addHook('beforeSave', async dealer => {
      if (dealer.password) {
        dealer.password_hash = await bcrypt.hash(dealer.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Dealer;
