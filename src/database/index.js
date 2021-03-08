import Sequelize from 'sequelize';

import Dealer from '../app/models/Dealer';
import Purchase from '../app/models/Purchase';

import databaseConfig from '../config/database';

const models = [Dealer, Purchase];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
